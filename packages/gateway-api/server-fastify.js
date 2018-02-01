const responseTime = require('response-time');
const proxy = require('http-proxy-middleware');

const fastify = require('fastify')()

const services = require('./config/services.json');

fastify.use(responseTime());

services.forEach(({ path, target }) => {
    fastify.use(path, proxy({
        target,
        xfwd: true,
        ignorePath: true,
        changeOrigin: true,
    }));
});

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()
