@echo off
del "teste.txt" >nul 2>&1
setlocal enabledelayedexpansion
echo [96mQuantos posts devem ser rastreados?[0m
set /p numero=
echo .
echo [96mEscreva separado por linha cada instagram[0m([93m[4msem @[0m) [96mque você deseja analisar[0m
echo [93mQuando terminar pressione enter sem digitar nenhuma letra.[0m^



:loop
set line=
set /p line=@
if not defined line goto break
set p=!%line%
echo user %p% --count=%numero% --full >> teste.txt
goto loop
:break

call instamancer batch teste.txt
call node Mesclado.js
pause