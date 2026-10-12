#!/usr/bin/env bash
# Budget alerts, scale-to-zero Cloud Run, and Secret Manager setup.
# Usage: PROJECT_ID=... BILLING_ACCOUNT_ID=XXXXXX-XXXXXX-XXXXXX ./infra/cost-security-setup.sh
# Secrets are read from a local, git-ignored .env file (never committed).
set -euo pipefail

PROJECT_ID="${PROJECT_ID:?set PROJECT_ID}"
BILLING_ACCOUNT_ID="${BILLING_ACCOUNT_ID:?set BILLING_ACCOUNT_ID}"
REGION="${REGION:-asia-south1}"
SERVICES="${SERVICES:-sbr-core sbr-hikmah sbr-beautyhub}"
ENV_FILE="${ENV_FILE:-.env}"

gcloud config set project "$PROJECT_ID"
gcloud services enable secretmanager.googleapis.com run.googleapis.com \
  billingbudgets.googleapis.com cloudbilling.googleapis.com monitoring.googleapis.com

# ---- 1. Budget alerts: INR 500 and INR 1000 (billing admins emailed by default) ----
# Budget currency must match the billing account currency (INR assumed).
# 0.5 / 1.0 of a 1000 INR budget => alerts at INR 500 and INR 1000.
# Email goes to Billing Account Administrators/Users by default (IAM recipients);
# to also use a Monitoring email channel add: --notifications-rule-monitoring-notification-channels=CHANNEL
gcloud billing budgets create \
  --billing-account="$BILLING_ACCOUNT_ID" \
  --display-name="$PROJECT_ID budget INR 1000" \
  --filter-projects="projects/$PROJECT_ID" \
  --budget-amount=1000INR \
  --threshold-rule=percent=0.5 \
  --threshold-rule=percent=1.0 \
  --threshold-rule=percent=1.0,basis=forecasted-spend

# ---- 2. Cloud Run scale to zero ----
for svc in $SERVICES; do
  gcloud run services update "$svc" --region "$REGION" \
    --min-instances=0 --max-instances=2 \
    --cpu-throttling
done

# ---- 3. Secret Manager ----
RUN_SA="$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')-compute@developer.gserviceaccount.com"
SECRET_KEYS="${SECRET_KEYS:-NASA_API_KEY AIRNOW_API_KEY OPENWEATHER_API_KEY OPENAI_API_KEY ANTHROPIC_API_KEY GEMINI_API_KEY JWT_SECRET FIREBASE_API_KEY GCP_PRIVATE_KEY STRIPE_SECRET_KEY SENDGRID_API_KEY TWILIO_AUTH_TOKEN RAZORPAY_KEY_SECRET GOOGLE_MAPS_API_KEY}"

for key in $SECRET_KEYS; do
  value="$(grep -E "^${key}=" "$ENV_FILE" | head -n1 | cut -d= -f2- || true)"
  [ -n "$value" ] || { echo "skip $key (not in $ENV_FILE)"; continue; }
  gcloud secrets describe "$key" >/dev/null 2>&1 || \
    gcloud secrets create "$key" --replication-policy=automatic
  printf '%s' "$value" | gcloud secrets versions add "$key" --data-file=-
  gcloud secrets add-iam-policy-binding "$key" \
    --member="serviceAccount:$RUN_SA" --role=roles/secretmanager.secretAccessor >/dev/null
done

# Mount secrets as env vars on each service (replaces plaintext env vars)
SECRET_FLAGS=""
for key in $SECRET_KEYS; do
  gcloud secrets describe "$key" >/dev/null 2>&1 && SECRET_FLAGS+="${SECRET_FLAGS:+,}${key}=${key}:latest"
done
for svc in $SERVICES; do
  gcloud run services update "$svc" --region "$REGION" --update-secrets="$SECRET_FLAGS"
done
echo "Done. Delete local $ENV_FILE secrets and rotate any keys previously committed."
