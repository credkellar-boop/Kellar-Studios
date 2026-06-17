const fs = require('fs-extra');

async function syncToCloud(filePath) {
    const remoteDest = `/Volumes/CloudStorage/Backups/${require('path').basename(filePath)}`;
    await fs.copy(filePath, remoteDest);
    console.log(`🌐 [SYNC] Remote redundancy established for ${filePath}`);
}
module.exports = { syncToCloud };
