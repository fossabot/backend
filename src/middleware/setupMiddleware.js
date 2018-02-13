import Boom from 'boom';
import cors from 'kcors';
import jwt from 'koa-jwt';
import config from 'config';
import etag from 'koa-etag';
import helmet from 'koa-helmet';
import convert from 'koa-convert';
import respond from 'koa-respond';
import error from 'koa-json-error';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import { RateLimit } from 'koa2-ratelimit';
import * as paginate from 'koa-ctx-paginate';
import responseTime from 'koa-response-time';
import conditional from 'koa-conditional-get';

import logger from '../logger';
import passport from '../passport';
import { convertTimeStringToMilliseconds, generateErrorJsonResponse, isDevelopmentEnvironment } from '../utils';

export default (app) => {
    // adds in x-response-time headers
    app.use(responseTime());

    // compress responses
    app.use(compress());

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

    // adds some convenience methods to the `ctx` object
    app.use(
        respond({
            autoMessage: false,
        })
    );

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

    // allow conditional http requests
    app.use(conditional());

    // add eTag headers
    app.use(etag());

    // add in pagination helpers
    app.use(paginate.middleware(config.get('pagination.limit'), config.get('pagination.max')));
};
