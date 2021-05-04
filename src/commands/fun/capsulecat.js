const capsuleEmote = '<:capsule:838927671744266240>';

module.exports = {
	name: 'capsulecat',
	description: 'CapsuleCat!',
	cooldown: 30,
	execute(message) {
		message.channel.send(`${capsuleEmote}${capsuleEmote}${capsuleEmote}\nThis server and bot are for gaming, mining, and all around good times.\n\nYou can also check out shitty games I make on https://capsulecat.com/`);
	},
};