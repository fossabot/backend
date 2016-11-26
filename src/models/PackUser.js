import { Model } from 'objection';

import BaseModel from './BaseModel';

class PackUser extends BaseModel {
    static tableName = 'pack_users';

    static jsonSchema = {
        type: 'object',

        required: ['pack_id', 'user_id'],

        properties: {
            id: {type: 'integer', minimum: 1},
            pack_id: {type: 'integer', minimum: 1},
            user_id: {type: 'integer', minimum: 1},
            can_administrate: {type: 'boolean', default: true},
            can_create: {type: 'boolean', default: true},
            can_delete: {type: 'boolean', default: true},
            can_edit: {type: 'boolean', default: true},
            can_publish: {type: 'boolean', default: true},
            created_at: {type: 'string', format: 'date-time'},
            updated_at: {type: ['string', 'null'], format: 'date-time', default: null}
        }
    };

    static relationMappings = {
        pack: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/Pack`,
            join: {
                from: 'pack_users.pack_id',
                to: 'packs.id'
            }
        },
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'pack_users.user_id',
                to: 'users.id'
            }
        }
    };
}

export default PackUser;