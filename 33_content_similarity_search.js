const fs = require('fs-extra');
function isDuplicate(filename, historyPath) {
    const history = fs.readJsonSync(historyPath);
    return history.includes(filename);
}
module.exports = { isDuplicate };
