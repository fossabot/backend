import config from 'config';
import winston from 'winston';

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
    ],
    level: config.get('log.level'),
});

export default logger;
