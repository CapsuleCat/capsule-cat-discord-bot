function pick(items) {
	const item = items[Math.floor(Math.random() * items.length)];
	return item;
}

const memes = [
	'https://media.giphy.com/media/FDepi8IWqVjUKnJPMO/giphy.gif',
	'https://media.giphy.com/media/kU264gVYaA9SEHCFXm/giphy.gif',
	'https://media.giphy.com/media/kU264gVYaA9SEHCFXm/giphy.gif',
];

module.exports = {
	name: 'apex',
	description: 'Its berd time',
	cooldown: 30,
	execute(message) {
		message.channel.send(`${pick(memes)}`);
	},
};