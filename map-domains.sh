#!/usr/bin/env bash
# Maps Hostinger domains to Cloud Run and prints the DNS records to add in Hostinger.
# Usage: PROJECT_ID=... REGION=... ./map-domains.sh
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-temporal-ground-507415-b2}"
REGION="${REGION:-us-central1}"

# domain:cloud-run-service
MAPPINGS=(
  "sbrbioforge.com:sbr-bioforge"
  "sbrhikmah.com:sbr-hikmah"
  "sbrbeautyhub.com:sbr-beautyhub"
)

gcloud config set project "$PROJECT_ID" >/dev/null
gcloud services enable run.googleapis.com firebasehosting.googleapis.com

# NOTE: the Google account running this must be a verified owner of each domain
# (Search Console: https://search.google.com/search-console). Verify with TXT record first:
#   gcloud domains verify <domain>
# Cloud Run domain mappings are not available in every region/are preview; if unsupported,
# use Firebase Hosting rewrites (see firebase.json) or a global external load balancer.

for entry in "${MAPPINGS[@]}"; do
  domain="${entry%%:*}"; service="${entry##*:}"
  for host in "$domain" "www.$domain"; do
    if ! gcloud beta run domain-mappings describe --domain "$host" --region "$REGION" >/dev/null 2>&1; then
      gcloud beta run domain-mappings create --service "$service" --domain "$host" --region "$REGION"
    fi
  done
done

echo; echo "=== DNS records to add in Hostinger hPanel > Domains > DNS / Nameservers > DNS Zone Editor ==="
for entry in "${MAPPINGS[@]}"; do
  domain="${entry%%:*}"
  echo; echo "# $domain (delete existing conflicting A/AAAA/CNAME for @ and www first)"
  gcloud beta run domain-mappings describe --domain "$domain" --region "$REGION" \
    --format='table[no-heading](status.resourceRecords.type,status.resourceRecords.name,status.resourceRecords.rrdata)'
  gcloud beta run domain-mappings describe --domain "www.$domain" --region "$REGION" \
    --format='table[no-heading](status.resourceRecords.type,status.resourceRecords.name,status.resourceRecords.rrdata)'
done

echo; echo "SSL: Google-managed certificates provision automatically once DNS resolves (15 min - 24h)."
echo "Check: gcloud beta run domain-mappings describe --domain <host> --region $REGION --format='value(status.conditions)'"
