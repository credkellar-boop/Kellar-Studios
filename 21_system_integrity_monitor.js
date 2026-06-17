const crypto = require('crypto');
const fs = require('fs-extra');

async function verifyAssetIntegrity(filePath, originalHash) {
    const fileBuffer = await fs.readFile(filePath);
    const hashSum = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    return hashSum === originalHash;
}
module.exports = { verifyAssetIntegrity };
