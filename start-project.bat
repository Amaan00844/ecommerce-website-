@echo off
title HomeTech Spares - Server Launcher
color 0A

echo ========================================
echo    HomeTech Spares - Starting Servers
echo ========================================
echo.

echo [1/3] Checking XAMPP...
echo Please ensure XAMPP Apache and MySQL are running!
echo.

echo [2/3] Starting Node.js Authentication Server...
start "Auth Server" cmd /k "cd backend\auth && echo Starting Auth Server on Port 5001... && npm start"
timeout /t 3 /nobreak >nul
echo.

echo [3/3] Opening Website in Browser...
timeout /t 2 /nobreak >nul
start http://localhost/Agboedo-Ecommerce-Website/index.html
echo.

echo ========================================
echo    All Services Started Successfully!
echo ========================================
echo.
echo Website: http://localhost/Agboedo-Ecommerce-Website/index.html
echo Admin Panel: http://localhost/Agboedo-Ecommerce-Website/admin.html
echo Auth Server: http://localhost:5001
echo.
echo Default Admin Login:
echo   Email: admin@admin.com
echo   Password: admin123
echo.
echo Press any key to open Admin Dashboard...
pause >nul
start http://localhost/Agboedo-Ecommerce-Website/admin.html
