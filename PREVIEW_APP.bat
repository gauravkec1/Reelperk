@echo off
echo ========================================
echo   ReelPerk ERP - Preview App
echo ========================================
echo.

echo [1/3] Starting Backend Server...
start "ReelPerk Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul

echo [2/3] Starting Metro Bundler...
start "ReelPerk Metro" cmd /k "npm start"
timeout /t 5 /nobreak >nul

echo [3/3] Opening API Documentation...
timeout /t 3 /nobreak >nul
start http://localhost:5000/api-docs

echo.
echo ========================================
echo   App is Starting!
echo ========================================
echo.
echo Backend: http://localhost:5000
echo API Docs: http://localhost:5000/api-docs
echo.
echo To run on device:
echo   npm run android
echo   OR
echo   npm run ios
echo.
echo Check the opened windows for status.
echo.
pause

