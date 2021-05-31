# Capsule Cat Discord Bot

Capsule Cat Discord Bot

## Setup

1. Download the repo
2. Create a `.env` file at the root of the project.
3. Add your keys, see the `.env.template` file. The `TOKEN` key is your Discord bot token. For Reddit, you'll need to [create an app](https://ssl.reddit.com/prefs/apps/).

## Commands

```bash
!ban <mention>
!unban <mention>
!kick <mention>
!gwei
!amd
!bb
!evga
!zotac
!apex
!berd
!server
```

## Services

### Reddit

This bot will crawl Reddit for tech deals and game deals. See the `src/automation` folder on how to create a new crawler. Don't forget to add it to the `src/index.js` file.

### EthGasStation

1. Sign up for an account: https://data.defipulse.com/signup
2. See docs on how to use api key: https://docs.ethgasstation.info/gas-price

## Deployment

Run the scripts in `deployment`. You will need to remember to create a `.env` file with your `TOKEN` in it for your discord bot. Deployment uses pm2, so you can use the `ecosystem.config.js` file for easy deployment.

## Docs

- See [discord.js](https://discord.js.org/#/docs/main/stable/general/welcome)
- See [discord.js guide](https://discordjs.guide/)
