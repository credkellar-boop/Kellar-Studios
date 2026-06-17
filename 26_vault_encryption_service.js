const crypto = require('crypto');
const fs = require('fs');

function encryptAsset(filePath, key) {
    const cipher = crypto.createCipher('aes-256-cbc', key);
    const input = fs.createReadStream(filePath);
    const output = fs.createWriteStream(filePath + '.enc');
    input.pipe(cipher).pipe(output);
}
module.exports = { encryptAsset };
