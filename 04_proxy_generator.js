const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs-extra');

/**
 * Compiles a lightweight 1080p H.264 proxy with forced Constant Frame Rate (CFR)
 */
async function generateProxy(inputPath, outputFolder) {
    await fs.ensureDir(outputFolder);
    const filename = path.basename(inputPath, path.extname(inputPath)) + '_PROXY.mp4';
    const outputPath = path.join(outputFolder, filename);

    console.log(`🎬 [PROXY] Starting transcode for: ${path.basename(inputPath)}`);

    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .videoCodec('libx264')
            .audioCodec('aac')
            .size('1920x1080')
            .fps(30) // Enforces constant frame rate baseline[span_3](start_span)[span_3](end_span)
            .outputOptions([
                '-preset fast',
                '-crf 23',
                '-vsync cfr' // Strictly bars variable frame rates[span_4](start_span)[span_4](end_span)
            ])
            .on('end', () => {
                console.log(`✅ [PROXY COMPLETE] Asset ready at: ${outputPath}`);
                resolve(outputPath);
            })
            .on('error', (err) => {
                console.error(`❌ [PROXY ERROR] FFmpeg transcode failed: ${err.message}`);
                reject(err);
            })
            .save(outputPath);
    });
}

module.exports = { generateProxy };
