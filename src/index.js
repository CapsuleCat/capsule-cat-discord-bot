require('dotenv').config();

const fs = require('fs');
const Discord = require('discord.js');
const reddit = require('./services/reddit');
const { CHANNELS } = require('./utilities/constants');

const prefix = '!';
const MessageEmbed = Discord.MessageEmbed;

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

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
});

client.on('message', (message) => {
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

client.login(process.env.TOKEN);

// TODO refactor

function parseDeal(title) {
	let tag = '';
	const tagMatch = title.match(/(\[.*?\])/);

	if (tagMatch && tagMatch.length > 0) {
		tag = tagMatch[0];
	}

	let price = '';
	const priceMatch = title.match(/(\$[0-9.]+)/);

	if (priceMatch && priceMatch.length > 0) {
		price = priceMatch[0];
	}

	const shortTitle = title.replace(tag, '').trim();

	return {
		tag: tag.toLowerCase().replace('[', '').replace(']', ''),
		shortTitle,
		price,
	};
}

function tagColor(tag) {
	switch (tag) {
	case 'cpu':
		return '#992233';
	case 'case':
		return '#334466';
	case 'prebuilt':
		return '#772299';
	case 'ram':
		return '#111333';
	case 'mouse':
		return '#AABBCC';
	case 'keyboard':
		return '#33AA55';
	case 'gpu':
		return '#3333FF';
	default:
		return '#888888';
	}
}

const ONE_HOUR = 60 * 60 * 1000;

reddit(function onSubmission(item /* Submission */) {
	const { title, thumbnail, url, quarantine, locked, hidden, created_utc, upvote_ratio } = item;
	const createdAt = created_utc * 1000;

	if (ONE_HOUR < Date.now() - createdAt) {
		return;
	}

	if (upvote_ratio < 0.7) {
		return;
	}

	if (quarantine || locked || hidden) {
		return;
	}

	const channel = client.channels.cache.get(CHANNELS.TECH_DEALS);
	if (!channel) return;

	const { tag, shortTitle, price } = parseDeal(title);

	const embed = new MessageEmbed()
		.setTitle(shortTitle)
		.setColor(tagColor(tag))
		.setDescription(`Tag: ${tag}\nPrice: ${price}\n\n${url}`);
	
	if (thumbnail && thumbnail !== 'default') {
		embed.setThumbnail(thumbnail);
	}

	channel.send(embed);
});
