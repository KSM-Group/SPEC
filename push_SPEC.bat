@echo off
echo === SPEC - Push do GitHub ===
cd /d "%USERPROFILE%\Downloads\SPEC"
git add .
git commit -m "SPEC update %date% %time%"
git push origin master
echo === Gotowe! ===
pause
