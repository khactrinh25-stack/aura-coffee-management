@echo off
title Aura Coffee - Frontend Server
echo ========================================
echo   AURA COFFEE - KHOI DONG FRONTEND
echo ========================================
echo.
cd /d "%~dp0frontend"
echo Dang khoi dong frontend React...
echo.
echo Khi thay dong "Local: http://localhost:5173" la OK.
echo.
npm run dev
pause