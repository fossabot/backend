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

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        const err = new Error('Not found.');
        err.status = 404;

        return next(err);
    });

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res) {
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.json({
            message: err.message
        });
    });
}
