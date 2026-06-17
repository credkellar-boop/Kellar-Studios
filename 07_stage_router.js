const fs = require('fs-extra');
const path = require('path');

const DIRECTORIES = {
    RAW: path.join(__dirname, '02_Source_Files', 'Audio'),
    PREMIX: path.join(__dirname, '04_Bounces', 'Demos'),
    FINAL: path.join(__dirname, '04_Bounces', 'Final_Masters')
};

/**
 * Routes files to target directories based on their STAGE tag
 */
async function routeAsset(filePath, filename) {
    try {
        let destination = '';

        if (filename.includes('_RAW.')) destination = DIRECTORIES.RAW;
        else if (filename.includes('_PREMIX.')) destination = DIRECTORIES.PREMIX;
        else if (filename.includes('_FINAL.')) destination = DIRECTORIES.FINAL;
        else throw new Error('Unrecognized stage tag during routing.');

        // Ensure directory exists, then move file
        await fs.ensureDir(destination);
        const targetPath = path.join(destination, filename);
        
        await fs.move(filePath, targetPath, { overwrite: true });
        console.log(`📁 [ROUTED] Successfully moved to: ${destination}`);
        
        return targetPath;
    } catch (error) {
        console.error(`❌ [ROUTING ERROR] ${error.message}`);
    }
}

module.exports = { routeAsset };
