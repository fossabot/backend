import BaseController from '../../BaseController';

import { version } from '../../../../package.json';

/**
 * The RootController controls the routes for the root of the API.
 */
class RootController extends BaseController {
    /**
     * This returns the current version of the api as defined in the package.json.
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object}
     */
    root(req, res) {
        return res.json({version});
    }
}

export default RootController;