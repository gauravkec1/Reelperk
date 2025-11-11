@echo off
echo ========================================
echo   ReelPerk ERP - Cursor Preview
echo ========================================
echo.

echo Starting Web Preview...
echo App will open at: http://localhost:3000
echo.

start "ReelPerk Web Preview" cmd /k "npm run web"

timeout /t 3 /nobreak >nul

echo Starting Backend API...
start "ReelPerk Backend" cmd /k "cd backend && npm run dev"

timeout /t 5 /nobreak >nul

echo Opening web preview...
start http://localhost:3000

echo.
echo ========================================
echo   Preview Ready!
echo ========================================
echo.
echo Web App: http://localhost:3000
echo Backend: http://localhost:5000
echo API Docs: http://localhost:5000/api-docs
echo.
echo Check the opened windows!
echo.
pause

