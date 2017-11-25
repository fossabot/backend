import { Model } from 'objection';
import BaseModel from './BaseModel';

/**
 * A Permission is a single permission in the system, such as creating packs
 *
 * Permissions must have unique name.
 *
 * Name should be in dot notation such as:
 *
 * packs.versions.delete
 *
 * @extends BaseModel
 */
class Permission extends BaseModel {
    static tableName = 'permissions';

    static jsonSchema = {
        type: 'object',

        required: ['name', 'description'],

        uniqueProperties: ['name'],

        additionalProperties: false,

        properties: {
            id: {
                type: 'string',
                minLength: 36,
                maxLength: 36,
                pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
            },
            name: {
                type: 'string',
                minLength: 3,
                maxLength: 255,
            },
            display_name: {
                type: ['string', 'null'],
                minLength: 3,
                maxLength: 255,
                default: null,
            },
            description: { type: 'string' },
            created_at: {
                type: 'string',
                format: 'date-time',
            },
            updated_at: {
                type: ['string', 'null'],
                format: 'date-time',
                default: null,
            },
        },
    };

    static relationMappings = {
        roles: {
            relation: Model.ManyToManyRelation,
            modelClass: `${__dirname}/Role`,
            join: {
                from: 'permissions.id',
                through: {
                    from: 'role_permissions.permission_id',
                    to: 'role_permissions.role_id',
                    modelClass: `${__dirname}/pivots/RolePermission`,
                },
                to: 'roles.id',
            },
        },
    };

    /**
     * Transform the display_name field to have default of name.
     *
     * @type {object}
     */
    static transforms = {
        display_name: (input, properties) => {
            return input || properties.name;
        },
    };
}

export default Permission;
