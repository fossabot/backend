// koa middleware
import cors from 'kcors';
import config from 'config';
import helmet from 'koa-helmet';
import convert from 'koa-convert';
import session from 'koa-session';
import bodyParser from 'koa-bodyparser';
import responseTime from 'koa-response-time';

export default (app) => {
    app.use(responseTime());
    app.use(helmet());

    app.use(convert(cors({ credentials: true })));

    app.use(bodyParser());

    app.use(session({ ...config.session }, app));
};
