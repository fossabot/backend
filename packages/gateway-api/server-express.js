const express = require('express');
const responseTime = require('response-time');
const proxy = require('http-proxy-middleware');

const services = require('./config/services.json');

const app = express();

app.use(responseTime());

services.forEach(({ path, target }) => {
    app.use(path, proxy({
        target,
        xfwd: true,
        ignorePath: true,
        changeOrigin: true,
    }));
});

app.listen(3000);
