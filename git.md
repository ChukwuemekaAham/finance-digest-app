```bash

git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ChukwuemekaAham/finance-digest-app.git
git remote -v
git push -u origin main # or --set-upstream - sets origin as the default upstream remote for your main branch, so in the future, you can just type git push when on main.
git checkout -b dev

git push origin dev

git switch -M main
git merge origin/dev

git switch dev
git pull orign main

git log

q

git status

```
