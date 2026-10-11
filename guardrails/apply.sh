#!/usr/bin/env bash
# Usage: BILLING_ACCOUNT_ID=XXXXXX-XXXXXX-XXXXXX ./guardrails/apply.sh
# Run with `gcloud auth login` as a project owner. Budget is in INR.
set -euo pipefail
P=sbrempire-dced5; R=asia-south2
SERVICES=(sbrhikmah sbrbeautyhub sbrbioforge)   # adjust to actual Cloud Run service names
DIR="$(cd "$(dirname "$0")" && pwd)"

for s in "${SERVICES[@]}"; do
  gcloud run services update "$s" --project $P --region $R \
    --min-instances 0 --max-instances 2 --cpu-throttling
done

gcloud pubsub topics create billing-budget-alerts --project $P || true
gcloud functions deploy stopBilling --gen2 --runtime nodejs20 --region $R --project $P \
  --source "$DIR/billing-disabler" --entry-point stopBilling \
  --trigger-topic billing-budget-alerts
# The function's service account needs Billing Account Administrator on the billing account.
gcloud billing budgets create --billing-account "$BILLING_ACCOUNT_ID" \
  --display-name "hard-cap-500-INR" --budget-amount 500INR \
  --filter-projects "projects/$P" \
  --threshold-rule percent=1.0 \
  --notifications-rule-pubsub-topic "projects/$P/topics/billing-budget-alerts"

for repo in $(gcloud artifacts repositories list --project $P --format='value(name)'); do
  loc=$(gcloud artifacts repositories describe "$repo" --project $P --format='value(location)' 2>/dev/null || echo $R)
  gcloud artifacts repositories set-cleanup-policies "$(basename "$repo")" --project $P \
    --location "$loc" --policy "$DIR/artifact-cleanup-policy.json" --no-dry-run
done
