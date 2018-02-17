import fs from 'fs';
import Boom from 'boom';
import path from 'path';
import Router from 'koa-router';

import logger from '../logger';
import checkAccess from '../middleware/checkAccess';
import checkAuthentication from '../middleware/checkAuthentication';
import filterRequestByAccess from '../middleware/filterRequestByAccess';
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
                afterMiddleware: afterRouteMiddleware = [],
            } = config;

            const accessControl = {
                ...defaultAccessControl,
                ...config.accessControl,
            };

            const methods = Array.isArray(method) ? method : [method];

            const accessControlCheckAuthenticationMiddleware = accessControl.authenticated && checkAuthentication;
            const accessControlCheckMiddleware = accessControl.check && checkAccess(accessControl);
            const accessControlPreFilterMiddleware = accessControl.filter && filterRequestByAccess;
            const accessControlPostFilterMiddleware = accessControl.filter && filterResponseByAccess;

            methods.forEach((httpMethod) => {
                logger.debug(`[Module][${dir}][${httpMethod.toUpperCase()} ${baseUrl}${route}] Setting up route`);

                const middlewareToRun = [
                    accessControlCheckAuthenticationMiddleware,
                    ...routeMiddleware,
                    accessControlCheckMiddleware,
                    accessControlPreFilterMiddleware,
                    async (ctx, next) => {
                        await handler(ctx, next);

                        return next();
                    },
                    accessControlPostFilterMiddleware,
                    ...afterRouteMiddleware,
                ].filter(Boolean);

                instance[httpMethod](route, ...middlewareToRun);
            });
        });

        app.use(instance.routes());

        app.use(
            instance.allowedMethods({
                throw: true,
                notImplemented: () => Boom.notImplemented(),
                methodNotAllowed: () => Boom.methodNotAllowed(),
            })
        );
    });

    logger.debug('[Module] Finished setting up');
};
