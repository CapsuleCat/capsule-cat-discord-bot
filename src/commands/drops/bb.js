const { CHANNELS } = require('../../utilities/constants');

module.exports = {
	name: 'bb',
	description: 'Best Buy steps',
	cooldown: 30,
	channelID: CHANNELS.STONKS,
	execute(message) {
		message.channel.send('BB sucks. Good luck.');
	},
};
