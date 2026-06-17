/**
 * Synchronizes production secrets to the local environment
 */
const dotenvVault = require('dotenv-vault-core');

async function syncVault() {
    console.log("🔒 [VAULT] Synchronizing encrypted credentials...");
    dotenvVault.config();
    console.log("✅ [VAULT] Secrets injected into memory.");
}

module.exports = { syncVault };
