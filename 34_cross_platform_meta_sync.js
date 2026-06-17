function syncManifest(projectData) {
    console.log(`🔗 [SYNC] Distributing metadata to manifest for all platforms.`);
    return { ...projectData, timestamp: Date.now() };
}
module.exports = { syncManifest };
