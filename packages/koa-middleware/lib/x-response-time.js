module.exports = () => (
    async (ctx, next) => {
        const start = Date.now();

        await next();
        console.log('x-response-time after');

        const ms = Date.now() - start;

        ctx.set('X-Response-Time', `${ms}ms`);
    }
);
