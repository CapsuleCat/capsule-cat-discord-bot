const { CHANNELS } = require('../../utilities/constants');

module.exports = {
	name: 'zotac',
	description: 'Zotac steps',
	cooldown: 30,
	channelID: CHANNELS.STONKS,
	execute(message) {
		message.channel.send(`Zotac Steps:

· Main Page: https://www.zotacstore.com/us/graphics-cards/geforce-rtx-30-series?limit=24
1. Login: https://www.zotacstore.com/us/customer/account/login/
2. ADD AN ITEM TO YOUR CART
3. Set Shipping: https://www.zotacstore.com/us/checkout/cart/estimateUpdatePost/?estimate_method=ups_GND&do=Update+Total
4. Start: https://store.zotac.com/paypal/express/start/
5. Review: https://store.zotac.com/paypal/express/review/
6. CONFIRM: POST https://store.zotac.com/paypal/express/placeOrder/
`);
	},
};

