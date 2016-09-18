import bcrypt from 'bcryptjs';

import Model from './Model';

import { getConfig } from '../../config';

const config = getConfig();

class User extends Model {
    constructor() {
        super('users');
    }

    get hidden() {
        return [
            'password'
        ];
    }

    get timestamps() {
        return true;
    }

    get casts() {
        return {
            'must_change_password': 'boolean'
        };
    }

    get errorMessages() {
        return {
            'get.notFound': 'User not found.',
            'create.onlyOne': 'Only one user can be created using this method.'
        }
    };

    beforeCreate(attributes) {
        const password = bcrypt.hashSync(attributes.password, config.bcryptRounds);

        return {
            ...attributes,
            password
        };
    }
}

export default User;