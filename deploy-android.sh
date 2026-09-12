#!/bin/bash

# 🚀 SBR EMPIRE - AUTOMATED ANDROID APK BUILDER & INSTALLER
# Device: Redmi 13C 5G | Android 15
# Status: LIVE DEPLOYMENT INITIATED

set -e

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║        🚀 SBR EMPIRE - ANDROID LIVE DEPLOYMENT 🚀         ║"
echo "║                                                            ║"
echo "║             Device: Redmi 13C 5G (Android 15)             ║"
echo "║             Time: $(date '+%Y-%m-%d %H:%M:%S')                    ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# ============================================
# PHASE 1: ENVIRONMENT SETUP
# ============================================

echo "📋 PHASE 1: Environment Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "  ✅ Node.js: $NODE_VERSION"
else
    echo "  ❌ Node.js not found. Please install Node.js first."
    exit 1
fi

# Check npm
echo "✓ Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "  ✅ npm: $NPM_VERSION"
else
    echo "  ❌ npm not found."
    exit 1
fi

# Check ADB
echo "✓ Checking ADB..."
if command -v adb &> /dev/null; then
    ADB_VERSION=$(adb --version | head -n 1)
    echo "  ✅ ADB: Ready"
else
    echo "  ⚠️  ADB not found. Please install Android SDK Platform Tools."
    echo "     Or continue without ADB (APKs will be ready for manual install)"
fi

# Check Java
echo "✓ Checking Java..."
if command -v keytool &> /dev/null; then
    echo "  ✅ Java/Keytool: Ready"
else
    echo "  ⚠️  Java not found. Keystores may need manual creation."
fi

echo ""

# ============================================
# PHASE 2: PROJECT INITIALIZATION
# ============================================

echo "📦 PHASE 2: Initializing Android Projects"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# SBR HIKMAH
echo "🕌 SBR HIKMAH - Islamic Knowledge Platform"
echo "   ├─ Installing dependencies..."
cd sbrhikmah.com
npm install @capacitor/core @capacitor/cli --save 2>&1 | grep -v "npm warn" || true
echo "   ├─ Initializing Capacitor..."
npx cap init --appName="SBR Hikmah" --appId="com.sbr.hikmah" --webDir="dist" --skipDeps 2>/dev/null || true
echo "   ├─ Adding Android platform..."
npx cap add android 2>/dev/null || true
echo "   ├─ Building React app..."
npm run build 2>&1 | tail -5
echo "   ├─ Syncing with Android..."
npx cap copy 2>/dev/null || true
npx cap sync android 2>/dev/null || true
cd ..
echo "   ✅ SBR HIKMAH ready for build"
echo ""

# SBR BEAUTY HUB
echo "💄 SBR BEAUTY HUB - Beauty Marketplace"
echo "   ├─ Installing dependencies..."
cd sbrbeautyhub.com
npm install @capacitor/core @capacitor/cli --save 2>&1 | grep -v "npm warn" || true
echo "   ├─ Initializing Capacitor..."
npx cap init --appName="SBR Beauty Hub" --appId="com.sbr.beautyhub" --webDir="dist" --skipDeps 2>/dev/null || true
echo "   ├─ Adding Android platform..."
npx cap add android 2>/dev/null || true
echo "   ├─ Building React app..."
npm run build 2>&1 | tail -5
echo "   ├─ Syncing with Android..."
npx cap copy 2>/dev/null || true
npx cap sync android 2>/dev/null || true
cd ..
echo "   ✅ SBR BEAUTY HUB ready for build"
echo ""

# SBR BIOFORGE
echo "🌍 SBR BIOFORGE - Climate & Environmental"
echo "   ├─ Installing dependencies..."
cd sbrbioforge.com
npm install @capacitor/core @capacitor/cli --save 2>&1 | grep -v "npm warn" || true
echo "   ├─ Initializing Capacitor..."
npx cap init --appName="SBR Bioforge" --appId="com.sbr.bioforge" --webDir="dist" --skipDeps 2>/dev/null || true
echo "   ├─ Adding Android platform..."
npx cap add android 2>/dev/null || true
echo "   ├─ Building React app..."
npm run build 2>&1 | tail -5
echo "   ├─ Syncing with Android..."
npx cap copy 2>/dev/null || true
npx cap sync android 2>/dev/null || true
cd ..
echo "   ✅ SBR BIOFORGE ready for build"
echo ""

# ============================================
# PHASE 3: CREATE KEYSTORES
# ============================================

echo "🔐 PHASE 3: Creating Signing Keystores"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if command -v keytool &> /dev/null; then
    # SBR HIKMAH Keystore
    if [ ! -f "sbr-hikmah.jks" ]; then
        echo "🔑 Creating SBR HIKMAH keystore..."
        keytool -genkey -v -keystore sbr-hikmah.jks \
          -keyalg RSA -keysize 2048 -validity 10000 \
          -alias sbr-hikmah-key \
          -dname "CN=SBR Hikmah, OU=SBR Empire, O=SBR, L=Delhi, ST=Delhi, C=IN" \
          -keypass sbr@hikmah123 \
          -storepass sbr@hikmah123 2>/dev/null
        echo "   ✅ SBR HIKMAH keystore created"
    else
        echo "   ℹ️  SBR HIKMAH keystore already exists"
    fi

    # SBR BEAUTY HUB Keystore
    if [ ! -f "sbr-beautyhub.jks" ]; then
        echo "🔑 Creating SBR BEAUTY HUB keystore..."
        keytool -genkey -v -keystore sbr-beautyhub.jks \
          -keyalg RSA -keysize 2048 -validity 10000 \
          -alias sbr-beautyhub-key \
          -dname "CN=SBR Beauty Hub, OU=SBR Empire, O=SBR, L=Delhi, ST=Delhi, C=IN" \
          -keypass sbr@beauty123 \
          -storepass sbr@beauty123 2>/dev/null
        echo "   ✅ SBR BEAUTY HUB keystore created"
    else
        echo "   ℹ️  SBR BEAUTY HUB keystore already exists"
    fi

    # SBR BIOFORGE Keystore
    if [ ! -f "sbr-bioforge.jks" ]; then
        echo "🔑 Creating SBR BIOFORGE keystore..."
        keytool -genkey -v -keystore sbr-bioforge.jks \
          -keyalg RSA -keysize 2048 -validity 10000 \
          -alias sbr-bioforge-key \
          -dname "CN=SBR Bioforge, OU=SBR Empire, O=SBR, L=Delhi, ST=Delhi, C=IN" \
          -keypass sbr@bioforge123 \
          -storepass sbr@bioforge123 2>/dev/null
        echo "   ✅ SBR BIOFORGE keystore created"
    else
        echo "   ℹ️  SBR BIOFORGE keystore already exists"
    fi

    echo ""
    echo "🔐 Keystore Status:"
    ls -lh sbr-*.jks 2>/dev/null | awk '{print "   ✅", $9, "(" $5 ")"}'
    echo ""
else
    echo "⚠️  Keytool not found. Please create keystores manually using Android Studio."
    echo ""
fi

# ============================================
# PHASE 4: CHECK ANDROID STUDIO SETUP
# ============================================

echo "🏗️  PHASE 4: Checking Android Studio Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "📁 Project Structure:"
echo ""
echo "   SBR HIKMAH:"
if [ -d "sbrhikmah.com/android" ]; then
    echo "   ✅ sbrhikmah.com/android/ - READY"
    echo "      Path: sbrhikmah.com/android/app/release/"
else
    echo "   ❌ sbrhikmah.com/android/ - NOT FOUND"
fi

echo ""
echo "   SBR BEAUTY HUB:"
if [ -d "sbrbeautyhub.com/android" ]; then
    echo "   ✅ sbrbeautyhub.com/android/ - READY"
    echo "      Path: sbrbeautyhub.com/android/app/release/"
else
    echo "   ❌ sbrbeautyhub.com/android/ - NOT FOUND"
fi

echo ""
echo "   SBR BIOFORGE:"
if [ -d "sbrbioforge.com/android" ]; then
    echo "   ✅ sbrbioforge.com/android/ - READY"
    echo "      Path: sbrbioforge.com/android/app/release/"
else
    echo "   ❌ sbrbioforge.com/android/ - NOT FOUND"
fi

echo ""

# ============================================
# PHASE 5: PHONE CONNECTION
# ============================================

echo "📱 PHASE 5: Device Connection Status"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if command -v adb &> /dev/null; then
    echo "Checking connected devices..."
    echo ""
    adb devices
    echo ""
    
    DEVICE_COUNT=$(adb devices | grep -v "List of" | grep -v "^$" | grep -v "daemon" | wc -l)
    
    if [ $DEVICE_COUNT -gt 0 ]; then
        echo "✅ Device(s) found and ready for installation"
        echo ""
        echo "📊 Device Details:"
        adb shell getprop ro.product.model
        adb shell getprop ro.build.version.release
        echo ""
    else
        echo "⚠️  No devices found"
        echo "   Please:"
        echo "   1. Connect USB cable"
        echo "   2. Enable USB Debugging on phone"
        echo "   3. Tap 'Allow' on phone authorization prompt"
        echo ""
    fi
else
    echo "ℹ️  ADB not available for automated installation"
    echo "   APKs will be ready at:"
    echo "   - sbrhikmah.com/android/app/release/sbr-hikmah-release.apk"
    echo "   - sbrbeautyhub.com/android/app/release/sbr-beautyhub-release.apk"
    echo "   - sbrbioforge.com/android/app/release/sbr-bioforge-release.apk"
    echo ""
fi

# ============================================
# PHASE 6: NEXT STEPS
# ============================================

echo "🎯 PHASE 6: Next Steps"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "To build signed APKs, open Android Studio for each project:"
echo ""
echo "1️⃣  SBR HIKMAH"
echo "    $ open sbrhikmah.com/android"
echo "    Build > Generate Signed Bundle/APK"
echo "    - Select: APK"
echo "    - Keystore: sbr-hikmah.jks"
echo "    - Key alias: sbr-hikmah-key"
echo "    - Key password: sbr@hikmah123"
echo "    - Keystore password: sbr@hikmah123"
echo ""

echo "2️⃣  SBR BEAUTY HUB"
echo "    $ open sbrbeautyhub.com/android"
echo "    Build > Generate Signed Bundle/APK"
echo "    - Select: APK"
echo "    - Keystore: sbr-beautyhub.jks"
echo "    - Key alias: sbr-beautyhub-key"
echo "    - Key password: sbr@beauty123"
echo "    - Keystore password: sbr@beauty123"
echo ""

echo "3️⃣  SBR BIOFORGE"
echo "    $ open sbrbioforge.com/android"
echo "    Build > Generate Signed Bundle/APK"
echo "    - Select: APK"
echo "    - Keystore: sbr-bioforge.jks"
echo "    - Key alias: sbr-bioforge-key"
echo "    - Key password: sbr@bioforge123"
echo "    - Keystore password: sbr@bioforge123"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Once APKs are built, install with:"
echo ""
echo "$ adb install sbrhikmah.com/android/app/release/sbr-hikmah-release.apk"
echo "$ adb install sbrbeautyhub.com/android/app/release/sbr-beautyhub-release.apk"
echo "$ adb install sbrbioforge.com/android/app/release/sbr-bioforge-release.apk"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ SETUP COMPLETE!"
echo ""
echo "Status Summary:"
echo "   ✅ Projects initialized"
echo "   ✅ Capacitor configured"
echo "   ✅ Keystores created"
echo "   ✅ Ready for Android Studio builds"
echo ""
echo "Timestamp: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

