# 🔍 SBR EMPIRE - LIVE VERIFICATION CHECKLIST
## हर चीज़ का लाइव टेस्ट कैसे करें?

---

## 🟢 STEP 1: Backend (SBR CORE) को Deploy करें

### Cloud Run Deploy करने के लिए:

```bash
# 1. Terminal खोलें और यहाँ जाएं
cd sbcore

# 2. Google Cloud में login करें
gcloud auth login

# 3. Project select करें
gcloud config set project temporal-ground-507415-b2

# 4. Deploy करें
gcloud run deploy sbr-core \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

### 🎯 Deploy के बाद मिलेगा URL:
```
https://sbr-core-[RANDOM].run.app
```

---

## ✅ STEP 2: Backend को Live Check करें

### Postman/Browser में Test करें:

#### Test 1: Health Check
```
📍 GET https://sbr-core-[YOUR-URL].run.app/health

✅ Response मिलना चाहिए:
{
  "status": "healthy",
  "system": "SBR CORE ACTIVE",
  "projects": ["sbrhikmah", "sbrbeautyhub", "sbrbioforge"]
}
```

#### Test 2: User Registration
```
📍 POST https://sbr-core-[YOUR-URL].run.app/api/auth/register

Body (JSON):
{
  "email": "test@sbr.com",
  "password": "Test123!@",
  "name": "Test User"
}

✅ Response:
{
  "success": true,
  "uid": "user123",
  "email": "test@sbr.com"
}
```

#### Test 3: User Login
```
📍 POST https://sbr-core-[YOUR-URL].run.app/api/auth/login

Body:
{
  "email": "test@sbr.com",
  "password": "Test123!@"
}

✅ Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {...}
}

💾 Token को copy करके रखें (अगले requests में use होगा)
```

#### Test 4: Get User Profile
```
📍 GET https://sbr-core-[YOUR-URL].run.app/api/auth/profile

Headers:
Authorization: Bearer [YOUR-TOKEN]

✅ Response:
{
  "uid": "user123",
  "email": "test@sbr.com",
  "name": "Test User",
  "role": "user"
}
```

#### Test 5: AI Service - SBR Aql
```
📍 POST https://sbr-core-[YOUR-URL].run.app/api/ai/aql

Headers:
Authorization: Bearer [YOUR-TOKEN]

Body:
{
  "question": "What is the meaning of Bismillah?"
}

✅ Response:
{
  "service": "SBR Aql",
  "question": "What is the meaning of Bismillah?",
  "answer": "Bismillah means 'In the name of Allah...'",
  "model": "GPT-4o"
}
```

#### Test 6: Environmental API - Weather
```
📍 GET https://sbr-core-[YOUR-URL].run.app/api/environmental/weather?latitude=28.6139&longitude=77.2090&days=5

✅ Response:
{
  "service": "Weather Forecast",
  "location": {"latitude": 28.6139, "longitude": 77.2090},
  "forecast": [...]
}
```

#### Test 7: Database - Create Document
```
📍 POST https://sbr-core-[YOUR-URL].run.app/api/db/products

Headers:
Authorization: Bearer [YOUR-TOKEN]

Body:
{
  "name": "Test Product",
  "price": 999,
  "description": "Test Description"
}

✅ Response:
{
  "id": "doc123",
  "success": true,
  "message": "Document created"
}
```

---

## 🌐 STEP 3: Frontends को Firebase Hosting पर Deploy करें

### A. .env.local files Update करें

**सभी 3 projects में Update करें:**

Replace `https://sbr-core-[YOUR-URL].run.app` के साथ:

**sbrhikmah.com/.env.local:**
```
REACT_APP_SBCORE_API=https://sbr-core-[YOUR-URL].run.app
```

**sbrbeautyhub.com/.env.local:**
```
REACT_APP_SBCORE_API=https://sbr-core-[YOUR-URL].run.app
```

**sbrbioforge.com/.env.local:**
```
REACT_APP_SBCORE_API=https://sbr-core-[YOUR-URL].run.app
```

### B. Deploy करें

```bash
# ========== SBR HIKMAH ==========
cd sbrhikmah.com
npm install
npm run build
firebase deploy --project falaksayyed8474-org

# ========== SBR BEAUTY HUB ==========
cd sbrbeautyhub.com
npm install
npm run build
firebase deploy --project falaksayyed8474-org

# ========== SBR BIOFORGE ==========
cd sbrbioforge.com
npm install
npm run build
firebase deploy --project falaksayyed8474-org
```

---

## ✅ STEP 4: Frontends को Live Check करें

### Firebase Console में जाएं:
```
https://console.firebase.google.com
Project: falaksayyed8474-org
```

### हर app के Hosting URL को देखें:

#### 🕌 SBR HIKMAH:
```
Hosting URL: https://sbr-hikmah-xxxxx.web.app
Status: ✅ Live

Test करें:
1. खोलें: https://sbr-hikmah-xxxxx.web.app
2. Register करें
3. Login करें
4. Dashboard खोलें
5. "Ask SBR Aql" में सवाल पूछें
6. Answer verify करें
```

#### 💄 SBR BEAUTY HUB:
```
Hosting URL: https://sbr-beautyhub-xxxxx.web.app
Status: ✅ Live

Test करें:
1. खोलें: https://sbr-beautyhub-xxxxx.web.app
2. Register करें
3. Login करें
4. Products देखें
5. Salons Browse करें
6. Booking करने की कोशिश करें
```

#### 🌍 SBR BIOFORGE:
```
Hosting URL: https://sbr-bioforge-xxxxx.web.app
Status: ✅ Live

Test करें:
1. खोलें: https://sbr-bioforge-xxxxx.web.app
2. Homepage पर Weather/Air Quality देखें
3. Register करें
4. Dashboard खोलें
5. Location allow करें
6. Real-time Data verify करें
```

---

## 🎯 LIVE TESTING CHECKLIST

### Backend (SBR Core)
```
☐ Health check working
☐ Registration working
☐ Login working
☐ Profile API working
☐ SBR Aql responding
☐ Weather API working
☐ Database CRUD working
```

### SBR HIKMAH
```
☐ Homepage load होता है
☐ Register successful
☐ Login successful
☐ Dashboard load होता है
☐ AI Chat responding
☐ Pages properly styled
☐ Responsive design working
```

### SBR BEAUTY HUB
```
☐ Homepage load होता है
☐ Products list visible
☐ Salons directory working
☐ Booking flow clear
☐ Login integration working
☐ Responsive design
☐ Images loading
```

### SBR BIOFORGE
```
☐ Homepage load होता है
☐ Location permission works
☐ Weather data showing
☐ Air Quality data showing
☐ Maps loading
☐ Alerts visible
☐ Offline mode working
```

---

## 📊 QUICK LINKS TO CHECK

### 1️⃣ Backend Status
```
Link: https://sbr-core-[YOUR-URL].run.app/health
Expected: Green status ✅
```

### 2️⃣ SBR HIKMAH
```
Link: https://sbr-hikmah-xxxxx.web.app
Test: Register → Login → Ask Aql Question
```

### 3️⃣ SBR BEAUTY HUB
```
Link: https://sbr-beautyhub-xxxxx.web.app
Test: Browse Products → Book Salon
```

### 4️⃣ SBR BIOFORGE
```
Link: https://sbr-bioforge-xxxxx.web.app
Test: Check Weather → Check Air Quality → View Maps
```

---

## 🚀 AFTER EVERYTHING IS WORKING

### Custom Domains जोड़ें (Optional लेकिन recommended):

```
Firebase Console → Hosting → Add custom domain

Domain 1: sbrhikmah.com → Points to sbr-hikmah app
Domain 2: sbrbeautyhub.com → Points to sbr-beautyhub app
Domain 3: sbrbioforge.com → Points to sbr-bioforge app
```

---

## 🔴 अगर कुछ काम न करे:

### Issue: Backend Deploy fail हो रहा है
```
Fix: 
1. gcloud config list करके project check करें
2. gcloud auth application-default login करें
3. Cloud Run API enabled है?
```

### Issue: Frontend में "API Connection Error"
```
Fix:
1. .env.local में backend URL सही है?
2. Backend URL के साथ /health कॉल करते हैं?
3. CORS enabled है?
```

### Issue: Firebase Deploy fail हो रहा है
```
Fix:
1. firebase login करके check करें
2. npm run build पहले local में successful?
3. firebase.json file है?
```

### Issue: AI API काम नहीं कर रहा
```
Fix:
1. .env में सभी API keys हैं?
2. Keys की expiry date check करें
3. API quota exceed तो नहीं?
```

---

## ✨ FINAL STATUS

जब सब काम करने लगे:

```
🟢 Backend: https://sbr-core-xxxxx.run.app ✅
🟢 SBR HIKMAH: https://sbr-hikmah-xxxxx.web.app ✅
🟢 SBR BEAUTY HUB: https://sbr-beautyhub-xxxxx.web.app ✅
🟢 SBR BIOFORGE: https://sbr-bioforge-xxxxx.web.app ✅

🎉 LIVE AND RUNNING!
```

---

## 📱 PLAYSTORE पर अपलोड करने के लिए:

जब सब LIVE हो जाए, तब:
1. Android build करें
2. Google Play Console में अपलोड करें
3. Review के लिए submit करें
4. 2-4 घंटे में approve होगा

---

**Ab deploy karo aur links share karo verification के लिए!** 🚀

