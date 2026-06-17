const { execSync } = require('child_process');
const fs = require('fs');

function preFlightCheck() {
    console.log("🚀 [SYSTEM] Running Pre-Flight Environment Validation...");
    
    // 1. Verify FFmpeg
    try {
        execSync('ffmpeg -version');
        console.log("✅ FFmpeg is installed.");
    } catch (e) {
        throw new Error("FFmpeg not found. Pipeline cannot start.");
    }

    // 2. Verify .env
    if (!fs.existsSync('./.env')) {
        throw new Error("Missing .env file. Security credentials required.");
    }

    console.log("✅ [SYSTEM] All dependencies verified. Initialization ready.");
}

module.exports = { preFlightCheck };
