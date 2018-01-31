const Koa = require('koa');
const Boom = require('boom');
const logger = require('koa-logger');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use(logger());

router.get('/api', (ctx) => {
    ctx.body = 'Hello World from server-service';
});

app.use(router.routes());

app.use(router.allowedMethods({
    throw: true,
    notImplemented: () => new Boom.notImplemented(),
    methodNotAllowed: () => new Boom.methodNotAllowed()
}));

app.listen(3006, () => {
    console.log('Server started on port 3006');
});
