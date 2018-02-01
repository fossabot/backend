module.exports = require('require-all')({
    // export all files in the /lib directory
    dirname: `${__dirname}/lib`,

    // convert 'x-response-time' to 'xResponseTime'
    map: (name, path) => (name.replace(/-([a-z])/g, (m, c) => (c.toUpperCase())))
});
