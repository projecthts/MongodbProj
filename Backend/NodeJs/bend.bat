@echo off
if %1%==help goto help
:start
echo.>./src/controller/%1%Cntrlr.ts
echo.>./src/ViewModels/%1%Model.ts
goto end
:help
echo Usage
echo "bend {name}" to create a controller
:end
