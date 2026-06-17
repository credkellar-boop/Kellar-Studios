const fs = require('fs-extra');
const path = require('path');

const NAS_DRIVE_PATH = process.env.NAS_PATH || 'Z:/Kellar_Studio_Backups/';

async function backupToNAS(filePath) {
    const filename = path.basename(filePath);
    const destination = path.join(NAS_DRIVE_PATH, new Date().getFullYear().toString(), filename);
    
    console.log(`💾 [BACKUP] Mirroring asset to physical NAS vault...`);
    try {
        await fs.copy(filePath, destination);
        console.log(`✅ [BACKUP SUCCESS] Asset secured at ${destination}`);
    } catch (error) {
        console.error(`❌ [BACKUP ERROR] ${error.message}`);
    }
}
module.exports = { backupToNAS };
