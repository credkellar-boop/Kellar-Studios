require('dotenv').config();
const axios = require('axios');
const path = require('path');

/**
 * Pings team channels when a finalized asset clears the automated pipeline
 */
async function triggerDeploymentNotification(filePath) {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;
    const filename = path.basename(filePath);
    const filesizeMb = (require('fs').statSync(filePath).size / (1024 * 1024)).toFixed(2);

    if (!webhookUrl) {
        console.warn(`⚠️ [WEBHOOK] No Slack URL found in .env. Skipping notification.`);
        return;
    }

    console.log(`🔔 [WEBHOOK] Dispatching deployment notification for: ${filename}`);

    const messagePayload = {
        attachments: [
            {
                color: "#00FFFF", // Electric Hertz Brand Accent
                pretext: "🚀 *Kellar-Studio Pipeline Alert*",
                title: "New Master Asset Cleared for Deployment",
                text: `The following asset has passed QC constraints and is routed to the Final_Masters vault.`,
                fields: [
                    { title: "Asset ID", value: `\`${filename}\``, short: false },
                    { title: "Size", value: `${filesizeMb} MB`, short: true },
                    { title: "Status", value: "✅ QC Verified (24-bit/48kHz | -14 LUFS)", short: true }
                ],
                footer: "Kellar-Studio Automated Daemon",
                ts: Math.floor(Date.now() / 1000)
            }
        ]
    };

    try {
        await axios.post(webhookUrl, messagePayload);
        console.log(`✅ [WEBHOOK SUCCESS] Notification delivered to workspace.`);
    } catch (error) {
        console.error(`❌ [WEBHOOK ERROR] Failed to dispatch message: ${error.message}`);
    }
}

module.exports = { triggerDeploymentNotification };
