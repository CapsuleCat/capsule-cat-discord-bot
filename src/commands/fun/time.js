const {getTimezone} = require('countries-and-timezones');
const moment = require('moment-timezone');

function hasDST(name) {
	return moment.tz(name).isDST();
}

const customMapper = (timezone) => {
	const upper = timezone.toUpperCase();

	switch (upper) {
		case 'PST':
		case 'PDT':
		case 'PT':
		case 'WA':
		case 'WASHINGTON':
			return 'US/Pacific';
		case 'MDT':
		case 'MT':
			return 'US/Mountain';
		case 'AZ':
		case 'ARIZONA':
			return 'US/Arizona';
		case 'CST':
		case 'CDT':
		case 'CT':
		case 'CENTRAL':
			return 'US/Central';
		case 'EST':
		case 'EDT':
		case 'ET':
		case 'EASTERN':
			return 'US/Eastern';
		default:
			return upper;
	}
}

module.exports = {
	name: 'time',
	description: 'Translate times',
	args: true,
	execute(message, args) {
		try {
			const time = args[0];
			const timezone = args[1] || 'CST';

			const tx = getTimezone(customMapper(timezone));
    
			const timeSplits = time.split(':');
			let hour = parseInt(timeSplits[0], 10);
			let minute = timeSplits.length > 1 ? parseInt(timeSplits[1], 10) : 0;
			const offsetTime = time.toLowerCase().includes('pm');
			if (offsetTime) {
				hour += 12;
			}
    
			const now = new Date();
    
			if (!tx) {
				// try to manually map the folowing:
				// "America/Chicago":{"u":-360,"d":-300,"c":"US"}

				message.channel.send('❌ Could not interpret timezone');
				return;
			}

			const offset = hasDST(tx.name) ? tx.dstOffsetStr : tx.utcOffsetStr;

			const dateString = `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()} ${hour}:${minute}:00Z${offset}`;
    
			const date = new Date(dateString);
            
			try {
				const pt = date.toLocaleTimeString('en-US', { timeZoneName: 'short', timeZone: 'America/Los_Angeles' });
				const phoenix = date.toLocaleTimeString('en-US', { timeZoneName: 'long', timeZone: 'America/Phoenix' });
				const ct = date.toLocaleTimeString('en-US', { timeZoneName: 'short', timeZone: 'America/Chicago' });
				const et = date.toLocaleTimeString('en-US', { timeZoneName: 'short', timeZone: 'America/New_York' });
        
				message.channel.send(`⏰ ${args[0]} ${args[1]} is:\n · ${pt}\n · ${phoenix}\n · ${ct}\n · ${et}`);
			} catch (e) {
				console.error(e);
				message.channel.send('❌ Could not parse time and timezones');
			}
		} catch (e) {
			console.error(e);
			message.channel.send('❌ Could not interpret command');
		}
	},
};