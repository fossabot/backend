import { Model } from 'objection';

import BaseModel from '../BaseModel';

/**
 * PackUser's is a pivot table which connects User's and Pack's.
 *
 * PackUser's have 5 different permissions which allow addition of users to packs for certain tasks:
 *   - can_administrate: Can add and remove users from the pack as well as adjust permissions
 *   - can_create: Can create new versions
 *   - can_delete: Can delete versions
 *   - can_edit: Can edit versions
 *   - can_publish: Can publish versions
 *
 * @see ../Pack
 * @see ../User
 * @see ../../../db/migrations/20160924191541_pack_users.js
 * @extends ./BaseModel
 */
class PackUser extends BaseModel {
    static tableName = 'pack_users';

    static jsonSchema = {
        type: 'object',

        required: ['pack_id', 'user_id'],

        uniqueProperties: [['pack_id', 'user_id']],

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
            modelClass: `${__dirname}/../Pack`,
            join: {
                from: 'pack_users.pack_id',
                to: 'packs.id'
            }
        },
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/../User`,
            join: {
                from: 'pack_users.user_id',
                to: 'users.id'
            }
        }
    };
}

export default PackUser;