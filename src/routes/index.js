import v1ApiRoutes from './v1';
import rootRoutes from './root';
import docsRoutes from './docs';

export default (app) => {
    // route routes
    app.use('/', rootRoutes());

    // documentation
    app.use('/docs', docsRoutes());

    // v1 API routes
    app.use('/v1', v1ApiRoutes());
}
