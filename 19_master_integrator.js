/**
 * KELLAR-STUDIO MASTER DAEMON (v2.0)
 * Replaces pipeline-watcher.js
 */
const chokidar = require('chokidar');
const path = require('path');
const { validateFilename } = require('./01_nomenclature_validator');
const { conformFrameRate } = require('./03_framerate_conformer');
const { extractThumbnail } = require('./11_thumbnail_extractor');
const { syncToNotion } = require('./12_notion_calendar_sync');
const { routeAsset } = require('./07_stage_router');

const STAGING_DIR = path.join(__dirname, '01_STAGE_FOR_RELEASE');

const watcher = chokidar.watch(STAGING_DIR, { persistent: true, awaitWriteFinish: true });

watcher.on('add', async (filePath) => {
    const filename = path.basename(filePath);
    
    // 1. Validation Gateway
    if (!validateFilename(filename)) return;

    console.log(`\n📦 [MASTER] Commencing automated pipeline for: ${filename}`);

    try {
        // 2. Notion Sync
        await syncToNotion(filename, filename.split('_')[2]);

        // 3. Process Video Features
        if (filename.endsWith('.mp4') || filename.endsWith('.mov')) {
            await extractThumbnail(filePath, STAGING_DIR);
            
            if (filename.includes('_RAW')) {
                await conformFrameRate(filePath, STAGING_DIR);
            }
        }

        // 4. Archive Routing
        await routeAsset(filePath, filename);

    } catch (error) {
        console.error(`❌ [PIPELINE CRASH] ${error.message}`);
    }
});

console.log(`🚀 [KELLAR-STUDIO OS] Master Pipeline v2.0 Active. Listening...`);
