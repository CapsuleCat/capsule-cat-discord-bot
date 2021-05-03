function pick(items) {
	const item = items[Math.floor(Math.random() * items.length)];
	return item;
}

const memes = [
	{ img: 'https://media.giphy.com/media/FDepi8IWqVjUKnJPMO/giphy.gif' },
	{ img: 'https://media.giphy.com/media/kU264gVYaA9SEHCFXm/giphy.gif' },
	{ img: 'https://media.giphy.com/media/U6RtL8iZCBz6tTFvQr/giphy.gif' },
	{ img: 'https://tenor.com/view/apex-wraith-big-ass-gif-19294728', message: 'money_pit_rsx specifically wanted this image added' }
];

module.exports = {
	name: 'apex',
	description: 'Apex time',
	cooldown: 30,
	execute(message) {
		const meme = pick(memes);
		const prefix = meme.message ? `${meme.message}\n\n` : '';
		message.channel.send(`${prefix}${meme.img}`);
	},
};