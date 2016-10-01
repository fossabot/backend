import BaseController from '../BaseController';

import { version } from '../../../package.json';

/**
 * The RootController controls the routes for the root of the API.
 */
class RootController extends BaseController {
    /**
     * This returns the current version of the api as defined in the package.json as well as authentication information.
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object}
     */
    static index(req, res) {
        const extraForSpread = !req.isAuthenticated() ? {} : {
            scopes: req.authInfo.token.scope.split(','),
            created_at: req.authInfo.token.created_at,
            expires_at: req.authInfo.token.expires_at
        };

        return res.json({
            version,
            authenticated: req.isAuthenticated(),
            ...extraForSpread
        });
    }
}

export default RootController;