const Discord = require('discord.js');
const { CHANNELS, ROLES } = require('../utilities/constants');
const checkRedditPost = require('../utilities/checkRedditPost');
const getAffiliateLink = require('../utilities/affiliateLinks');

const MessageEmbed = Discord.MessageEmbed;

function parseDeal(title) {
	let tag = '';
	const tagMatch = title.match(/(\[.*?\])/);

	if (tagMatch && tagMatch.length > 0) {
		tag = tagMatch[0];
	}

	let price = '';
	const priceMatch = title.match(/(\$[0-9.,]+)/);

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

module.exports = function onSubmission(client) {
	return async function (item /* Submission */) {
		const { title, thumbnail, url } = item;
		
		if (!checkRedditPost(item)) {
			return;
		}

		const channel = client.channels.cache.get(CHANNELS.GAME_DEALS);
		if (!channel) return;

		const { tag, shortTitle, price } = parseDeal(title);

		const mappedUrl = getAffiliateLink(url);

		let hasSetMessages = false;

		try {
			const messages = await channel.messages.fetch({ limit: 10 });
			if (messages.some(message => message.embeds && message.embeds[0].description.includes(mappedUrl))) {
				hasSetMessages = true;
			}
		} catch (e) {
			console.error('Failed to check channel messages', e);
		}

		// TODO check steam domains...
		// https://store.steampowered.com/appreviews/1091500/json=1
		// store.steampowered.com/appreviews/<appid>?json=1
		// 

		if (hasSetMessages) {
			return;
		}

		const embed = new MessageEmbed()
			.setTitle(shortTitle)
			.setColor('#992211')
			.setDescription(`Tag: ${tag}\nPrice: ${price}\n\n${mappedUrl}\n\nLinks may contain affiliate codes`);
        
		if (thumbnail && thumbnail !== 'default') {
			embed.setThumbnail(thumbnail);
		}

		channel.send(`<@&${ROLES.GAME_DEALS}>`, {
			embed,
		});
	};
};