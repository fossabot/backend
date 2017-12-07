import httpStatus from 'http-status';
import { ValidationError } from 'objection';

import APIError from './errors/APIError';

import { formatValidationErrors } from './utils';

export default (app) => {
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        const err = new APIError('Not found', httpStatus.NOT_FOUND);

        return next(err);
    });

    // error handler - no stacktraces leaked to user unless development
    // eslint-disable-next-line no-unused-vars
    app.use(function (err, req, res, next) {
        const statusCode = err.status || 500;

        const isValidationError = (err.error || {}) instanceof ValidationError;

        const stacktrace = app.get('env') === 'development' ? { stack: err.stack } : {};

        const validation = isValidationError ? { validation: formatValidationErrors(err.error.data) } : {};

        const message = isValidationError ? 'Validation error.' : err.message;

        res.status(statusCode);
        res.json({
            status: statusCode,
            message,
            ...validation,
            ...stacktrace,
        });
    });
};
