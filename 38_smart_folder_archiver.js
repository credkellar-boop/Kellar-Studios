const fs = require('fs-extra');
async function archive(source, target) {
    await fs.move(source, target);
    console.log(`📁 [ARCHIVE] Asset moved to long-term storage.`);
}
module.exports = { archive };
