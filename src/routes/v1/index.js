import { Router } from 'express';

import rootRoutes from './root';
import rolesRoutes from './roles';
import scopesRoutes from './scopes';

export default () => {
    const routes = Router();

    routes.use('/', rootRoutes());
    routes.use('/roles', rolesRoutes());
    routes.use('/scopes', scopesRoutes());

    return routes;
}
