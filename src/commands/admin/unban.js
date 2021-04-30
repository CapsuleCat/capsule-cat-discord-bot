const { ROLES } = require('../../utilities/constants');

module.exports = {
	name: 'unban',
	description: 'Unban a member',
	args: true,
	execute(message, args) {
		const isMod = message.member && message.member.roles && (
			message.member.roles.cache.has(ROLES.ADMIN) ||
            message.member.roles.cache.has(ROLES.MOD)
		);

		if (!isMod) {
			return;
		}

		const id = args[0];
		message.guild.members.unban(id);
	},
};