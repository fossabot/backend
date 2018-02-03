// koa middleware
import cors from 'kcors';
import jwt from 'koa-jwt';
import config from 'config';
import helmet from 'koa-helmet';
import convert from 'koa-convert';
import error from 'koa-json-error';
import bodyParser from 'koa-bodyparser';
import responseTime from 'koa-response-time';

import passport from '../passport';
import { generateErrorJsonResponse } from '../utils';

export default (app) => {
    // adds in x-response-time headers
    app.use(responseTime());

    // adds in extra headers for security/best practices
    app.use(helmet());

    // adds in cors headers
    app.use(convert(cors({ credentials: true })));

    // parses the body on POST/PUT requests and makes it available in `ctx.request.body`
    app.use(bodyParser());

    app.use(error(generateErrorJsonResponse));

    // setup passport for authentication
    app.use(passport.initialize());

    // parse Authorization Header for JWT tokens
    app.use(
        jwt({
            key: 'jwtdata',
            passthrough: true,
            secret: config.get('secret'),
        })
    );
};
