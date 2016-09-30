import BaseController from '../../BaseController';

import { version } from '../../../../package.json';

import Role from '../../../models/Role';
import OAuthScope from '../../../models/OAuthScope';

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
    root(req, res) {
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

    /**
     * This returns all the roles in the system.
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object}
     */
    async roles(req, res) {
        const roles = await Role.query();
        return res.json(roles);
    }

    /**
     * This returns all the scopes for the OAuth system.
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object}
     */
    async scopes(req, res) {
        const scopes = await OAuthScope.query();
        return res.json(scopes);
    }
}

export default RootController;