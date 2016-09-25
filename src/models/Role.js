import User from './User';
import { Model } from 'objection';
import BaseModel from './BaseModel';

class Role extends BaseModel {
    static tableName = 'roles';

    static jsonSchema = {
        type: 'object',

        required: ['name', 'description'],

        properties: {
            id: {type: 'integer'},
            name: {type: 'string', minLength: 3, maxLength: 255},
            description: {type: 'string'},
            created_by: {type: 'integer', minimum: 1},
            created_at: {type: ['string', 'null'], format: 'date-time', default: null},
            updated_at: {type: ['string', 'null'], format: 'date-time', default: null}
        }
    };

    static relationMappings = {
        creator: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'roles.created_by',
                to: 'users.id'
            }
        },
        users: {
            relation: Model.ManyToManyRelation,
            modelClass: User,
            join: {
                from: 'roles.id',
                through: {
                    from: 'user_roles.role_id',
                    to: 'user_roles.user_id'
                },
                to: 'users.id'
            }
        }
    };
}

export default Role;