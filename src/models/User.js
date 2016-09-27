import bcrypt from 'bcryptjs';

import BaseModel from './BaseModel';
import { getConfig } from '../../config';

const config = getConfig();

class User extends BaseModel {
    static tableName = 'users';

    static jsonSchema = {
        type: 'object',

        required: ['username', 'email', 'password'],

        properties: {
            id: {type: 'integer'},
            username: {type: 'string', minLength: 3, maxLength: 64},
            email: {type: 'string', minLength: 1, maxLength: 255, format: 'email'},
            password: {type: 'string', minLength: 1, maxLength: 255},
            must_change_password: {type: 'boolean', default: false},
            created_at: {type: ['string', 'null'], format: 'date-time', default: null},
            updated_at: {type: ['string', 'null'], format: 'date-time', default: null}
        }
    };

    /**
     * Transform the must_change_password field into a boolean.
     *
     * @type {object}
     */
    static transforms = {
        must_change_password: (input) => (!!input)
    };

    /**
     * Before inserting make sure we hash the password if provided.
     *
     * @param {object} queryContext
     */
    $beforeInsert(queryContext) {
        super.$beforeInsert(queryContext);

        if (this.hasOwnProperty('password')) {
            this.password = bcrypt.hashSync(this.password, config.bcryptRounds);
        }
    }

    /**
     * Before updating make sure we hash the password if provided.
     *
     * @param {object} queryContext
     */
    $beforeUpdate(queryContext) {
        super.$beforeUpdate(queryContext);

        if (this.hasOwnProperty('password')) {
            this.password = bcrypt.hashSync(this.password, config.bcryptRounds);
        }
    }
}

export default User;