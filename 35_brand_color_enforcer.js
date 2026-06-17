const sharp = require('sharp');
async function checkColorCompliance(imgPath) {
    const { dominant } = await sharp(imgPath).stats();
    console.log(`🎨 [BRAND] Dominant color detected: ${dominant.hex}`);
}
module.exports = { checkColorCompliance };
