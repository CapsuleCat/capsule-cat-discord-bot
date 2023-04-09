const axios = require('axios');
const { CHANNELS } = require('../utilities/constants');

const options = {
	method: 'POST',
	url: 'https://realty-in-us.p.rapidapi.com/properties/v3/list',
	headers: {
		'content-type': 'application/json',
		'X-RapidAPI-Key': process.env.RAPID_API_KEY,
		'X-RapidAPI-Host': 'realty-in-us.p.rapidapi.com'
	},
	data: JSON.stringify({
		'limit':200,
		'offset':0,
		'postal_code':'85225',
		'status':['for_sale'],
		'sort':{'direction':'desc','field':'list_date'}}
	),
};

module.exports = async function onCheckRealEstate(client) {
	try {
		const response = await axios.request(options);

		if (response.status !== 200) {
			console.log(`Unable to get real estate data. Status code: ${response.status}`);
			return;
		}

		const properties = response.data.data.home_search.results;
		const totalSqftPrice = properties.reduce((acc, property) => {
			const sqft = property.description.sqft;
			const price = property.list_price;

			if (!sqft || !price) return acc;

			return acc + (price / sqft);
		}, 0);
		const avgSqftPrice = totalSqftPrice / properties.length;
		const formattedAvgSqftPrice = avgSqftPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });

		const channel = client.channels.cache.get(CHANNELS.REAL_ESTATE);
		if (channel) {
			await channel.send(`The average price per square foot for the Chandler, AZ area is ${formattedAvgSqftPrice}.`);
		} else {
			console.log(`Unable to find channel with ID ${CHANNELS.REAL_ESTATE}.`);
		}
	} catch (error) {
		console.error(error);
	}
};