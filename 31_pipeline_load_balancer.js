const os = require('os');
function getOptimalConcurrency() {
    const cpus = os.cpus().length;
    return Math.max(1, cpus - 1); // Leaves one core free for OS stability
}
module.exports = { getOptimalConcurrency };
