const Koa = require('koa');
const Boom = require('boom');
const logger = require('koa-logger');
const proxy = require('koa-proxies');
const Router = require('koa-router');

const services = require('./config/services.json');

const app = new Koa();
const router = new Router();

app.use(logger());

services.forEach(({ path, target }) => {
    app.use(proxy(path, {
        target,
        xfwd: true,
        ignorePath: true,
        changeOrigin: true,
    }));
});

app.use(router.routes());

app.use(router.allowedMethods({
    throw: true,
    notImplemented: () => new Boom.notImplemented(),
    methodNotAllowed: () => new Boom.methodNotAllowed()
}));

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
