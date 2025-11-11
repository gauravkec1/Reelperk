@echo off
echo ========================================
echo   ReelPerk ERP - Launch Script
echo ========================================
echo.

echo [1/3] Starting Backend Server...
cd backend
start "ReelPerk Backend" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul

echo [2/3] Starting Metro Bundler...
cd ..
start "ReelPerk Metro" cmd /k "npm start"
timeout /t 3 /nobreak >nul

echo [3/3] Opening API Documentation...
timeout /t 5 /nobreak >nul
start http://localhost:5000/api-docs

echo.
echo ========================================
echo   ✅ App is starting!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo API Docs: http://localhost:5000/api-docs
echo.
echo To run mobile app:
echo   npm run ios      (for iOS)
echo   npm run android  (for Android)
echo.
pause

