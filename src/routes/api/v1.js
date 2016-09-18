import { Router } from 'express';

import RootController from '../../controllers/api/v1/RootController';

export default ({config, db}) => {
    const routes = Router();
    const RootControllerInstance = new RootController({config, db});

    routes.get('/', RootControllerInstance.root);

    return routes;
}