const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

async function extractThumbnail(videoPath, outputFolder) {
    console.log(`🖼️ [THUMBNAIL] Extracting hero frame...`);
    return new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .screenshots({
                timestamps: ['50%'], // Grabs the exact middle of the video
                filename: '%b_THUMB.png',
                folder: outputFolder,
                size: '1920x1080'
            })
            .on('end', () => resolve(true))
            .on('error', err => reject(err));
    });
}
module.exports = { extractThumbnail };
