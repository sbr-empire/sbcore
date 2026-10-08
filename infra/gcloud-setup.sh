#!/usr/bin/env bash
# gcloud equivalent of main.tf. Usage: PROJECT_ID=.. BILLING_ACCOUNT=.. IMAGE=.. ./gcloud-setup.sh
set -euo pipefail
: "${PROJECT_ID:?}" "${BILLING_ACCOUNT:?}" "${IMAGE:?}"
REGION="${REGION:-us-central1}"; SERVICE="${SERVICE:-sbcore}"
SECRETS=(NASA_API_KEY AIRNOW_API_KEY OPENWEATHER_API_KEY WEATHER_API_KEY OPENAI_API_KEY ANTHROPIC_API_KEY GEMINI_API_KEY JWT_SECRET FIREBASE_API_KEY GCP_PRIVATE_KEY GCP_PRIVATE_KEY_ID GCP_CLIENT_EMAIL GCP_CLIENT_ID GCP_STORAGE_BUCKET)

gcloud services enable run.googleapis.com secretmanager.googleapis.com billingbudgets.googleapis.com --project "$PROJECT_ID"

# 1. Budget: ₹1000 total, alerts at ₹500 (50%) and ₹1000 (100%); default recipients = billing admins
gcloud billing budgets create --billing-account="$BILLING_ACCOUNT" \
  --display-name="$PROJECT_ID-budget" \
  --filter-projects="projects/$PROJECT_ID" \
  --budget-amount=1000INR \
  --threshold-rule=percent=0.5 --threshold-rule=percent=1.0

# 3. Secrets (create empty; for each, then add the value from env/stdin)
SA="$SERVICE-run@$PROJECT_ID.iam.gserviceaccount.com"
gcloud iam service-accounts create "$SERVICE-run" --project "$PROJECT_ID" || true
SET=""
for s in "${SECRETS[@]}"; do
  gcloud secrets create "$s" --replication-policy=automatic --project "$PROJECT_ID" || true
  if [ -n "${!s:-}" ]; then printf '%s' "${!s}" | gcloud secrets versions add "$s" --data-file=- --project "$PROJECT_ID"; fi
  gcloud secrets add-iam-policy-binding "$s" --member="serviceAccount:$SA" \
    --role=roles/secretmanager.secretAccessor --project "$PROJECT_ID" >/dev/null
  SET+="$s=$s:latest,"
done

# 2. Cloud Run: scale to zero, max 2
gcloud run deploy "$SERVICE" --image "$IMAGE" --region "$REGION" --project "$PROJECT_ID" \
  --min-instances=0 --max-instances=2 --service-account "$SA" \
  --set-secrets="${SET%,}"
