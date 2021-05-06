const Snoowrap = require('snoowrap');
const { SubmissionStream } = require('snoostorm');

module.exports = function reddit(onSubmission, options) {
	const client = new Snoowrap({
		userAgent: 'reddit-bot-example-node',
		clientId: process.env.REDDIT_CLIENT_ID,
		clientSecret: process.env.REDDIT_CLIENT_SECRET,
		username: process.env.REDDIT_USERNAME,
		password: process.env.REDDIT_PASSWORD
	});
        
	const submissions = new SubmissionStream(client, {
		...options,
		limit: 10,
		pollTime: parseInt(process.env.REDDIT_POLL_TIME, 10),
	});
	submissions.on('item', onSubmission);

	console.log('Reddit service listening...');

	return {
		snoowrap: client,
		submissions,
	};
};
