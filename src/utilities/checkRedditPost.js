const ONE_HOUR = 60 * 60 * 1000;

module.exports = function checkRedditPost(item) {
	const { quarantine, locked, hidden, created_utc, upvote_ratio } = item;
	const createdAt = created_utc * 1000;

	if (ONE_HOUR < Date.now() - createdAt) {
		return false;
	}

	if (upvote_ratio < 0.7) {
		return false;
	}

	if (quarantine || locked || hidden) {
		return false;
	}

	return true;
};