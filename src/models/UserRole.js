import bcrypt from 'bcryptjs';
import { Model } from 'objection';

import BaseModel from './BaseModel';
import { getConfig } from '../../config';

const config = getConfig();

class UserRole extends BaseModel {
    static tableName = 'user_roles';

    static jsonSchema = {
        type: 'object',

        required: ['role_id', 'user_id'],

        properties: {
            id: {type: 'integer', minimum: 1},
            role_id: {type: 'integer', minimum: 1},
            user_id: {type: 'integer', minimum: 1},
            created_at: {type: 'string', format: 'date-time'}
        }
    };

    static relationMappings = {
        role: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/Role`,
            join: {
                from: 'user_roles.role_id',
                to: 'roles.id'
            }
        },
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'user_roles.user_id',
                to: 'users.id'
            }
        }
    };
}

export default UserRole;