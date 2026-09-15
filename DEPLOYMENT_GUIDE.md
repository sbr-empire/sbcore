# 🚀 SBR EMPIRE - LIVE DEPLOYMENT & PLAYSTORE GUIDE
## 300 साल की सभ्यता के लिए तैयार!

---

## 📋 STEP 1: BACKEND (SBCORE) को Cloud Run पर Deploy करें

### A. Google Cloud Setup
```bash
# 1. GCP Console में जाएं
# https://console.cloud.google.com

# 2. Project चुनें: falaksayyed8474-org (ID: 922220496736361)

# 3. Cloud Run API enable करें
gcloud services enable run.googleapis.com

# 4. Service Account बनाएं
gcloud iam service-accounts create sbr-core-deploy

# 5. Permissions दें
gcloud projects add-iam-policy-binding temporal-ground-507415-b2 \
  --member=serviceAccount:sbr-core-deploy@temporal-ground-507415-b2.iam.gserviceaccount.com \
  --role=roles/run.admin
```

### B. Deploy करें
```bash
cd sbcore

# Build and push Docker image
gcloud builds submit --tag gcr.io/temporal-ground-507415-b2/sbr-core

# Deploy to Cloud Run
gcloud run deploy sbr-core \
  --image gcr.io/temporal-ground-507415-b2/sbr-core \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars SBR_NODE_ENV=production,SBR_FIREBASE_PROJECT_ID=falaksayyed8474-org,SBR_GCP_PROJECT_ID=falaksayyed8474-org,SBR_PORT=8080
```

### C. मिलेगा URL (Live Backend)
```
✅ https://sbr-core-xxxxx.run.app
```

---

## 📋 STEP 2: FRONTENDS को Firebase Hosting पर Deploy करें

### A. Firebase Setup
```bash
# सभी 3 projects में करना है:

# 1. Firebase CLI install करें
npm install -g firebase-tools

# 2. Login करें
firebase login

# 3. Initialize करें
firebase init hosting
```

### B. .env.local में Backend URL Update करें

**sbrhikmah.com/.env.local:**
```
REACT_APP_SBCORE_API=https://sbr-core-xxxxx.run.app
```

**sbrbeautyhub.com/.env.local:**
```
REACT_APP_SBCORE_API=https://sbr-core-xxxxx.run.app
```

**sbrbioforge.com/.env.local:**
```
REACT_APP_SBCORE_API=https://sbr-core-xxxxx.run.app
```

### C. Build और Deploy करें
```bash
# SBR HIKMAH
cd sbrhikmah.com
npm run build
firebase deploy --project falaksayyed8474-org

# SBR BEAUTY HUB
cd sbrbeautyhub.com
npm run build
firebase deploy --project falaksayyed8474-org

# SBR BIOFORGE
cd sbrbioforge.com
npm run build
firebase deploy --project falaksayyed8474-org
```

### D. मिलेंगे URLs
```
✅ https://sbr-hikmah-xxxxx.web.app
✅ https://sbr-beauty-hub-xxxxx.web.app
✅ https://sbr-bioforge-xxxxx.web.app
```

---

## 📋 STEP 3: CUSTOM DOMAINS जोड़ें

### Firebase Console में:
1. Hosting > Add custom domain
2. **sbrhikmah.com** → Add
3. **sbrbeautyhub.com** → Add
4. **sbrbioforge.com** → Add

### DNS Settings (Domain Provider में):
```
Type: A Record
Value: 199.36.158.100 (Firebase IP)

Type: CNAME
Value: firebase-ssl-redirect (for www)
```

### Result:
```
✅ https://sbrhikmah.com
✅ https://sbrbeautyhub.com
✅ https://sbrbioforge.com
```

---

## 🎮 LIVE CHECK कैसे करें?

### 1. Backend Health Check
```bash
curl https://sbr-core-xxxxx.run.app/health

# Response:
{
  "status": "healthy",
  "system": "SBR CORE ACTIVE",
  "timestamp": "2026-09-12T...",
  "version": "1.0.0"
}
```

### 2. Registration Test
```bash
curl -X POST https://sbr-core-xxxxx.run.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@sbr.com",
    "password": "Test123!",
    "name": "Test User"
  }'
```

### 3. Login Test
```bash
curl -X POST https://sbr-core-xxxxx.run.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@sbr.com",
    "password": "Test123!"
  }'
```

### 4. AI Service Test
```bash
curl -X POST https://sbr-core-xxxxx.run.app/api/ai/aql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "question": "What is Islamic ethics?"
  }'
```

### 5. Environmental API Test
```bash
curl https://sbr-core-xxxxx.run.app/api/environmental/weather \
  -d "latitude=28.6139&longitude=77.2090"
```

---

## 📱 PLAYSTORE पर APP कैसे डालें?

### STEP 1: APK/AAB Build करें

#### A. Android Studio के साथ Setup
```bash
# Capacitor install करें (React को Native बनाने के लिए)
npm install @capacitor/core @capacitor/cli

# Initialize करें
npx cap init

# Android project बनाएं
npx cap add android

# Build करें
npm run build
npx cap copy
npx cap open android
```

#### B. Android Studio में
1. **Build** → **Generate Signed Bundle/APK**
2. **Create new keystore**:
   - Path: `android/sbr-empire.jks`
   - Password: (safe रखें!)
   - Key alias: sbr-key
   - Key password: (safe रखें!)
3. **Build type: Release**
4. **Output: Bundle (Google Play)**

#### C. मिलेगा
```
✅ sbr-hikmah.aab (SBR HIKMAH के लिए)
✅ sbr-beautyhub.aab (SBR BEAUTY HUB के लिए)
✅ sbr-bioforge.aab (SBR BIOFORGE के लिए)
```

---

### STEP 2: Google Play Developer Account

1. **Google Play Console खोलें**
   ```
   https://play.google.com/console
   ```

2. **Account बनाएं** (अगर नहीं है)
   - Email: falaksayyed8474@gmail.com
   - Payment info जोड़ें ($25 one-time fee)

3. **हर app के लिए करें:**
   - Create new app
   - App name: "SBR HIKMAH"
   - Default language: English
   - Audience: 13+

---

### STEP 3: App की Details भरें

#### For Each App:

**A. App Information**
```
Title: SBR HIKMAH / SBR BEAUTY HUB / SBR BIOFORGE
Short description: (50 characters)
Full description: (4000 characters max)
Category: Education / Shopping / Weather
Content rating: PEGI 3
```

**B. Screenshots & Images**
```
✅ Phone screenshots (2-8 images)
✅ Tablet screenshots (optional)
✅ App icon (512x512)
✅ Feature graphic (1024x500)
✅ Cover image (1080x1920)
```

**C. Pricing & Distribution**
```
Price: Free
Countries: Select All / India focused
Content rating form: Fill it out
```

**D. Permissions**
```
Location (for BIOFORGE)
Camera (for BEAUTY HUB - virtual try-on)
Microphone (optional)
```

---

### STEP 4: Upload करें

```bash
# Release > Production > Create new release

# Upload करें:
1. Upload your AAB/APK file
2. Release notes भरें
3. "Send to Review" दबाएं
```

---

## 🔍 PLAYSTORE पर APP PUBLISH होने का समय

```
⏱️ Google Review Process: 2-4 घंटे
✅ Approval के बाद: तुरंत live हो जाता है
```

---

## 📊 PLAYSTORE URLS (After Approval)

```
✅ https://play.google.com/store/apps/details?id=com.sbr.hikmah
✅ https://play.google.com/store/apps/details?id=com.sbr.beautyhub
✅ https://play.google.com/store/apps/details?id=com.sbr.bioforge
```

---

## 🎯 COMPLETE CHECKLIST

### Backend (sbcore)
- [ ] Google Cloud Project selected
- [ ] Cloud Run API enabled
- [ ] Service Account created
- [ ] Docker image built
- [ ] Deployed to Cloud Run
- [ ] Health check working
- [ ] All 12 API keys active
- [ ] Firestore connected
- [ ] Firebase Auth configured

### Frontends (3 apps)
- [ ] .env.local updated with backend URL
- [ ] `npm run build` successful
- [ ] Firebase hosting configured
- [ ] Custom domains added
- [ ] SSL working (auto on Firebase)
- [ ] All pages loading
- [ ] Login/Register working
- [ ] AI services responding
- [ ] Images & assets loading

### PlayStore
- [ ] Google Play Console account
- [ ] Developer payment done
- [ ] 3 apps created
- [ ] Screenshots uploaded
- [ ] Descriptions written
- [ ] AAB files built
- [ ] Apps submitted for review
- [ ] Privacy policy set
- [ ] Terms of service set

---

## 🔐 SECURITY CHECKLIST

- [ ] .env files में secrets safe हैं
- [ ] Firestore security rules configured
- [ ] CORS properly set
- [ ] SSL/HTTPS enabled
- [ ] API rate limiting active
- [ ] Input validation done
- [ ] No API keys exposed in frontend

---

## 📞 MONITORING & SUPPORT

### Google Cloud Console
```
Logs: Cloud Logging
Errors: Cloud Error Reporting
Performance: Cloud Trace
```

### Firebase Console
```
Realtime Database: Firestore
Authentication: Firebase Auth
Hosting: Deployment logs
```

---

## 🚨 COMMON ISSUES & FIXES

### Issue 1: CORS Error
```
Fix: Backend में CORS settings check करें
src/server.js में CORS_ORIGIN verified?
```

### Issue 2: Backend not responding
```
Fix: Cloud Run service active है?
Check: gcloud run services list
```

### Issue 3: App not loading in PlayStore
```
Fix: AAB file size < 150MB?
All dependencies resolved?
```

### Issue 4: Location permission denied
```
Fix: AndroidManifest.xml में permission declared?
User approval flow working?
```

---

## 💬 FINAL DEPLOYMENT COMMANDS

```bash
# === BACKEND ===
# 1. Navigate to sbcore
cd sbcore

# 2. Build Docker image
gcloud builds submit --tag gcr.io/temporal-ground-507415-b2/sbr-core

# 3. Deploy
gcloud run deploy sbr-core \
  --image gcr.io/temporal-ground-507415-b2/sbr-core \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# === FRONTENDS (repeat for each) ===
# 1. Update .env.local with backend URL
# 2. Build
npm run build

# 3. Deploy
firebase deploy --project falaksayyed8474-org

# === MOBILE APPS ===
# 1. Build AAB
npm run build
npx cap copy
# Open Android Studio and build

# 2. Upload to PlayStore Console
# (Manual process through Google Play Console)
```

---

## ✨ LIVE AFTER THESE STEPS!

```
🎉 SBR HIKMAH Live: https://sbrhikmah.com
🎉 SBR BEAUTY HUB Live: https://sbrbeautyhub.com
🎉 SBR BIOFORGE Live: https://sbrbioforge.com
🎉 PlayStore: Search "SBR" 3 apps मिलेंगे!
```

---

**Alhamdulillah! Complete guide ready!** 🙌

**Ab deploy karo aur live check karo!** 🚀
