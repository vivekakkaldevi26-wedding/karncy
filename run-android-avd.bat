@echo off
setlocal enabledelayedexpansion
title Android AVD Launcher (SDK)

echo ========================================================
echo       Android Virtual Device (AVD) Launcher
echo ========================================================
echo.

:: 1. Detect or ask for Android SDK Path
set "DEFAULT_SDK=%LOCALAPPDATA%\Android\Sdk"

if exist "%ANDROID_HOME%\emulator\emulator.exe" (
    set "SDK_PATH=%ANDROID_HOME%"
) else if exist "%ANDROID_SDK_ROOT%\emulator\emulator.exe" (
    set "SDK_PATH=%ANDROID_SDK_ROOT%"
) else if exist "%DEFAULT_SDK%\emulator\emulator.exe" (
    set "SDK_PATH=%DEFAULT_SDK%"
) else (
    set "SDK_PATH="
)

if not "%SDK_PATH%"=="" (
    echo [OK] Detected Android SDK at:
    echo      !SDK_PATH!
    echo.
    set /p "CHANGE_SDK=Would you like to use a different SDK path? (y/N): "
    if /i "!CHANGE_SDK!"=="y" (
        set "SDK_PATH="
    )
)

if "%SDK_PATH%"=="" (
    echo.
    echo Please set your Android SDK Path.
    echo Default location is usually: %LOCALAPPDATA%\Android\Sdk
    echo.
    set /p "INPUT_PATH=Enter Android SDK Path [Press Enter for default]: "
    if "!INPUT_PATH!"=="" (
        set "SDK_PATH=%DEFAULT_SDK%"
    ) else (
        set "SDK_PATH=!INPUT_PATH!"
    )
)

:: Validate emulator exists
if not exist "!SDK_PATH!\emulator\emulator.exe" (
    echo.
    echo [ERROR] Could not find emulator.exe inside:
    echo         !SDK_PATH!\emulator
    echo.
    echo Please check the path and try again.
    pause
    exit /b 1
)

set "ANDROID_SDK_ROOT=!SDK_PATH!"
set "ANDROID_HOME=!SDK_PATH!"
set "PATH=!SDK_PATH!\emulator;!SDK_PATH!\platform-tools;!SDK_PATH!\cmdline-tools\latest\bin;%PATH%"

echo.
echo ========================================================
echo Available Android Virtual Devices (AVDs):
echo ========================================================
"!SDK_PATH!\emulator\emulator.exe" -list-avds
echo.

set "TARGET_AVD=Pixel_8_Pro_API_34"
set /p "USER_AVD=Enter AVD name to start [Press Enter for !TARGET_AVD!]: "
if not "!USER_AVD!"=="" (
    set "TARGET_AVD=!USER_AVD!"
)

echo.
echo Starting AVD: !TARGET_AVD!...
echo (Close the emulator window to exit)
echo ========================================================
echo.

"!SDK_PATH!\emulator\emulator.exe" -avd "!TARGET_AVD!" -netdelay none -netspeed full -gpu host

pause
