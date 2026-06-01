@echo off
echo === SPEC - Push do GitHub ===
cd /d "C:\Users\Michał\Desktop\Projekt SPEC\SPEC"
git add .
git commit -m "SPEC update %date% %time%"
git push origin master:main --force
echo === Gotowe! ===
pause
