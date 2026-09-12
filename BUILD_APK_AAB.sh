#!/bin/bash

# 🚀 BUILD APK & AAB FILES FOR SBR EMPIRE
# Fully Automated Build Script

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║   🚀 SBR EMPIRE - APK & AAB BUILD SCRIPT 🚀              ║"
echo "║                                                           ║"
echo "║   Building files for PlayStore & Direct Install          ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

set -e

# ============================================
# KEYSTORE PATHS & PASSWORDS
# ============================================

echo "🔐 PHASE 1: Setting Up Keystores"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

KEYSTORE_HIKMAH="sbr-hikmah.jks"
KEYSTORE_BEAUTY="sbr-beautyhub.jks"
KEYSTORE_BIOFORGE="sbr-bioforge.jks"

echo "✓ Keystore 1: $KEYSTORE_HIKMAH"
echo "✓ Keystore 2: $KEYSTORE_BEAUTY"
echo "✓ Keystore 3: $KEYSTORE_BIOFORGE"
echo ""

# ============================================
# BUILD APK FILES
# ============================================

echo "📦 PHASE 2: Building APK Files"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# SBR HIKMAH APK
echo "🕌 Building SBR HIKMAH APK..."
cd sbrhikmah.com/android

./gradlew assembleRelease \
  -Pandroid.injected.signing.store.file=../../$KEYSTORE_HIKMAH \
  -Pandroid.injected.signing.store.password=sbr@hikmah123 \
  -Pandroid.injected.signing.key.alias=sbr-hikmah-key \
  -Pandroid.injected.signing.key.password=sbr@hikmah123 \
  2>&1 | tail -20

if [ -f "app/release/app-release.apk" ]; then
  cp app/release/app-release.apk ../../sbr-hikmah-release.apk
  echo "✅ sbr-hikmah-release.apk created"
  ls -lh ../../sbr-hikmah-release.apk
else
  echo "❌ APK build failed"
  exit 1
fi

cd ../..
echo ""

# SBR BEAUTY HUB APK
echo "💄 Building SBR BEAUTY HUB APK..."
cd sbrbeautyhub.com/android

./gradlew assembleRelease \
  -Pandroid.injected.signing.store.file=../../$KEYSTORE_BEAUTY \
  -Pandroid.injected.signing.store.password=sbr@beauty123 \
  -Pandroid.injected.signing.key.alias=sbr-beautyhub-key \
  -Pandroid.injected.signing.key.password=sbr@beauty123 \
  2>&1 | tail -20

if [ -f "app/release/app-release.apk" ]; then
  cp app/release/app-release.apk ../../sbr-beautyhub-release.apk
  echo "✅ sbr-beautyhub-release.apk created"
  ls -lh ../../sbr-beautyhub-release.apk
else
  echo "❌ APK build failed"
  exit 1
fi

cd ../..
echo ""

# SBR BIOFORGE APK
echo "🌍 Building SBR BIOFORGE APK..."
cd sbrbioforge.com/android

./gradlew assembleRelease \
  -Pandroid.injected.signing.store.file=../../$KEYSTORE_BIOFORGE \
  -Pandroid.injected.signing.store.password=sbr@bioforge123 \
  -Pandroid.injected.signing.key.alias=sbr-bioforge-key \
  -Pandroid.injected.signing.key.password=sbr@bioforge123 \
  2>&1 | tail -20

if [ -f "app/release/app-release.apk" ]; then
  cp app/release/app-release.apk ../../sbr-bioforge-release.apk
  echo "✅ sbr-bioforge-release.apk created"
  ls -lh ../../sbr-bioforge-release.apk
else
  echo "❌ APK build failed"
  exit 1
fi

cd ../..
echo ""

# ============================================
# BUILD AAB FILES
# ============================================

echo "📦 PHASE 3: Building AAB Files (PlayStore)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# SBR HIKMAH AAB
echo "🕌 Building SBR HIKMAH AAB..."
cd sbrhikmah.com/android

./gradlew bundleRelease \
  -Pandroid.injected.signing.store.file=../../$KEYSTORE_HIKMAH \
  -Pandroid.injected.signing.store.password=sbr@hikmah123 \
  -Pandroid.injected.signing.key.alias=sbr-hikmah-key \
  -Pandroid.injected.signing.key.password=sbr@hikmah123 \
  2>&1 | tail -20

if [ -f "app/release/app-release.aab" ]; then
  cp app/release/app-release.aab ../../sbr-hikmah-release.aab
  echo "✅ sbr-hikmah-release.aab created"
  ls -lh ../../sbr-hikmah-release.aab
else
  echo "❌ AAB build failed"
  exit 1
fi

cd ../..
echo ""

# SBR BEAUTY HUB AAB
echo "💄 Building SBR BEAUTY HUB AAB..."
cd sbrbeautyhub.com/android

./gradlew bundleRelease \
  -Pandroid.injected.signing.store.file=../../$KEYSTORE_BEAUTY \
  -Pandroid.injected.signing.store.password=sbr@beauty123 \
  -Pandroid.injected.signing.key.alias=sbr-beautyhub-key \
  -Pandroid.injected.signing.key.password=sbr@beauty123 \
  2>&1 | tail -20

if [ -f "app/release/app-release.aab" ]; then
  cp app/release/app-release.aab ../../sbr-beautyhub-release.aab
  echo "✅ sbr-beautyhub-release.aab created"
  ls -lh ../../sbr-beautyhub-release.aab
else
  echo "❌ AAB build failed"
  exit 1
fi

cd ../..
echo ""

# SBR BIOFORGE AAB
echo "🌍 Building SBR BIOFORGE AAB..."
cd sbrbioforge.com/android

./gradlew bundleRelease \
  -Pandroid.injected.signing.store.file=../../$KEYSTORE_BIOFORGE \
  -Pandroid.injected.signing.store.password=sbr@bioforge123 \
  -Pandroid.injected.signing.key.alias=sbr-bioforge-key \
  -Pandroid.injected.signing.key.password=sbr@bioforge123 \
  2>&1 | tail -20

if [ -f "app/release/app-release.aab" ]; then
  cp app/release/app-release.aab ../../sbr-bioforge-release.aab
  echo "✅ sbr-bioforge-release.aab created"
  ls -lh ../../sbr-bioforge-release.aab
else
  echo "❌ AAB build failed"
  exit 1
fi

cd ../..
echo ""

# ============================================
# FINAL STATUS
# ============================================

echo ""
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║   ✅ BUILD COMPLETE! ✅                                   ║"
echo "║                                                           ║"
echo "║   APK Files (Direct Install):                           ║"
echo "║   ├─ sbr-hikmah-release.apk                             ║"
echo "║   ├─ sbr-beautyhub-release.apk                          ║"
echo "║   └─ sbr-bioforge-release.apk                           ║"
echo "║                                                           ║"
echo "║   AAB Files (PlayStore):                                ║"
echo "║   ├─ sbr-hikmah-release.aab                             ║"
echo "║   ├─ sbr-beautyhub-release.aab                          ║"
echo "║   └─ sbr-bioforge-release.aab                           ║"
echo "║                                                           ║"
echo "║   🎨 Themes Applied:                                    ║"
echo "║   ├─ SBR HIKMAH: Black & Golden 🌟                      ║"
echo "║   ├─ SBR BEAUTY: Pink & Cyan 💗                         ║"
echo "║   └─ SBR BIOFORGE: Green & Blue 🌱                      ║"
echo "║                                                           ║"
echo "║   Ready for PlayStore & Direct Install! 🚀              ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo ""

echo "📊 File Sizes:"
echo ""
ls -lh sbr-*-release.* 2>/dev/null | awk '{print "   " $9 " (" $5 ")"}'
echo ""

echo "✅ All files ready!"
echo ""
