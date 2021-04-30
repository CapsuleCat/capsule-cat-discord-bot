const pm2 = require('pm2');

module.exports = async function checkPm2() {
	return new Promise((resolve) => {
		pm2.connect(function (err) {
			if (err) {
				console.error(err);
				resolve(false);
			}

			pm2.list(function (err2, processes) {
				if (err2) {
					console.error(err2);
					resolve(false);
				}

				const ok = processes.every(p => p.pm2_env.status === 'online');

				resolve(ok);
			});
		});
	});
};