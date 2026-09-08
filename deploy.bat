@echo off
echo ==========================================
echo   Deploying Karncy to karncy.com/live
echo ==========================================
echo.
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0scripts\upload_to_karncy.ps1"
echo.
echo ==========================================
echo   Done! Check https://karncy.com/live/
echo ==========================================
pause
