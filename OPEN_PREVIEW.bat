@echo off
echo ========================================
echo   ReelPerk ERP - Quick Preview
echo ========================================
echo.

echo Opening preview page...
start preview.html

timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo   Preview Options:
echo ========================================
echo.
echo 1. Live App (Netlify):
echo    https://relaxed-genie-7d57e3.netlify.app
echo.
echo 2. Local App (if running):
echo    http://localhost:3000
echo.
echo 3. Start Local Server:
echo    npm run web
echo.
echo ========================================
echo.
pause

