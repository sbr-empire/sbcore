# 🚀 SBR CORE - Empire Foundation

**The unified backend infrastructure for SBR Empire's three mega-projects:**
- 🕌 **SBR HIKMAH** - Islamic Knowledge Platform
- 💄 **SBR BEAUTY HUB** - Global Beauty Marketplace  
- 🌍 **SBR BIOFORGE** - Climate Resilience & Survival Intelligence

---

## 📋 Features

### ✅ Authentication
- Firebase-backed registration metadata
- JWT Token Management
- Role-Based Access Control (RBAC)
- Bcrypt-hashed password verification on login

### 🤖 AI Integration
- **SBR Aql** - Islamic Knowledge (OpenAI GPT-4o)
- **SBR Qalam** - Smart Writing (Claude 3.5 Sonnet)
- **SBR Safar** - Location Intelligence (Google Gemini)
- Batch AI Processing

### 💾 Database
- Firestore (NoSQL)
- Real-time Sync
- Collection Management
- Query Operations
- Batch Write Operations

### ☁️ Google Cloud
- Cloud Run (Serverless)
- Cloud Storage
- Pub/Sub Messaging
- Cloud Functions Integration

---

## 🔧 Setup & Installation

### 1. Clone Repository
```bash
git clone https://github.com/sbr-empire/sbcore.git
cd sbcore
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env with your Google Cloud & Firebase credentials
```

Required launch env vars use the `SBR_` prefix. At minimum configure:

```bash
SBR_PORT=8080
SBR_NODE_ENV=development
SBR_GCP_PROJECT_ID=your-project-id
SBR_GCP_PRIVATE_KEY=your-private-key
SBR_GCP_CLIENT_EMAIL=your-service-account-email
SBR_JWT_SECRET=replace-with-a-long-random-secret
SBR_FIRESTORE_USERS_COLLECTION=sbr_users
```

### 4. Get Google Cloud Credentials
```bash
# Visit Google Cloud Console
# Create Service Account
# Download JSON key
# Add to .env as SBR_GCP_PRIVATE_KEY
```

### 5. Start Development Server
```bash
npm run dev
```

`npm start` and `npm run dev` both launch the active root entrypoint: `server.js`.

### 6. Test Health Check
```bash
curl http://localhost:8080/health
```

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user with email + password
GET    /api/auth/profile     - Get user profile (auth required)
PUT    /api/auth/profile     - Update profile (auth required)
POST   /api/auth/logout      - Logout user (auth required)
```

Registration stores a bcrypt password hash in Firestore and login issues an application JWT signed with `SBR_JWT_SECRET`. Protected routes continue to use `Authorization: ******

### AI Services
```
POST   /api/ai/aql           - SBR Aql (Islamic Knowledge)
POST   /api/ai/qalam         - SBR Qalam (Smart Writing)
POST   /api/ai/safar         - SBR Safar (Location Intelligence)
POST   /api/ai/batch         - Batch AI Processing
```

### Database
```
GET    /api/db/:collection           - Get all documents
GET    /api/db/:collection/:id       - Get single document
POST   /api/db/:collection           - Create document
PUT    /api/db/:collection/:id       - Update document
DELETE /api/db/:collection/:id       - Delete document
```

---

## 🔐 Security

- ✅ JWT Token Verification
- ✅ Role-Based Authorization
- ✅ CORS Configuration
- ✅ Environment Variable Protection
- ✅ Firestore Security Rules (In progress)

---

## 📦 Deployment

### Google Cloud Run
```bash
gloud run deploy sbr-core \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

### Docker
```bash
docker build -f docker/Dockerfile -t sbr-core .
docker run -p 8080:8080 sbr-core
```

---

## 🧪 Testing

```bash
# Run tests
npm test

# Test registration
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@sbr.com","password":"test123"}'

# Test AI
curl -X POST http://localhost:8080/api/ai/aql \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"question":"What is Islamic ethics?"}'
```

---

## 📚 Documentation

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

---

## 🤝 Contributing

Contributions welcome! Please follow the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

---

## 📄 License

Copyright 2024 SBR Empire. All rights reserved.

---

**Built with ❤️ for the next 300 years of civilization.**
