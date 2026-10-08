#!/usr/bin/env bash
# Creates Firebase Hosting sites, links custom domains, prints DNS records.
# Requires: firebase-tools logged in (firebase login / FIREBASE_TOKEN), project owner role.
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-temporal-ground-507415-b2}"

# site-id:domain
SITES=(
  "sbrbioforge:sbrbioforge.com"
  "sbrhikmah:sbrhikmah.com"
  "sbrbeautyhub:sbrbeautyhub.com"
)

TOKEN="$(gcloud auth print-access-token)"
API="https://firebasehosting.googleapis.com/v1beta1/projects/$PROJECT_ID/sites"

for entry in "${SITES[@]}"; do
  site="${entry%%:*}"; domain="${entry##*:}"
  firebase hosting:sites:create "$site" --project "$PROJECT_ID" 2>/dev/null || echo "site $site exists"
  for host in "$domain" "www.$domain"; do
    curl -sS -X POST "$API/$site/customDomains?customDomainId=$host" \
      -H "Authorization: ******" -H "x-goog-user-project: $PROJECT_ID" \
      -H "Content-Type: application/json" -d '{}' >/dev/null || true
  done
  echo; echo "# DNS records for $domain (Hostinger DNS Zone Editor):"
  curl -sS "$API/$site/customDomains/$domain" \
    -H "Authorization: ******" -H "x-goog-user-project: $PROJECT_ID" \
    | python3 -c 'import sys,json; d=json.load(sys.stdin); print(json.dumps(d.get("requiredDnsUpdates",d),indent=2))'
done

echo; echo "Deploy: firebase deploy --only hosting --project $PROJECT_ID"
echo "SSL certificates are provisioned automatically by Firebase after DNS propagates (up to 24h)."
