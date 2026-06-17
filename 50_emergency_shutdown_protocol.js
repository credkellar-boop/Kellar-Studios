const { exec } = require('child_process');
const fs = require('fs-extra');

async function emergencyShutdown() {
    console.error("🚨 [EMERGENCY] Initiating immediate shutdown protocol...");
    
    // 1. Log current state
    await fs.writeJson('CRITICAL_STATE.json', { timestamp: Date.now(), status: "SHUTDOWN" });
    
    // 2. Terminate all active Node processes
    exec('pm2 kill', () => {
        console.log("✅ [SYSTEM] All pipelines safely terminated.");
        process.exit(1);
    });
}
module.exports = { emergencyShutdown };
