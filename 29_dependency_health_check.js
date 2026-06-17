const { execSync } = require('child_process');

function checkHealth() {
    const ffmpegVer = execSync('ffmpeg -version').toString();
    console.log(`🤖 [HEALTH] System environment status: OK`);
}
module.exports = { checkHealth };
