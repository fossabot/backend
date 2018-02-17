import config from 'config';
import bcrypt from 'bcryptjs';
import { Model } from 'objection';

import Pack from './Pack';
import AuditLog from './AuditLog';
import BaseModel from './BaseModel';
import PackUser from './pivots/PackUser';

import { generateUID } from '../utils';

/**
 * A User represents someone who has signed up for an ATLauncher account. An ATLauncher account is not required to
 * download/install/play packs, but is required to make packs and play some private packs.
 *
 * When users sign up, they will get an email with a link they must click in order to confirm their account and login.
 *
 * @extends BaseModel
 */
class User extends BaseModel {
    static tableName = 'users';

    static pickJsonSchemaProperties = true;

    static jsonSchema = {
        type: 'object',

        required: ['username', 'email', 'password'],

        uniqueProperties: ['username', 'email'],

        additionalProperties: false,

        properties: {
            id: {
                type: 'string',
                minLength: 36,
                maxLength: 36,
                pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
            },
            username: {
                type: 'string',
                minLength: 3,
                maxLength: 64,
                pattern: '^[A-Za-z0-9-_]+$',
            },
            password: {
                type: 'string',
                maxLength: 60,
            },
            email: {
                type: 'string',
                format: 'email',
            },
            must_change_password: {
                type: 'boolean',
                default: false,
            },
            is_banned: {
                type: 'boolean',
                default: false,
            },
            ban_reason: {
                type: ['string', 'null'],
                default: null,
            },
            tfa_secret: {
                type: ['string', 'null'],
                minLength: 32,
                maxLength: 32,
                default: null,
            },
            is_verified: {
                type: 'boolean',
                default: false,
            },
            verification_code: {
                type: ['string', 'null'],
                minLength: 128,
                maxLength: 128,
                default: null,
            },
            password_reset_code: {
                type: ['string', 'null'],
                minLength: 128,
                maxLength: 128,
                default: null,
            },
            created_at: {
                type: 'string',
                format: 'date-time',
            },
            updated_at: {
                type: ['string', 'null'],
                format: 'date-time',
                default: null,
            },
            verified_at: {
                type: ['string', 'null'],
                format: 'date-time',
                default: null,
            },
            password_reset_sent_at: {
                type: ['string', 'null'],
                format: 'date-time',
                default: null,
            },
            password_last_changed_at: {
                type: ['string', 'null'],
                format: 'date-time',
                default: null,
            },
            banned_at: {
                type: ['string', 'null'],
                format: 'date-time',
                default: null,
            },
        },
    };

    static relationMappings = {
        auditLogs: {
            relation: Model.HasManyRelation,
            modelClass: AuditLog,
            join: {
                from: 'users.id',
                to: 'audit_logs.user_id',
            },
        },
        packs: {
            relation: Model.ManyToManyRelation,
            modelClass: Pack,
            join: {
                from: 'users.id',
                through: {
                    from: 'pack_users.user_id',
                    to: 'pack_users.pack_id',
                    modelClass: PackUser,
                    extra: ['can_administrate', 'can_create', 'can_delete', 'can_edit', 'can_publish'],
                },
                to: 'packs.id',
            },
        },
    };

    /**
     * Transform the must_change_password field into a boolean.
     *
     * @type {object}
     */
    static transforms = {
        is_banned: (input) => !!input,
        is_verified: (input) => !!input,
        must_change_password: (input) => !!input,
    };

    /**
     * Before inserting make sure we hash the password if provided and also add in a verification code.
     *
     * @param {object} queryContext
     */
    async $beforeInsert(queryContext) {
        if (this.hasOwnProperty('password')) {
            this.password = bcrypt.hashSync(this.password, config.get('bcryptRounds'));
        }

        if (!this.hasOwnProperty('verification_code')) {
            this.verification_code = generateUID(128);
        }

        await super.$beforeInsert(queryContext);
    }

    /**
     * Before updating make sure we hash the password if provided.
     *
     * @param {ModelOptions} opt
     * @param {QueryBuilderContext} queryContext
     */
    async $beforeUpdate(opt, queryContext) {
        if (this.hasOwnProperty('password')) {
            this.password = bcrypt.hashSync(this.password, config.get('bcryptRounds'));
        }

        await super.$beforeUpdate(opt, queryContext);
    }

    /**
     * This will attempt to verify the passed in password to see if it matches the users password or not.
     *
     * @param {string} password
     * @returns {boolean}
     */
    verifyPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

export default User;
