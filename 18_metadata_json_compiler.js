const fs = require('fs-extra');
const path = require('path');

async function compileSidecarJSON(filePath, metadataObj) {
    const filename = path.basename(filePath, path.extname(filePath));
    const sidecarPath = path.join(path.dirname(filePath), `${filename}_META.json`);
    
    console.log(`🗂️ [SIDECAR] Generating metadata JSON...`);
    try {
        await fs.writeJson(sidecarPath, metadataObj, { spaces: 4 });
    } catch (error) {
        console.error(`❌ [SIDECAR ERROR] ${error.message}`);
    }
}
module.exports = { compileSidecarJSON };
