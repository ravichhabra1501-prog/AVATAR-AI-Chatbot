@echo off
cd /d "c:\ai chatbot\inquisitive-avatar-friend-02"
git rebase --abort 2>nul
git reset --hard origin/main 2>nul
git merge --no-edit origin/main
git push -u origin main
pause
