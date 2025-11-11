@echo off
echo ========================================
echo   Building ReelPerk ERP APK
echo ========================================
echo.

echo [1/4] Cleaning previous builds...
cd android
call gradlew clean
if errorlevel 1 (
    echo Error: Clean failed
    pause
    exit /b 1
)

echo [2/4] Building release APK...
call gradlew assembleRelease
if errorlevel 1 (
    echo Error: Build failed
    pause
    exit /b 1
)

echo [3/4] APK built successfully!
echo.
echo APK Location:
echo android\app\build\outputs\apk\release\app-release.apk
echo.

echo [4/4] Opening output folder...
cd app\build\outputs\apk\release
start .
cd ..\..\..\..\..

echo.
echo ========================================
echo   APK Build Complete!
echo ========================================
echo.
echo Your APK is ready to install!
echo.
pause

