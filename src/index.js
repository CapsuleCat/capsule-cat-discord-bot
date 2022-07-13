require('dotenv').config();

const Discord = require('discord.js');
const fs = require('fs');
const reddit = require('./services/reddit');
const discord = require('./services/discord');
const redditTechDeal = require('./automation/redditTechDeal');
const redditGameDeal = require('./automation/redditGameDeal');
const notificationSelection = require('./automation/notificationSelection');
const { CHANNELS, ROLES } = require('./utilities/constants');
const messageHasBlacklist = require('./utilities/messageHasBlacklist');

const prefix = '!';

const client = discord();

const commandFolders = fs.readdirSync('./src/commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);

	client.user.setStatus('online');
	client.user.setActivity('the skies', { type: 'WATCHING' });

	notificationSelection.init(client);
});

client.on('message', (message) => {
	if (messageHasBlacklist(message.content)) {
		message.delete();
		return;
	}

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	if (command.args && !args.length) {
		return message.reply(`You didn't provide any arguments, ${message.author}!`);
	}

	if (command.channelID && message.channel.id !== command.channelID) {
		// Only allow this command to be run in certain channels
		return;
	}

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.channel.id)) {
		const expirationTime = timestamps.get(message.channel.id) + cooldownAmount;

		if (now < expirationTime) {
			// const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`stop spamming \`${command.name}\`.`);
		}
	}

	try {
		timestamps.set(message.channel.id, now);
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.on('messageReactionAdd', notificationSelection.messageReactionAddHandler);
client.on('messageReactionRemove', notificationSelection.messageReactionRemoveHandler);

client.login(process.env.TOKEN);

reddit(redditTechDeal(client), {
	subreddit: 'buildapcsales',
});

reddit(redditTechDeal(client, {
	channel: CHANNELS.TECH_DEALS_CA,
	ping: ROLES.TECH_DEALS_CA,
	forward: false,
}), {
	subreddit: 'bapcsalescanada',
});

reddit(redditGameDeal(client), {
	subreddit: 'GameDeals',
});
