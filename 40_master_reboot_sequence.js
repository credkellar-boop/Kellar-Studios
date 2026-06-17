const { exec } = require('child_process');
function rebootPipeline() {
    console.log(`⚙️ [REBOOT] Flushing memory buffers and restarting daemon...`);
    exec('pm2 restart kellar-pipeline');
}
module.exports = { rebootPipeline };
