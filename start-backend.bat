@echo off
title Aura Coffee - Backend Server
echo ========================================
echo   AURA COFFEE - KHOI DONG BACKEND
echo ========================================
echo.

:: === B1: Kill process dang chiem port 8080 neu co ===
echo [1/4] Dang kiem tra port 8080...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8080 "') do (
    echo   Phat hien tien trinh PID %%a dang chiem port 8080. Dang tat...
    taskkill /f /pid %%a >nul 2>&1
    timeout /t 2 /nobreak >nul
)
echo   Port 8080 da duoc giai phong.
echo.

:: === B2: Build lai backend ===
echo [2/4] Dang build lai backend (mvnw clean package)...
cd /d "%~dp0backend"
call mvnw.cmd clean package -DskipTests -q
if %errorlevel% neq 0 (
    echo   LOI: Build backend that bai! Vui long kiem tra loi trong terminal.
    pause
    exit /b 1.
)
echo   Build thanh cong.
echo.

:: === B3: Chay backend ===
echo [3/4] Dang khoi dong backend Spring Boot...
echo.
echo Vui long cho khoang 10-15 giay de backend chay xong.
echo Khi thay dong "Tomcat started on port 8080" la OK.
echo.
java -Dspring.profiles.active=dev -jar target\management-0.0.1-SNAPSHOT.jar

pause