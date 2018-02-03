import path from 'path';
import config from 'config';
import winston from 'winston';

import { isDevelopmentEnvironment, isProductionEnvironment } from './utils';

export default new winston.Logger({
    transports: [
        isDevelopmentEnvironment && new winston.transports.Console(),
        isProductionEnvironment &&
            new winston.transports.File({ filename: path.resolve(__dirname, '../logs/server.log') }),
    ].filter(Boolean),
    level: config.get('log.level'),
});
