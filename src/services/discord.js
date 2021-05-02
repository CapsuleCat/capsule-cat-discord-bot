const Discord = require('discord.js');

module.exports = function discord() {
	const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
	client.commands = new Discord.Collection();
	client.cooldowns = new Discord.Collection();

	return client;
};
