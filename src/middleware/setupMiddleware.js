import Boom from 'boom';
import cors from 'kcors';
import jwt from 'koa-jwt';
import config from 'config';
import helmet from 'koa-helmet';
import convert from 'koa-convert';
import error from 'koa-json-error';
import bodyParser from 'koa-bodyparser';
import { RateLimit } from 'koa2-ratelimit';
import responseTime from 'koa-response-time';

import logger from '../logger';
import passport from '../passport';
import { convertTimeStringToMilliseconds, generateErrorJsonResponse, isDevelopmentEnvironment } from '../utils';

export default (app) => {
    // rate limit requests
    app.use(
        RateLimit.middleware({
            interval: convertTimeStringToMilliseconds(config.get('ratelimit.time')),
            max: config.get('ratelimit.requests'),
            delayAfter: 0,
            timeWait: 0,
            handler: (ctx) => {
                ctx.set('Retry-After', Math.ceil(config.get('ratelimit.time') / 1000));
                ctx.throw(429, Boom.tooManyRequests('Too many requests, please try again later'));
            },
            onLimitReached: (ctx) => {
                logger.info(`[RateLimiter] IP ${ctx.request.ip} reached RateLimit`);
            },
            skip: () => isDevelopmentEnvironment(),
        })
    );

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
