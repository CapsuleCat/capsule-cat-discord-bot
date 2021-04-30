#!/bin/bash

cd capsule-cat-discord-bot

npx pm2 start ecosystem.config.js
npx pm2 startup
