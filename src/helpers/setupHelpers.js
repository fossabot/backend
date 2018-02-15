import Boom from 'boom';
import HttpStatus from 'http-status-codes';

/**
 * This will setup the helpers used in the koa context object.
 *
 * @param {object} app
 */
export default (app) => {
    app.context.ok = function (data) {
        this.status = HttpStatus.OK;
        this.body = data;
    };

    app.context.created = function (data) {
        this.status = HttpStatus.CREATED;
        this.body = data;
    };

    app.context.noContent = function () {
        this.status = HttpStatus.NO_CONTENT;
        this.body = null;
    };

    app.context.notFound = function (message) {
        this.throw(HttpStatus.NOT_FOUND, Boom.notFound(message));
    };

    app.context.badRequest = function (message) {
        this.throw(HttpStatus.BAD_REQUEST, Boom.badRequest(message));
    };

    app.context.tooManyRequests = function (message) {
        this.throw(HttpStatus.TOO_MANY_REQUESTS, Boom.tooManyRequests(message));
    };

    app.context.internalServerError = function (message) {
        this.throw(HttpStatus.INTERNAL_SERVER_ERROR, Boom.internal(message));
    };

    app.context.forbidden = function (message) {
        this.throw(HttpStatus.FORBIDDEN, Boom.forbidden(message));
    };

    app.context.unauthorized = function () {
        this.throw(HttpStatus.UNAUTHORIZED, Boom.unauthorized());
    };
};
