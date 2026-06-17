const fs = require('fs');
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateSubtitles(audioPath) {
    console.log(`📝 [WHISPER] Generating SRT subtitles...`);
    try {
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(audioPath),
            model: "whisper-1",
            response_format: "srt"
        });
        const outputPath = audioPath.replace(/.wav|.mp4/g, '.srt');
        fs.writeFileSync(outputPath, transcription);
        console.log(`✅ [WHISPER] Subtitles saved: ${outputPath}`);
    } catch (error) {
        console.error(`❌ [WHISPER ERROR] ${error.message}`);
    }
}
module.exports = { generateSubtitles };
