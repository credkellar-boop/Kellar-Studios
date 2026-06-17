require('dotenv').config();
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Initialize Google OAuth2 Client
const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({ refresh_token: process.env.YOUTUBE_REFRESH_TOKEN });

const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

/**
 * Uploads a validated _FINAL video directly to YouTube with studio boilerplate
 */
async function deployToYouTube(filePath, titleText, tagsArray = ["KellarStudio", "AudioEngineering"]) {
    console.log(`🌐 [YOUTUBE API] Initializing upload sequence for: ${path.basename(filePath)}`);

    const studioBoilerplate = `
🎯 In this video, we break down the technical layers and strategic execution behind ${titleText}. Dive deep into the data pipelines, cognitive architecture, and engineering principles driving this release.

-----------------------------------------------------------
⚡ PRODUCTION TECHNICAL SPECS (ENGINE-READY)
-----------------------------------------------------------
🔬 Visual Master: 1080p/4K Lossless Rendering Pipeline
🎛️ Audio Mastering: -14 LUFS Integrated | -1.0 dBTP Target
🔊 Audio Codec: 24-bit PCM WAV @ 48kHz High-Fidelity
🎨 Studio Color Profile: Electric Hertz (#00FFFF) & Signal Amber (#FF6B00)

© 2026 Kellar-Studio’s. All Rights Reserved.
    `.trim();

    try {
        const fileSize = fs.statSync(filePath).size;
        const res = await youtube.videos.insert({
            part: 'snippet,status',
            requestBody: {
                snippet: {
                    title: `[KS] ${titleText} | Kellar-Studio Master`,
                    description: studioBoilerplate,
                    tags: tagsArray,
                    categoryId: '27' // Education Category
                },
                status: {
                    privacyStatus: 'private', // Always upload as private for final manual QC
                    selfDeclaredMadeForKids: false
                }
            },
            media: {
                body: fs.createReadStream(filePath)
            }
        }, {
            onUploadProgress: evt => {
                const progress = (evt.bytesRead / fileSize) * 100;
                process.stdout.write(`☁️  Uploading... ${Math.round(progress)}%\r`);
            }
        });

        console.log(`\n✅ [YOUTUBE SUCCESS] Asset deployed successfully!`);
        console.log(`🔗 Video URL: https://youtu.be/${res.data.id}`);
        return res.data.id;

    } catch (error) {
        console.error(`\n❌ [YOUTUBE ERROR] Upload sequence failed: ${error.message}`);
    }
}

module.exports = { deployToYouTube };
