#!/bin/bash

# Prereq: Set up Github with deploy key 

git clone git@github.com:CapsuleCat/capsule-cat-discord-bot.git
cd capsule-cat-discord-bot

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

nvm install 12
nvm use 12

npm install

touch .env