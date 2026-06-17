const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'pipeline-audit.log' }),
        new winston.transports.Console()
    ]
});
module.exports = logger;
