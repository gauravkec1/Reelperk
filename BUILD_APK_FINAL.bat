@echo off
echo ========================================
echo   ReelPerk ERP - APK Builder
echo ========================================
echo.

echo Checking prerequisites...
where java >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java not found. Please install JDK 11+
    pause
    exit /b 1
)

where gradlew >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Gradle wrapper not found in android folder
    echo Please run: npx react-native init to generate Android folder
    pause
    exit /b 1
)

echo.
echo [1/4] Cleaning previous builds...
cd android
if exist app\build rmdir /s /q app\build
call gradlew clean
if errorlevel 1 (
    echo ERROR: Clean failed
    pause
    exit /b 1
)

echo.
echo [2/4] Building release APK...
call gradlew assembleRelease
if errorlevel 1 (
    echo.
    echo ERROR: Build failed
    echo.
    echo Troubleshooting:
    echo 1. Make sure Android SDK is installed
    echo 2. Set ANDROID_HOME environment variable
    echo 3. Check android/local.properties file
    echo.
    pause
    exit /b 1
)

echo.
echo [3/4] APK built successfully!
echo.
echo ========================================
echo   APK Location:
echo ========================================
echo.
echo   android\app\build\outputs\apk\release\app-release.apk
echo.

if exist app\build\outputs\apk\release\app-release.apk (
    echo [4/4] Opening output folder...
    cd app\build\outputs\apk\release
    start .
    cd ..\..\..\..\..
    
    echo.
    echo ========================================
    echo   ✅ BUILD SUCCESSFUL!
    echo ========================================
    echo.
    echo Your APK is ready to install!
    echo File: app-release.apk
    echo.
) else (
    echo ERROR: APK file not found
    pause
    exit /b 1
)

pause

