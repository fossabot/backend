import { Router } from 'express';

import { RootController } from '../../controllers/api/v1';

export default () => {
    const routes = Router();

    routes.get('/', RootController.root);
    routes.get('/roles', RootController.roles);

    return routes;
}