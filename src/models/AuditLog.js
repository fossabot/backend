import { Model } from 'objection';

import BaseModel from './BaseModel';

/**
 * AuditLog tracks all actions performed by users for use in auditing.
 *
 * @extends BaseModel
 */
class AuditLog extends BaseModel {
    static tableName = 'audit_logs';

    static jsonAttributes = ['extra'];

    static jsonSchema = {
        type: 'object',

        required: ['user_id', 'action'],

        additionalProperties: false,

        immutable: true,

        properties: {
            id: {
                type: 'string',
                minLength: 36,
                maxLength: 36,
                pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
            },
            user_id: {
                type: 'string',
                minLength: 36,
                maxLength: 36,
                pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
            },
            action: {
                type: 'string',
                maxLength: 255,
            },
            extra: {
                type: ['string', 'null'],
                default: null,
            },
            created_at: {
                type: 'string',
                format: 'date-time',
            },
        },
    };

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'audit_logs.user_id',
                to: 'user.id',
            },
        },
    };
}

export default AuditLog;
