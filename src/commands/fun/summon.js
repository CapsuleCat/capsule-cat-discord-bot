
module.exports = {
	name: 'summon',
	description: 'Summon a friend',
	cooldown: 60,
	args: true,
	execute(message) {
		message.channel.send(
			`${message.mentions.members.first()} - You are being summoned \nhttps://youtube.com/clip/UgkxHg1KxGCqFmTNQOa9gnTWEcsZ-em4IamB`
		);
	},

};
