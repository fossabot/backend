import Koa from 'koa';
import config from 'config';

import setupModules from './modules/setupModules';
import setupDatabase from './database/setupDatabase';
import setupMiddleware from './middleware/setupMiddleware';

const app = new Koa();

// add in the secret keys
app.keys = [config.get('secret')];

// setup the database including connecting knex to objection (ORM)
setupDatabase();

// setup the global middleware
setupMiddleware(app);

// setup the modules which contain their own routes, middleware and controller logic
setupModules(app);

// listen on the configured port
app.listen(config.get('port'));
