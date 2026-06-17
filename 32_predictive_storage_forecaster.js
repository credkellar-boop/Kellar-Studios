const fs = require('fs');
function checkStorageRisk() {
    const stats = fs.statSync('/'); // Check root path
    const usage = (stats.size / 1024 / 1024 / 1024).toFixed(2);
    if (usage > 900) console.warn("⚠️ [PREDICTIVE] Disk space critical. Initiate purge.");
}
module.exports = { checkStorageRisk };
