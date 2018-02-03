import fs from 'fs';
import path from 'path';
import Router from 'koa-router';

import logger from '../logger';

export default (app) => {
    logger.debug('Setting up modules');

    // get all files in the directory
    const filesInDir = fs.readdirSync(__dirname);

    // then find all the directories
    const directories = filesInDir.filter((dir) => fs.statSync(path.join(__dirname, dir)).isDirectory());

    directories.forEach((dir) => {
        logger.debug(`Setting up module ${dir}`);

        const { routes, baseUrl, middleware = [] } = require(path.join(__dirname, dir, '/router.js'));

        const instance = new Router({ prefix: baseUrl });

        instance.use(...middleware);

        routes.filter((route) => route.active).forEach((config) => {
            const { method, route, middleware = [], handler } = config;

            const methods = Array.isArray(method) ? method : [method];

            methods.forEach((httpMethod) => {
                instance[httpMethod](route, ...middleware, async (ctx) => await handler(ctx));
            });

            app.use(instance.routes()).use(instance.allowedMethods());
        });
    });

    logger.debug('Finished setting up modules');
};
