function getPriority(filename) {
    if (filename.includes('_FINAL')) return 1;
    if (filename.includes('_PREMIX')) return 2;
    return 3;
}
module.exports = { getPriority };
