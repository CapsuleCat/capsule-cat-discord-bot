require('dotenv').config();

const { init, run } = require('./main');
const { cli } = require('./cli');

// Detect if we are being run with command line arguments
const args = process.argv.slice(2);

async function start() {
	const client = await init();
	if (args.length) {
		// We are being run with command line arguments
		// Run the command line interface
		cli(client);
	} else {
		void run(client);
	}
}

start().catch((error) => {
	console.error(error);
	process.exit(1);
});
