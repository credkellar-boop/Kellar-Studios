const ffmpeg = require('fluent-ffmpeg');

/**
 * Probes audio files to ensure 24-bit / 48kHz compliance
 */
function auditAudioFile(filePath) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) return reject(`Probe Error: ${err.message}`);

            const audioStream = metadata.streams.find(s => s.codec_type === 'audio');
            if (!audioStream) return reject('No audio stream detected.');

            const sampleRate = audioStream.sample_rate;
            const bitDepth = audioStream.bits_per_raw_sample || audioStream.bits_per_sample; // Depends on codec wrapping

            console.log(`\n🔎 Auditing Audio Spec: ${sampleRate}Hz / ${bitDepth}-bit`);

            if (sampleRate === '48000' && (bitDepth === '24' || bitDepth === 24)) {
                console.log(`✅ [COMPLIANT] Audio meets Kellar-Studio 24-bit/48kHz parameters.`);
                resolve(true);
            } else {
                console.error(`❌ [FAILED] Audio spec violation. Please resubmit.`);
                resolve(false);
            }
        });
    });
}

module.exports = { auditAudioFile };
