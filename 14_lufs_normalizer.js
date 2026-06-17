const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

async function forceLUFS(inputPath, outputFolder) {
    const outputPath = path.join(outputFolder, path.basename(inputPath, '.wav') + '_NORMALIZED.wav');
    console.log(`🔊 [LOUDNORM] Conforming audio to -14 LUFS...`);
    
    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .audioFilters('loudnorm=I=-14:TP=-1.0:LRA=11')
            .save(outputPath)
            .on('end', () => resolve(outputPath))
            .on('error', err => reject(err));
    });
}
module.exports = { forceLUFS };
