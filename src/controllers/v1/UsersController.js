import * as httpStatusCode from 'http-status';

import User from '../../models/User';
import APIError from '../../errors/APIError';
import BaseController from '../BaseController';

import cache from '../../cache';

class ScopesController extends BaseController {
    /**
     * This returns all the users for the system.
     *
     * @param {object} req
     * @param {object} res
     * @returns {object}
     */
    static async index(req, res) {
        const users = await User.query();

        return res.json(users);
    }

    /**
     * This returns a single user in the system.
     *
     * @param {object} req
     * @param {object} res
     * @param {function} next
     * @returns {object}
     */
    static async get(req, res, next) {
        req.checkParams('user_id', 'Invalid user_id').isInt({min: 1});

        const errors = req.validationErrors();

        if (errors) {
            return next(new APIError(errors, httpStatusCode.BAD_REQUEST));
        }

        const userId = req.params.user_id;

        const user = await cache.wrap(`/v1/users/${userId}`, () => (User.query().findById(userId)));

        if (!user) {
            return next(new APIError(`User with ID of ${userId} not found.`, httpStatusCode.NOT_FOUND));
        }

        return res.json(user.$omit('password'));
    }

    /**
     * This creates a new user in the system.
     *
     * @param {object} req
     * @param {object} res
     * @returns {object}
     */
    static async post(req, res) {
        const users = await User.query();
        return res.json(users);
    }

    /**
     * This changes the details for a user in the system.
     *
     * @param {object} req
     * @param {object} res
     * @returns {object}
     */
    static async put(req, res) {
        const users = await User.query();
        return res.json(users);
    }

    /**
     * THis deleted a user in the system.
     *
     * @param {object} req
     * @param {object} res
     * @returns {object}
     */
    static async delete(req, res) {
        const users = await User.query();
        return res.json(users);
    }
}

export default ScopesController;