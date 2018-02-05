const getPort = require('get-port-sync');

require('events').EventEmitter.defaultMaxListeners = 100;

module.exports = {
    port: getPort(),
    baseUrl: 'http://127.0.0.1:3001',
    graphql: {
        enabled: false,
        graphiql: {
            enabled: false,
        },
    },
};
