@echo off
echo === SPEC - Push do GitHub ===
cd /d "%~dp0"
git add .
git commit -m "SPEC update %date% %time%"
git push origin master:main --force
echo === Gotowe! ===
pause