// koa middleware
import cors from 'kcors';
import helmet from 'koa-helmet';
import convert from 'koa-convert';
import bodyParser from 'koa-bodyparser';
import responseTime from 'koa-response-time';

export default (app) => {
    // adds in x-response-time headers
    app.use(responseTime());

    // adds in extra headers for security/best practices
    app.use(helmet());

    // adds in cors headers
    app.use(convert(cors({ credentials: true })));

    // parses the body on POST/PUT requests and makes it available in `ctx.request.body`
    app.use(bodyParser());
};
