import fs from 'fs';
import Boom from 'boom';
import path from 'path';
import Router from 'koa-router';

import logger from '../logger';
import checkAccess from '../middleware/checkAccess';
import isAuthenticated from '../middleware/isAuthenticated';
import filterResponseByAccess from '../middleware/filterResponseByAccess';

const defaultAccessControl = {
    authenticated: false,
    check: false,
    filter: false,
};

/**
 * This will setup the modules defined and setup their routing.
 *
 * @param {object} app
 */
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
            const {
                route,
                method,
                handler,
                middleware: routeMiddleware = [],
                accessControl = defaultAccessControl,
                afterMiddleware: afterRouteMiddleware = [],
            } = config;

            const methods = Array.isArray(method) ? method : [method];

            const accessControlAuthenticatedMiddleware = accessControl.authenticated && isAuthenticated;
            const accessControlCheckMiddleware = accessControl.check && checkAccess(accessControl);
            const accessControlFilterMiddleware = accessControl.filter && filterResponseByAccess;

            const middlewareToRun = [
                accessControlAuthenticatedMiddleware,
                ...routeMiddleware,
                accessControlCheckMiddleware,
                async (ctx, next) => {
                    await handler(ctx);

                    return next();
                },
                accessControlFilterMiddleware,
                ...afterRouteMiddleware,
            ].filter(Boolean);

            methods.forEach((httpMethod) => {
                logger.debug(`[Module][${dir}][${httpMethod.toUpperCase()} ${baseUrl}${route}] Setting up route`);
                instance[httpMethod](route, ...middlewareToRun);
            });

            app.use(instance.routes()).use(
                instance.allowedMethods({
                    throw: true,
                    notImplemented: () => Boom.notImplemented(),
                    methodNotAllowed: () => Boom.methodNotAllowed(),
                })
            );
        });
    });

    logger.debug('[Module] Finished setting up');
};
