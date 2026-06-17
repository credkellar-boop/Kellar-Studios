const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs-extra');

/**
 * Places a security watermark stamp across the lower center of the layout area
 */
async function applyReviewStamp(inputPath, outputFolder, clientName = "INTERNAL") {
    await fs.ensureDir(outputFolder);
    const filename = path.basename(inputPath, path.extname(inputPath)) + '_STAMPED.mp4';
    const outputPath = path.join(outputFolder, filename);

    console.log(`🔒 [STAMPER] Burning evaluation security graphics onto file frames...`);

    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .outputOptions([
                // Draws dynamic text inside the interface platform safe-zone margin limits[span_15](start_span)[span_15](end_span)
                // Font color parameter locked to Signal Amber (#FF6B00)[span_16](start_span)[span_16](end_span)
                '-vf', `drawtext=text='KELLAR-STUDIO REVIEW WORKFLOW - PROPERTY OF ${clientName.toUpperCase()}':` +
                       `x=(w-text_w)/2:y=h-(h*0.15):` + // Elevated 15% above the baseline safe margin floor[span_17](start_span)[span_17](end_span)
                       `fontsize=24:fontcolor=#FF6B00:box=1:boxcolor=#0B0C10@0.8:boxborderw=10`
            ])
            .on('end', () => {
                console.log(`✅ [STAMPER COMPLETE] Security overlay locked: ${outputPath}`);
                resolve(outputPath);
            })
            .on('error', (err) => {
                console.error(`❌ [STAMPER ERROR] Watermark injection failed: ${err.message}`);
                reject(err);
            })
            .save(outputPath);
    });
}

module.exports = { applyReviewStamp };
