const { exec } = require('child_process');
function healSystem() {
    exec('npm cache clean --force && rm -rf node_modules && npm install');
}
module.exports = { healSystem };
