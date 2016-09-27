import rootRoutes from './root';
import v1ApiRoutes from './api/v1';

export default (app) => {
    // route routes
    app.use('/', rootRoutes());

    // v1 API routes
    app.use('/v1', v1ApiRoutes());

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
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
