import { Router } from 'express';

import rootRoutes from './root';
import usersRoutes from './users';
import scopesRoutes from './scopes';

export default () => {
    const routes = Router();

    routes.use('/', rootRoutes());
    routes.use('/scopes', scopesRoutes());
    routes.use('/users', usersRoutes());

    return routes;
}
