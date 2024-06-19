@echo off
setlocal enabledelayedexpansion

REM Указываем путь к .env файлу
set ENV_FILE=.env

REM Проверяем, существует ли .env файл
if not exist %ENV_FILE% (
    echo .env file not found!
    exit /b 1
)

REM Читаем .env файл и устанавливаем переменные окружения
for /f "tokens=1,2 delims==" %%a in (%ENV_FILE%) do (
    set "name=%%a"
    set "value=%%b"
    set !name!=!value!
)

REM Запускаем команду yarn start:dev
yarn start:dev
