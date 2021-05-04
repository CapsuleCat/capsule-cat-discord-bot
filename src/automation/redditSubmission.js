const Discord = require('discord.js');
const { CHANNELS } = require('../utilities/constants');

const MessageEmbed = Discord.MessageEmbed;

function parseDeal(title) {
	let tag = '';
	const tagMatch = title.match(/(\[.*?\])/);

	if (tagMatch && tagMatch.length > 0) {
		tag = tagMatch[0];
	}

	let price = '';
	const priceMatch = title.match(/(\$[0-9.]+)/);

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

function tagColor(tag) {
	switch (tag) {
	case 'cpu':
		return '#992233';
	case 'case':
		return '#334466';
	case 'prebuilt':
		return '#772299';
	case 'ram':
		return '#111333';
	case 'mouse':
		return '#AABBCC';
	case 'keyboard':
		return '#33AA55';
	case 'gpu':
		return '#3333FF';
	case 'monitor':
		return '#999922';
	case 'fans':
		return '#000000';
	default:
		return '#888888';
	}
}

function getAffiliateLink(url) {
	const u = new URL(url);

	if (u.hostname.includes('amazon.com')) {
		u.hostname = 'smile.amazon.com';
        
		u.searchParams.set('tag', process.env.AMAZON_AFFILIATE_ID);
	}

	if (u.hostname.includes('asus.com')) {
		u.searchParams.set('affiliate_id', process.env.ASUS_AFFILIATE_ID);
		u.searchParams.set('referring_service', 'link');
	}

	return u.toString();
}

const ONE_HOUR = 60 * 60 * 1000;

module.exports = function onSubmission(client) {
	return async function (item /* Submission */) {
		const { title, thumbnail, url, quarantine, locked, hidden, created_utc, upvote_ratio } = item;
		const createdAt = created_utc * 1000;

		if (ONE_HOUR < Date.now() - createdAt) {
			return;
		}

		if (upvote_ratio < 0.7) {
			return;
		}

		if (quarantine || locked || hidden) {
			return;
		}

		const channel = client.channels.cache.get(CHANNELS.TECH_DEALS);
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

		if (hasSetMessages) {
			return;
		}

		const embed = new MessageEmbed()
			.setTitle(shortTitle)
			.setColor(tagColor(tag))
			.setDescription(`Tag: ${tag}\nPrice: ${price}\n\n${mappedUrl}\n\nLinks may contain affiliate codes`);
        
		if (thumbnail && thumbnail !== 'default') {
			embed.setThumbnail(thumbnail);
		}

		channel.send('<@&838197227419729920>', {
			embed,
		});

		/**
		 * Forward our beautiful submissions to another discord server
		 */
		if (process.env.FORWARD_SERVER) {
			const parts = process.env.FORWARD_SERVER.split('/');
			const id = parts[parts.length - 2];
			const token = parts[parts.length - 1];
			const webhookClient = new Discord.WebhookClient(id, token);
    
			webhookClient.send('FWD from CapsuleCat:', {
				embeds: [embed],
			});
		}
	};
};