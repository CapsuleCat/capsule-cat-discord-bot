const Discord = require('discord.js');
const { CHANNELS } = require('../utilities/constants');

const MessageEmbed = Discord.MessageEmbed;

/**
 * 
 * @param {Discord.Client} client 
 * @returns 
 */
const init = async (client) => {
	// TODO Create the notification messages if necessary
	const channel = client.channels.cache.get(CHANNELS.NOTIFICATION_SELECTION);

	try {
		const messages = await channel.messages.fetch({ limit: 10 });

		if (!messages.some(message => message.embeds && message.embeds[0].description.includes('@stonkers'))) {
			const embed = new MessageEmbed()
				.setTitle('GPU Tracking')
				.setColor('#0bbd9f')
				.setDescription('React with ✅ to be assigned the @stonkers role.');
			channel.send(embed);
		}

		if (!messages.some(message => message.embeds && message.embeds[0].description.includes('@tech-deals'))) {
			const embed2 = new MessageEmbed()
				.setTitle('Tech Deals')
				.setColor('#999999')
				.setDescription('React with ✅ to be assigned the @tech-deals role.');
			channel.send(embed2);
		}

		if (!messages.some(message => message.embeds && message.embeds[0].description.includes('@console-pleb'))) {
			const embed3 = new MessageEmbed()
				.setTitle('Console Tracking')
				.setColor('#3344AA')
				.setDescription('React with ✅ to be assigned the @console-pleb role.');
			channel.send(embed3);
		}

		if (!messages.some(message => message.embeds && message.embeds[0].description.includes('@game-deals'))) {
			const embed4 = new MessageEmbed()
				.setTitle('Game Deals')
				.setColor('#999999')
				.setDescription('React with ✅ to be assigned the @game-deals role.');
			channel.send(embed4);
		}

		if (!messages.some(message => message.embeds && message.embeds[0].description.includes('@tech-deals-ca'))) {
			const embed4 = new MessageEmbed()
				.setTitle('Tech Deals CA')
				.setColor('#999999')
				.setDescription('React with ✅ to be assigned the @tech-deals-ca role.');
			channel.send(embed4);
		}
	} catch (e) {
		console.error('Failed to check channel messages', e);
	}
	
};

async function getReactionRole(reaction, user) {
	if (reaction.message.embeds && reaction.message.embeds.length > 0) {
		const description = reaction.message.embeds[0].description;

		let role;
		let member;

		try {
			await reaction.message.guild.fetch();
			member = await reaction.message.guild.members.fetch({ user });
		} catch (error) {
			console.error('Something went wrong when fetching the guild: ', error);
			return;
		}

		if (description.includes('@stonkers')) {
			role = reaction.message.guild.roles.cache.find(r => r.name === 'stonkers');
		} else if (description.includes('@tech-deals')) {
			role = reaction.message.guild.roles.cache.find(r => r.name === 'tech-deals');
		} else if (description.includes('@console-pleb')) {
			role = reaction.message.guild.roles.cache.find(r => r.name === 'console-pleb');
		} else if (description.includes('@game-deals')) {
			role = reaction.message.guild.roles.cache.find(r => r.name === 'game-deals');
		} else if (description.includes('@tech-deals-ca')) {
			role = reaction.message.guild.roles.cache.find(r => r.name === 'tech-deals-ca');
		}

		if (role && member) {
			return { role, member };
		}
	}

	return;
} 

const messageReactionAddHandler = async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			return;
		}
	}

	if (reaction.message.channel.id !== CHANNELS.NOTIFICATION_SELECTION) {
		// We don't care about other reactions
		return;
	}

	if (reaction._emoji.name !== '✅') {
		reaction.remove().catch(error => console.error('Failed to remove reactions: ', error));
		return;
	}

	const res = await getReactionRole(reaction, user);

	if (res) {
		const { member, role } = res;
		await member.roles.add(role).catch(console.error);
	}
};

const messageReactionRemoveHandler = async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			return;
		}
	}

	if (reaction.message.channel.id !== CHANNELS.NOTIFICATION_SELECTION) {
		// We don't care about other reactions
		return;
	}

	const res = await getReactionRole(reaction, user);

	if (res) {
		const { member, role } = res;
		await member.roles.remove(role).catch(console.error);
	}
};

module.exports = {
	init,
	messageReactionAddHandler,
	messageReactionRemoveHandler
};