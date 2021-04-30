const { CHANNELS } = require('../../utilities/constants');

module.exports = {
	name: 'evga',
	description: 'EVGA steps',
	cooldown: 30,
	channelID: CHANNELS.STONKS,
	execute(message) {
		message.channel.send('EVGA B-Stock:\n\n https://www.evga.com/products/ProductList.aspx?type=8&family=GeForce+30+Series+Family');
	},
};
