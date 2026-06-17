module.exports = {
  apps : [{
    name: "kellar-pipeline",
    script: "pipeline_orchestrator.js",
    watch: true,
    env: { NODE_ENV: "production" },
    max_memory_restart: '1G' // Auto-restarts if memory leaks occur
  }]
}
