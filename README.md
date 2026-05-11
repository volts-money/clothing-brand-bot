# 👟 Clothing Brand Bot

A Discord bot that DMs you every morning at 8AM ET with your daily task for building your clothing brand — from brainstorming designs all the way to launching and getting your first sample.

## What it does

- Sends you a **daily DM at 8AM ET** with that day's task
- Tracks your **30-day journey** from brand idea to first sale
- Shows a **progress bar** so you can see how far you've come
- Works 24/7 in the cloud — no need to keep your computer on

## Commands

| Command | What it does |
|---|---|
| `!today` | Get today's task |
| `!progress` | See how many days you've completed |
| `!day [number]` | See any specific day's task (e.g. `!day 12`) |
| `!help` | Show all commands |

## The 30-day plan

| Days | Phase |
|---|---|
| 1–7 | Brand identity — name, logo, colors, story |
| 8–14 | Design — sketching, going digital, saving files |
| 15–21 | Sample — Printful setup, ordering, checking quality |
| 22–30 | Launch — store, social media, first sale |

## Setup

### 1. Clone the repo
```
git clone https://github.com/volts-money/clothing-brand-bot.git
cd clothing-brand-bot
```

### 2. Install dependencies
```
npm install
```

### 3. Create a `.env` file
```
BOT_TOKEN=your-discord-bot-token-here
```

### 4. Run the bot
```
node bot.js
```

## Hosting 24/7 on Railway

1. Push your code to GitHub
2. Go to [railway.app](https://railway.app) and create a new project from your GitHub repo
3. Add `BOT_TOKEN` as an environment variable under the Variables tab
4. Railway will deploy and keep it running automatically

## Discord setup

1. Go to [discord.com/developers/applications](https://discord.com/developers/applications)
2. Create a new application and add a bot
3. Enable all three **Privileged Gateway Intents** under the Bot tab
4. Invite the bot to your server using the OAuth2 URL Generator
5. Type `!today` in your server to get your first task

## Built with

- [Node.js](https://nodejs.org)
- [discord.js](https://discord.js.org)
- [Railway](https://railway.app) for hosting
