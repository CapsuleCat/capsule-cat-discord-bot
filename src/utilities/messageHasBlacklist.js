const blacklist = [
    'onepeice',
    'onepiece',
    'one piece',
    '1piece',
    '1 piece',
    'o n e p i e c e',
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