const { getGasPrice } = require('../../services/gas');
const { CHANNELS } = require('../../utilities/constants');

module.exports = {
	name: 'gwei',
	description: 'Get the current average gas in gwei',
	cooldown: 30,
	channelID: CHANNELS.MINING,
	async execute(message) {
		const response = await getGasPrice();

		if (response.error) {
			message.channel.send('Could not connect to gas API');
		}

		let emote = '';
		if (response.average > 50) {
			// good!
			emote = '📈';
		} else if (response.average < 30) {
			// bad;
			emote = '📉';
		}

		message.channel.send(`${emote} Current gas price in gwei: ${response.average}`);
	},
};