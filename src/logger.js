import path from 'path';
import config from 'config';
import winston from 'winston';

const nodeEnv = config.util.getEnv('NODE_ENV');
const isDev = nodeEnv === 'development';
const isProd = nodeEnv === 'production';

export default new winston.Logger({
    transports: [
        isDev && new winston.transports.Console(),
        isProd && new winston.transports.File({ filename: path.resolve(__dirname, '../logs/server.log') }),
    ].filter(Boolean),
    level: config.get('log.level'),
});
