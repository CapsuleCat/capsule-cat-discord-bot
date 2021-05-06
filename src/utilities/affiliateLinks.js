module.exports = function getAffiliateLink(url) {
	const u = new URL(url);

	if (u.hostname.includes('amazon.com')) {
		u.hostname = 'smile.amazon.com';
        
		u.searchParams.set('tag', process.env.AMAZON_AFFILIATE_ID);
	}

	if (u.hostname.includes('asus.com')) {
		u.searchParams.set('affiliate_id', process.env.ASUS_AFFILIATE_ID);
		u.searchParams.set('referring_service', 'link');
	}

	return u.toString();
};
