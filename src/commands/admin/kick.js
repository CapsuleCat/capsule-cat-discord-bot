const { ROLES } = require('../../utilities/constants');

module.exports = {
	name: 'kick',
	description: 'Kick a member',
	args: true,
	execute(message) {
		const isMod = message.member && message.member.roles && (
			message.member.roles.cache.has(ROLES.ADMIN) ||
            message.member.roles.cache.has(ROLES.MOD)
		);

		if (!isMod) {
			return;
		}

		const member = message.mentions.members.first();
		member.kick();
	},
};