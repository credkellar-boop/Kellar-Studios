const path = require('path');

/**
 * Validates Kellar-Studio Nomenclature Standard
 * Target Format: YYYYMMDD_ClientName_ProjectName_AssetDescriptor_STAGE.extension
 */
function validateFilename(filename) {
    // Regex breakdown: 8 digits _ Alphanumeric _ Alphanumeric _ Alphanumeric _ (RAW|PREMIX|FINAL) . extension
    const studioRegex = /^\d{8}_[A-Za-z0-9]+_[A-Za-z0-9]+_[A-Za-z0-9]+_(RAW|PREMIX|FINAL)\.[a-zA-Z0-9]+$/;
    
    if (studioRegex.test(filename)) {
        console.log(`✅ [VALID] Nomenclature approved for: ${filename}`);
        return true;
    } else {
        console.error(`❌ [REJECTED] Formatting violation detected in: ${filename}`);
        console.error(`   Expected: YYYYMMDD_ClientName_ProjectName_AssetDescriptor_STAGE.extension`);
        return false;
    }
}

module.exports = { validateFilename };
