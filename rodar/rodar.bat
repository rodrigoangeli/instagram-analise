@echo off
del "teste.txt" >nul 2>&1
setlocal enabledelayedexpansion
echo Quantos posts devem ser rastreados?
set /p numero=
echo .
echo Escreva separado por linha cada instagram(sem @) que você deseja analisar
echo Quando terminar pressione enter sem digitar nenhuma letra.^



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