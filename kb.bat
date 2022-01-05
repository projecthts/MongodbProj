@echo off
if %1%==start goto start
if %1%==stop goto stop
if %1%==help goto help
goto help
:start
pushd .
C:
cd C:\Users\Vanilla\MajorProject\mainwebsite\Backend\LoggerService
start npm run dev
cd C:\Users\Vanilla\MajorProject\mainwebsite\Backend\NodeJs
start npm run dev
cd C:\Users\Vanilla\MajorProject\mainwebsite\FrontEnd\Krishi-Bazaar
start http-server -p 4200 ./dist/Krishi-Bazaar -o --allow-insecure-localhost
popd
goto end
:stop
goto end
:help
echo Usage
echo "kb start" to start
echo "kb stop" to stop
:end
