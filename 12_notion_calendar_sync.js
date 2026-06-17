const { Client } = require('@notionhq/client');
require('dotenv').config();

const notion = new Client({ auth: process.env.NOTION_API_KEY });

async function syncToNotion(filename, projectTitle) {
    console.log(`🗃️ [NOTION] Syncing ${projectTitle} to content database...`);
    try {
        await notion.pages.create({
            parent: { database_id: process.env.NOTION_DATABASE_ID },
            properties: {
                "Project Title": { title: [{ text: { content: projectTitle } }] },
                "Filename": { rich_text: [{ text: { content: filename } }] },
                "Status": { select: { name: "QC Verification" } },
                "Date Staged": { date: { start: new Date().toISOString() } }
            }
        });
    } catch (error) {
        console.error(`❌ [NOTION ERROR] ${error.message}`);
    }
}
module.exports = { syncToNotion };
