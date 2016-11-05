import validate from 'validate.js';

import User from '../../models/User';

/**
 * This will register custom validations.
 */
export default function () {
    validate.validators.uniqueUsername = function (value) {
        return new validate.Promise(async function (resolve, reject) {
            if (!value) {
                // we resolve this as passed since it will be catched by other validators anyway
                return resolve();
            }

            try {
                const user = await User.query().where({username: value});

                if (user.length) {
                    return resolve('is already taken');
                }
            } catch (e) {
                return reject(e);
            }

            return resolve();
        });
    };

    validate.validators.uniqueEmail = function (value) {
        return new validate.Promise(async function (resolve, reject) {
            if (!value) {
                // we resolve this as passed since it will be catched by other validators anyway
                return resolve();
            }

            try {
                const user = await User.query().where({email: value});

                if (user.length) {
                    return resolve('is already taken');
                }
            } catch (e) {
                return reject(e);
            }

            return resolve();
        });
    };

    validate.validators.userExistsById = function (value) {
        return new validate.Promise(async function (resolve, reject) {
            if (!value) {
                // we resolve this as passed since it will be catched by other validators anyway
                return resolve();
            }

            try {
                const user = await User.query().findById(value);

                if (!user) {
                    return resolve('doesn\'t exist');
                }
            } catch (e) {
                return reject(e);
            }

            return resolve();
        });
    };
}