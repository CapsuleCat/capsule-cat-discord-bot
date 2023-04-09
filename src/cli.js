const { Command } = require('commander');
const onCheckRealEstate = require('./automation/sqftRealEstate');

function cli(client) {
	const program = new Command();

	program
		.name('capsule-cat-bot')
		.description('CLI to test capsule cat bot commands')
		.version('0.0.1');

	program.command('real-estate')
		.description('Check the Real Estate commands work')
		.action(() => {
			return onCheckRealEstate(client).then(() => {
				console.log('Real Estate command ran successfully');
				process.exit(0);
			}).catch(() => {
				console.error('Error running real-estate command');
				process.exit(1);
			});
		});

	program.parse(process.argv);
}

module.exports = { cli };