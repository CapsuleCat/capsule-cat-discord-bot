const { ROLES } = require('../../utilities/constants');

module.exports = {
	name: 'ban',
	description: 'Ban a member',
	execute(message) {
		const isMod = message.member && message.member.roles && (
			message.member.roles.cache.has(ROLES.ADMIN) ||
            message.member.roles.cache.has(ROLES.MOD)
		);

		if (!isMod) {
			return;
		}

		const user = message.mentions.users.first();
		message.guild.members.ban(user);
	},
};