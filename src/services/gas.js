const rp = require('request-promise');

const getGasPrice = async () => {
	try {
		const response = await rp(`https://ethgasstation.info/json/ethgasAPI.json?api-key=${process.env.ETH_GAS_KEY}`, {
			json: true,
		});

		return {
			average: response.average / 10,
		};
	} catch (e) {
		console.error(e);
		return { error: 'Could not get gas price' };
	}
};

module.exports = {
	getGasPrice,
};