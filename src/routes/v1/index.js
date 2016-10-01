import { Router } from 'express';

import rootRoutes from './root';
import scopesRoutes from './scopes';

export default () => {
    const routes = Router();

    routes.use('/', rootRoutes());
    routes.use('/scopes', scopesRoutes());

    return routes;
}
