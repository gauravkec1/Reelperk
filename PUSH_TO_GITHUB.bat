@echo off
echo ========================================
echo   Push ReelPerk to GitHub
echo ========================================
echo.

echo Step 1: Create a repository on GitHub
echo   Go to: https://github.com/new
echo   Name: ReelPerk
echo   DO NOT initialize with README
echo.
pause

echo.
echo Step 2: Enter your GitHub repository URL
echo   Example: https://github.com/yourusername/ReelPerk.git
echo.
set /p REPO_URL="Repository URL: "

if "%REPO_URL%"=="" (
    echo Error: Repository URL is required!
    pause
    exit /b 1
)

echo.
echo Adding remote origin...
git remote add origin %REPO_URL%

echo.
echo Setting branch to main...
git branch -M main

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo   Push Complete!
echo ========================================
echo.
echo Your code is now on GitHub!
echo Repository: %REPO_URL%
echo.
pause

