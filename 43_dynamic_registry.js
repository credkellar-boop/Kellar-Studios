/**
 * Registry Mapping: ScriptID -> ModuleName
 */
const scriptRegistry = {
    "01": "nomenclature_validator",
    "02": "audio_auditor",
    "07": "stage_router",
    "08": "webhook_notifier",
    "11": "thumbnail_extractor",
    "12": "notion_calendar_sync",
    "30": "auto_deploy_master",
    "40": "master_reboot_sequence"
};

function getScriptPath(id) {
    return scriptRegistry[id] || null;
}

module.exports = { getScriptPath };
