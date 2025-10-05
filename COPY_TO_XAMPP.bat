@echo off
title Copy Project to XAMPP
color 0A

echo ========================================
echo   Copying Project to XAMPP htdocs
echo ========================================
echo.

REM Check if XAMPP exists
if not exist "C:\xampp\htdocs\" (
    echo ERROR: XAMPP not found at C:\xampp\
    echo Please install XAMPP first!
    pause
    exit
)

echo [1/3] Checking destination...
if exist "C:\xampp\htdocs\Agboedo-Ecommerce-Website\" (
    echo Destination folder already exists. Removing old version...
    rmdir /s /q "C:\xampp\htdocs\Agboedo-Ecommerce-Website"
)

echo [2/3] Copying project files...
xcopy "%~dp0*" "C:\xampp\htdocs\Agboedo-Ecommerce-Website\" /E /I /H /Y

echo [3/3] Verifying...
if exist "C:\xampp\htdocs\Agboedo-Ecommerce-Website\index.html" (
    echo.
    echo ========================================
    echo   SUCCESS! Project copied successfully
    echo ========================================
    echo.
    echo Project location: C:\xampp\htdocs\Agboedo-Ecommerce-Website\
    echo.
    echo Next steps:
    echo 1. Start XAMPP (Apache + MySQL)
    echo 2. Setup database (see SETUP_INSTRUCTIONS.txt)
    echo 3. Open: http://localhost/Agboedo-Ecommerce-Website/index.html
    echo.
) else (
    echo ERROR: Copy failed!
)

pause
