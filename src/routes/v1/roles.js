import { Router } from 'express';

import RolesController from '../../controllers/v1/RolesController';

export default () => {
    const routes = Router();

    routes.get('/', RolesController.index);

    return routes;
}