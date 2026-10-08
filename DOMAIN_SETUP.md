# Domain mapping (Hostinger -> Cloud Run / Firebase)

1. `gcloud auth login`, `firebase login`; verify domain ownership (`gcloud domains verify <domain>`; add the TXT record shown to Hostinger).
2. `./map-domains.sh` – creates Cloud Run domain mappings for apex and `www`, prints exact A/AAAA/CNAME records.
3. `./firebase-setup.sh` – creates Firebase Hosting sites (sbrbioforge, sbrhikmah, sbrbeautyhub), attaches custom domains, prints required DNS/TXT records.
4. Copy `.firebaserc.example` to `.firebaserc`; deploy: `firebase deploy --only hosting --config firebase.production.json`.
5. In Hostinger hPanel > DNS Zone Editor: remove old A/AAAA/CNAME on `@` and `www`, add the printed records (A/AAAA on `@`, CNAME `www`, TXT for verification). Keep DNS-only (no proxy).

**Important:** a hostname can point to either Cloud Run mapping or Firebase Hosting, not both. Recommended: use Firebase Hosting for the domains (its `/api/**` rewrite proxies to Cloud Run), and use Cloud Run mapping only for e.g. `api.<domain>` subdomains. Edit `MAPPINGS` in `map-domains.sh` accordingly.

SSL: Google-managed certificates (Cloud Run and Firebase) provision automatically after DNS resolves (minutes to 24h). Don't set CAA records excluding `pki.goog`/`letsencrypt.org`.
