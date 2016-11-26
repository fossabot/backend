import { Model } from 'objection';

import BaseModel from './BaseModel';

import { getSafeString } from '../utils';

class User extends BaseModel {
    static tableName = 'packs';

    static jsonSchema = {
        type: 'object',

        required: ['name'],

        properties: {
            id: {type: 'integer', minimum: 1},
            name: {type: 'string', minLength: 3, maxLength: 255},
            safe_name: {type: 'string', minLength: 3, maxLength: 255},
            description: {type: ['string', 'null'], minLength: 3, default: null},
            type: {type: 'string'},
            enabled: {type: 'boolean', default: true},
            created_at: {type: 'string', format: 'date-time'},
            updated_at: {type: ['string', 'null'], format: 'date-time', default: null},
            disabled_at: {type: ['string', 'null'], format: 'date-time', default: null}
        }
    };

    static relationMappings = {
        users: {
            relation: Model.ManyToManyRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'packs.id',
                through: {
                    from: 'pack_users.pack_id',
                    to: 'pack_users.user_id',
                    modelClass: `${__dirname}/pivots/PackUser`
                },
                to: 'users.id'
            }
        }
    };

    /**
     * Before inserting make sure we add in the packs safe name.
     *
     * @param {object} queryContext
     */
    $beforeInsert(queryContext) {
        super.$beforeInsert(queryContext);

        this.safe_name = getSafeString(this.name);
    }

    /**
     * Before updating make sure we add in the packs safe name.
     *
     * @param {object} queryContext
     */
    $beforeUpdate(queryContext) {
        super.$beforeUpdate(queryContext);

        this.safe_name = getSafeString(this.name);
    }

    /**
     * Transform the boolean fields into a boolean.
     *
     * @type {object}
     */
    static transforms = {
        enabled: (input) => (!!input)
    };
}

export default User;