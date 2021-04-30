const { CHANNELS } = require('../../utilities/constants');

module.exports = {
	name: 'zotac',
	description: 'Zotac steps',
	cooldown: 30,
	channelID: CHANNELS.STONKS,
	execute(message) {
		message.channel.send(''`Zotac Steps:\n\n
· Main Page: https://www.zotacstore.com/us/graphics-cards/geforce-rtx-30-series?limit=24\n
1. Login: https://www.zotacstore.com/us/customer/account/login/\n
2. ADD AN ITEM TO YOUR CART
3. Set Shipping: https://www.zotacstore.com/us/checkout/cart/estimateUpdatePost/?estimate_method=ups_GND&do=Update+Total\n
4. Start: https://store.zotac.com/paypal/express/start/\n
5. Review: https://store.zotac.com/paypal/express/review/\n
6. CONFIRM: POST https://store.zotac.com/paypal/express/placeOrder/
```);
	},
};

