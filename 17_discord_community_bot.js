const axios = require('axios');

async function announceToDiscord(videoTitle, youtubeLink) {
    console.log(`💬 [DISCORD] Broadcasting release to community...`);
    const payload = {
        content: `🚨 **NEW RELEASE LIVE** 🚨\n\n${videoTitle}\n${youtubeLink}`,
        embeds: [{
            title: "Watch the Master Breakdown",
            color: 65535, // #00FFFF in Decimal
            url: youtubeLink
        }]
    };
    try {
        await axios.post(process.env.DISCORD_PUBLIC_WEBHOOK, payload);
    } catch (error) {
        console.error(`❌ [DISCORD ERROR] ${error.message}`);
    }
}
module.exports = { announceToDiscord };
