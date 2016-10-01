import BaseController from '../BaseController';

import Role from '../../models/Role';

class RolesController extends BaseController {
    /**
     * This returns all the roles in the system.
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object}
     */
    static async index(req, res) {
        const roles = await Role.query();
        return res.json(roles);
    }
}

export default RolesController;