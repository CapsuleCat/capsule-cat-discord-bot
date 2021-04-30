const si = require('systeminformation');
const checkPm2 = require('../../utilities/checkPm2');
const { ROLES } = require('../../utilities/constants');

module.exports = {
	name: 'server',
	description: 'server command',
	async execute(message) {
		const isAdmin = message.member && message.member.roles && message.member.roles.cache.has(ROLES.ADMIN);

		if (!isAdmin) {
			return;
		}

		try {
			const [siData, pm2Data] = await Promise.all([
				si.currentLoad(),
				checkPm2(),
			]);
    
			message.channel.send([
				'Server stats!',
				`· CPU:\t\t${siData.currentLoad.toFixed(2)}%`,
				`· User:\t\t${siData.currentLoadUser.toFixed(2)}%`,
				`· System:\t${siData.currentLoadSystem.toFixed(2)}%`,
				`· Health:\t${pm2Data ? 'OK' : 'BAD'}`,
			].join('\n'));
		} catch (e) {
			console.error(e);
		}

	},
};