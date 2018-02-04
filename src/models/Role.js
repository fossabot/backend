import { Model } from 'objection';
import BaseModel from './BaseModel';

import Permission from './Permission';
import RolePermission from './pivots/RolePermission';

/**
 * A Role is a way to group users into one or more (even none) roles to allow restricting certain actions to certain
 * roles.
 *
 * Roles must have unique name.
 *
 * @extends BaseModel
 */
class Role extends BaseModel {
    static tableName = 'roles';

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
        users: {
            relation: Model.ManyToManyRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'roles.id',
                through: {
                    from: 'user_roles.role_id',
                    to: 'user_roles.user_id',
                    modelClass: `${__dirname}/pivots/UserRole`,
                },
                to: 'users.id',
            },
        },
        permissions: {
            relation: Model.ManyToManyRelation,
            modelClass: Permission,
            join: {
                from: 'roles.id',
                through: {
                    from: 'role_permissions.role_id',
                    to: 'role_permissions.permission_id',
                    modelClass: RolePermission,
                },
                to: 'permissions.id',
            },
        },
    };

    /**
     * Transform the display_name field to have default of name.
     *
     * @type {object}
     */
    static transforms = {
        display_name: (input, properties) => input || properties.name,
    };

    /**
     * Checks to see if this role has the provided permission or not.
     *
     * @param {string} permission
     * @returns {boolean}
     */
    hasPermission(permission) {
        if (!this.permissions) {
            return false;
        }

        const validPermissions = this.permissions.filter(({ name }) => name === permission);

        return validPermissions.length;
    }
}

export default Role;
