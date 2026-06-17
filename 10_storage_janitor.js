const fs = require('fs-extra');
const path = require('path');
const cron = require('node-cron');

const STAGING_DIR = path.join(__dirname, '01_STAGE_FOR_RELEASE');
const MAX_AGE_DAYS = 7;

/**
 * Purges old files from the staging directory to prevent memory block exhaustion
 */
async function cleanStagingDirectory() {
    console.log(`🧹 [JANITOR] Running scheduled folder purge on ${STAGING_DIR}...`);
    
    try {
        const files = await fs.readdir(STAGING_DIR);
        const now = Date.now();

        for (const file of files) {
            const filePath = path.join(STAGING_DIR, file);
            const stats = await fs.stat(filePath);
            const fileAgeDays = (now - stats.mtimeMs) / (1000 * 60 * 60 * 24);

            if (fileAgeDays > MAX_AGE_DAYS) {
                await fs.remove(filePath);
                console.log(`🗑️ [DELETED] Purged aged asset: ${file}`);
            }
        }
        console.log(`✅ [JANITOR] Maintenance complete.`);
    } catch (error) {
        console.error(`❌ [JANITOR ERROR] Failed to purge directory: ${error.message}`);
    }
}

// Schedule to run every Sunday at 3:00 AM automatically
cron.schedule('0 3 * * 0', () => {
    cleanStagingDirectory();
});

module.exports = { cleanStagingDirectory };
