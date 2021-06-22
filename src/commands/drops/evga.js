const { CHANNELS } = require('../../utilities/constants');

module.exports = {
	name: 'evga',
	description: 'EVGA steps',
	cooldown: 30,
	channelID: CHANNELS.STONKS,
	execute(message) {
		message.channel.send(`EVGA B-Stock:\n\n https://www.evga.com/products/ProductList.aspx?type=8&family=GeForce+30+Series+Family\n\nFeel free to use our referral link: ${process.env.EVGA}\n\nOr our associate code: ${process.env.EVGA_ASSOCIATE_CODE}`);
	},
};
