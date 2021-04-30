const { CHANNELS } = require('../../utilities/constants');

module.exports = {
	name: 'amd',
	description: 'AMD Links',
	cooldown: 30,
	channelID: CHANNELS.STONKS,
	execute(message) {
		message.channel.send(
			`AMD Links
- 6700XT https://www.amd.com/en/direct-buy/5496921400/us?add-to-cart=true
- 6800   https://www.amd.com/en/direct-buy/5458373400/us?add-to-cart=true
- 6800XT https://www.amd.com/en/direct-buy/5458372800/us?add-to-cart=true
- 6800XT Midnight Black https://www.amd.com/en/direct-buy/5496921500/us?add-to-cart=true
- 6900XT https://www.amd.com/en/direct-buy/5458372200/us?add-to-cart=true
`);
	},
};
