import BaseController from '../../BaseController';

import { version } from '../../../../package.json';

import Role from '../../../models/Role';

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

    /**
     * This returns the current version of the api as defined in the package.json.
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object}
     */
    async roles(req, res) {
        const roles = await Role.query();
        return res.json(roles);
    }
}

export default RootController;