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
};
