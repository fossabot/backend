import BaseController from './BaseController';

/**
 * The RootController controls the routes for the root of the API.
 */
class RootController extends BaseController {
    /**
     * This returns the current version of the api as defined in the package.json as well as authentication information.
     *
     * @param {object} req
     * @param {object} res
     * @returns {object}
     */
    static index(req, res) {
        const extraForSpread = !req.isAuthenticated() ?
            {} :
            {
                token: {
                    scopes: req.authInfo.token.scope,
                    created_at: req.authInfo.token.created_at,
                    expires_at: req.authInfo.token.expires_at,
                },
                user: req.user,
            };

        return res.json({
            version: req.version,
            authenticated: req.isAuthenticated(),
            ...extraForSpread,
        });
    }
}

export default RootController;
