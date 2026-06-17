const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs-extra');

/**
 * Processes screen captures into standard 16:9 widescreen containers using 85% uniform canvas limits
 */
async function applyPIPGeometry(inputPath, outputFolder) {
    await fs.ensureDir(outputFolder);
    const filename = path.basename(inputPath, path.extname(inputPath)) + '_CONFORMED.mp4';
    const outputPath = path.join(outputFolder, filename);

    console.log(`📐 [GEOMETRY] Executing PIP scaling filters on: ${path.basename(inputPath)}`);

    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .outputOptions([
                // Complex Filter graph to execute Kellar-Studio layout guidelines[span_9](start_span)[span_9](end_span):
                // 1. Create standard 1920x1080 background colored with Midnight Onyx (#0B0C10)[span_10](start_span)[span_10](end_span)
                // 2. Scale primary video down to 85% of canvas width (1632px)[span_11](start_span)[span_11](end_span)
                // 3. Draw a 2px centered bounding box using Electric Hertz (#00FFFF)[span_12](start_span)[span_12](end_span)
                // 4. Overlay the scaled, framed video dead-center onto the canvas
                '-filter_complex', 
                '[0:v]scale=1632:-2,drawbox=y=0:x=0:w=iw:h=ih:color=#00FFFF:t=2[pip];' +
                'color=c=#0B0C10:s=1920x1080[bg];' +
                '[bg][pip]overlay=(W-w)/2:(H-h)/2[outv]',
                '-map', '[outv]',
                '-map', '0:a?', // Safely copy audio streams if they exist
                '-c:v', 'libx264',
                '-c:a', 'aac'
            ])
            .on('end', () => {
                console.log(`✅ [GEOMETRY COMPLETE] Render conformed to brand guidelines: ${outputPath}`);
                resolve(outputPath);
            })
            .on('error', (err) => {
                console.error(`❌ [GEOMETRY ERROR] Processing failed: ${err.message}`);
                reject(err);
            })
            .save(outputPath);
    });
}

module.exports = { applyPIPGeometry };
