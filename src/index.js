import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import express from 'express';
import compress from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import routes from './routes';
import { environment, getConfig } from '../config';
import middleware from './middleware';

const config = getConfig();

let app = express();
app.server = http.createServer(app);

// 3rd party middleware
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(cookieParser());

if (environment === 'development') {
    app.use(logger('dev'));
}

app.use(bodyParser.json());

// internal middleware
app.use(middleware());

// routes
routes(app);

app.server.listen(process.env.PORT || config.port);

if (environment !== 'test') {
    console.log(`Started on port ${app.server.address().port}`);
}

export default app;
