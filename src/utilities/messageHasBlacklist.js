const blacklist = [
    'onepeice',
    'one piece',
    '1piece',
    '1 piece',
];

module.exports = function messageHasBlacklist(content) {
    const lower = content.toLowerCase();

    for (const word of blacklist) {
        if (lower.includes(word)) {
            return true;
        }
    }

    return false;
}