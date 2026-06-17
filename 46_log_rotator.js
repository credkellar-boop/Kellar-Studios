const winston = require('winston');
require('winston-daily-rotate-file');

const transport = new winston.transports.DailyRotateFile({
    filename: 'logs/kellar-studio-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m', // Caps log file size
    maxFiles: '14d' // Auto-deletes logs older than 2 weeks
});
module.exports = transport;
