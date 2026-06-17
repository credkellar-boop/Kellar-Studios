const config = require('./pipeline_config.json');

function routeEvent(event, filePath) {
    const activeTasks = config.stages[event];
    activeTasks.forEach(task => {
        const module = require(`./${task.script}`);
        module.execute(filePath);
    });
}
module.exports = { routeEvent };
