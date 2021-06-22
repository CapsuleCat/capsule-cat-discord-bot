const {getTimezone} = require('countries-and-timezones');

module.exports = {
	name: 'time',
	description: 'Translate times',
	args: true,
	execute(message, args) {
		try {
			const time = args[0];
			const timezone = args[1] || 'CST';
			const tx = getTimezone(timezone);
    
			let hour = parseInt(time, 10);
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

			const dateString = `${now.getMonth() + 1}-${now.getDate()}-${now.getFullYear()} ${hour}:00:00Z${tx.utcOffsetStr}`;
    
			const date = new Date(dateString);
            
			try {
				const pt = date.toLocaleTimeString('en-US', { timeZoneName: 'short', timeZone: 'America/Los_Angeles' });
				const ct = date.toLocaleTimeString('en-US', { timeZoneName: 'short', timeZone: 'America/Chicago' });
				const phoenix = date.toLocaleTimeString('en-US', { timeZoneName: 'long', timeZone: 'America/Phoenix' });
        
				message.channel.send(`⏰ ${args[0]} ${args[1]} is:\n · ${pt}\n · ${phoenix}\n · ${ct}`);
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