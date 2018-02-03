import fs from 'fs';
import path from 'path';
import Router from 'koa-router';

import logger from '../logger';

export default (app) => {
    logger.debug('[Module] Setting up');

    // get all files in the directory
    const filesInDir = fs.readdirSync(__dirname);

    // then find all the directories
    const directories = filesInDir.filter((dir) => fs.statSync(path.join(__dirname, dir)).isDirectory());

    directories.forEach((dir) => {
        logger.debug(`[Module][${dir}] Setting up module`);

        const { routes, baseUrl, middleware = [] } = require(path.join(__dirname, dir, '/router.js'));

        const instance = new Router({ prefix: baseUrl });

        instance.use(...middleware);

        // filter routes and just get ones marked as active (default is true)
        const activeRoutes = routes.filter(({ active = true }) => active);

        activeRoutes.forEach((config) => {
            const { method, route, middleware = [], handler } = config;

            const methods = Array.isArray(method) ? method : [method];

            methods.forEach((httpMethod) => {
                logger.debug(`[Module][${dir}][${httpMethod.toUpperCase()} ${baseUrl}${route}] Setting up route`);
                instance[httpMethod](route, ...middleware, async (ctx) => await handler(ctx));
            });

            app.use(instance.routes()).use(instance.allowedMethods());
        });
    });

    logger.debug('[Module] Finished setting up');
};
