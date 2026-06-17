const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

/**
 * Forces unpredictable VFR mobile footage into strict 60fps CFR
 */
async function conformFrameRate(inputPath, outputFolder) {
    const outputPath = path.join(outputFolder, path.basename(inputPath, path.extname(inputPath)) + '_CFR.mp4');
    console.log(`⏱️ [CONFORMER] Locking frame rate to 60fps CFR...`);

    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .outputOptions(['-r 60', '-vsync 1', '-c:v libx264', '-c:a copy'])
            .save(outputPath)
            .on('end', () => resolve(outputPath))
            .on('error', err => reject(err));
    });
}
module.exports = { conformFrameRate };
