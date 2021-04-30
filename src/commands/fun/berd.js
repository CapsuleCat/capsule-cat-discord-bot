const berdEmote = '<:berd:837382790151798804>';

module.exports = {
	name: 'berd',
	description: 'Its berd time',
	cooldown: 30,
	execute(message) {
		message.channel.send(`${berdEmote}${berdEmote}${berdEmote}\nhttps://www.youtube.com/watch?v=7oDFj53_-_I`);
	},
};