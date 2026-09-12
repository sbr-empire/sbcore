# SBR CORE - Architecture & Integration Guide

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  SBR CORE (Backend)                     │
│  ┌─────────────────────────────────────────────────┐    │
│  │          Express.js Server (Cloud Run)          │    │
│  ├─────────────────────────────────────────────────┤    │
│  │ Authentication Service (Firebase Auth + JWT)    │    │
│  │ AI Service (OpenAI, Claude, Gemini)             │    │
│  │ Database Service (Firestore)                    │    │
│  └─────────────────────────────────────────────────┘    │
└────────────────┬──────────────────┬────────────────────┘
         ┌───────┴──────────┬──────────┴──────────┐
         │                  │                     │
   ┌─────▼─────┐    ┌──────▼──────┐     ┌───────▼────┐
   │HIKMAH.COM │    │BEAUTY HUB   │     │BIOFORGE   │
   │(Frontend) │    │(Frontend)   │     │(Frontend) │
   └───────────┘    └─────────────┘     └───────────┘
         │                  │                     │
         └──────────────────┼─────────────────────┘
                     ▼
         ┌──────────────────────────┐
         │  Google Cloud Services   │
         ├──────────────────────────┤
         │  • Firestore (Database)  │
         │  • Cloud Storage         │
         │  • Pub/Sub (Events)      │
         │  • Cloud Run             │
         │  • Firebase              │
         └──────────────────────────┘
```

## 🔌 Integration Steps

### 1. HIKMAH Integration

```javascript
// In sbrhikmah.com frontend
const API_BASE = 'https://sbr-core-api.run.app';

// Register/Login
const login = async (email, password) => {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const { token, user } = await response.json();
  localStorage.setItem('auth_token', token);
  return user;
};

// Ask Aql (Islamic Knowledge)
const askAql = async (question) => {
  const response = await fetch(`${API_BASE}/api/ai/aql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    },
    body: JSON.stringify({ question })
  });
  return await response.json();
};
```

### 2. BEAUTY HUB Integration

```javascript
// Product Management
const createProduct = async (productData) => {
  const response = await fetch(`${API_BASE}/api/db/products`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productData)
  });
  return await response.json();
};

// Get Salon Services
const getSalonServices = async (salonId) => {
  const response = await fetch(
    `${API_BASE}/api/db/services?salon=${salonId}`,
    {
      headers: { 'Authorization': `Bearer ${token}` }
    }
  );
  return await response.json();
};
```

### 3. BIOFORGE Integration

```javascript
// Environmental Data
const getAirQuality = async (latitude, longitude) => {
  // Call external API through sbcore
  const response = await fetch(`${API_BASE}/api/ai/safar`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      question: `Air quality at ${latitude}, ${longitude}`,
      location: { lat: latitude, lng: longitude }
    })
  });
  return await response.json();
};
```

## 🔐 Security Rules (Firestore)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }
    
    // Public data
    match /products/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Services
    match /services/{document=**} {
      allow read: if true;
      allow write: if request.auth.token.role == 'admin';
    }
  }
}
```

## 📊 Database Schema

### Users Collection
```json
{
  "uid": "user123",
  "email": "user@sbr.com",
  "name": "User Name",
  "role": "user",
  "preferences": {
    "language": "en",
    "theme": "dark"
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-02T00:00:00Z"
}
```

### Products Collection (Beauty Hub)
```json
{
  "id": "product123",
  "name": "Product Name",
  "category": "skincare",
  "price": 29.99,
  "image": "https://storage.googleapis.com/...",
  "rating": 4.5,
  "reviews": 150,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Services Collection (Beauty Hub)
```json
{
  "id": "service123",
  "salonId": "salon456",
  "name": "Haircut",
  "price": 50,
  "duration": 30,
  "description": "Professional haircut",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

## 🚀 Deployment Checklist

- [ ] Google Cloud Project created
- [ ] Service Account key downloaded
- [ ] Firebase initialized
- [ ] Environment variables configured
- [ ] API keys added to Cloud Secret Manager
- [ ] Firestore security rules deployed
- [ ] Cloud Run service created
- [ ] Domain configured
- [ ] SSL certificate enabled
- [ ] Monitoring & logging enabled
- [ ] Automated backups configured
- [ ] CI/CD pipeline set up

---

**For more help, visit: [SBR Documentation](https://docs.sbr-empire.com)**
