import { Model } from 'objection';

import BaseModel from '../BaseModel';

/**
 * This is the pivot table connecting permissions to roles.
 *
 * Roles can only have one of the same permission.
 *
 * @see Permission
 * @see Role
 * @extends BaseModel
 */
class RolePermission extends BaseModel {
    static tableName = 'role_permissions';

    static jsonSchema = {
        type: 'object',

        required: ['role_id', 'permission_id'],

        uniqueProperties: [['role_id', 'permission_id']],

        additionalProperties: false,

        properties: {
            id: {
                type: 'string',
                minLength: 36,
                maxLength: 36,
                pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
            },
            role_id: {
                type: 'string',
                minLength: 36,
                maxLength: 36,
                pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
            },
            permission_id: {
                type: 'string',
                minLength: 36,
                maxLength: 36,
                pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
            },
            created_at: {
                type: 'string',
                format: 'date-time',
            },
        },
    };

    static relationMappings = {
        role: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/../Role`,
            join: {
                from: 'role_permissions.role_id',
                to: 'roles.id',
            },
        },
        permission: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/../Permission`,
            join: {
                from: 'role_permissions.permission_id',
                to: 'permissions.id',
            },
        },
    };
}

export default RolePermission;
