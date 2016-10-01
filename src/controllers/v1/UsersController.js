import BaseController from '../BaseController';

import User from '../../models/User';

class ScopesController extends BaseController {
    /**
     * This returns all the users for the system.
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object}
     */
    static async index(req, res) {
        const users = await User.query();
        return res.json(users);
    }

    /**
     * This creates a new user in the system.
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object}
     */
    static async post(req, res) {
        const users = await User.query();
        return res.json(users);
    }

    /**
     * This changes the details for a user in the system.
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object}
     */
    static async put(req, res) {
        const users = await User.query();
        return res.json(users);
    }

    /**
     * THis deleted a user in the system.
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object}
     */
    static async delete(req, res) {
        const users = await User.query();
        return res.json(users);
    }
}

export default ScopesController;