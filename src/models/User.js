const bcrypt = require('bcryptjs');

const BaseModel = require('./BaseModel');

module.exports = class User extends BaseModel {
    static get tableName() {
        return 'users';
    }

    static get jsonSchema() {
        return {
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
                email: {
                    type: 'string',
                    format: 'email',
                },
                password: {
                    type: 'string',
                    maxLength: 60,
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
                tfa_secret: {
                    type: ['string', 'null'],
                    minLength: 32,
                    maxLength: 32,
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
                banned_at: {
                    type: ['string', 'null'],
                    format: 'date-time',
                    default: null,
                },
                verified_at: {
                    type: ['string', 'null'],
                    format: 'date-time',
                    default: null,
                },
            },
        };
    }

    /**
     * Transform the must_change_password field into a boolean.
     *
     * @type {object}
     */
    static get transforms() {
        return {
            is_banned: (input) => !!input,
            is_verified: (input) => !!input,
            must_change_password: (input) => !!input,
        };
    }

    /**
     * Before inserting make sure we hash the password if provided and also add in a verification code.
     *
     * @param {object} queryContext
     * @returns {*}
     */
    $beforeInsert(queryContext) {
        if (this.hasOwnProperty('password')) {
            this.password = bcrypt.hashSync(this.password, 10);
        }

        if (!this.hasOwnProperty('verification_code')) {
            this.verification_code = '123';
        }

        return super.$beforeInsert(queryContext);
    }

    /**
     * Before updating make sure we hash the password if provided.
     *
     * @param {ModelOptions} opt
     * @param {QueryBuilderContext} queryContext
     */
    $beforeUpdate(opt, queryContext) {
        super.$beforeUpdate(opt, queryContext);

        if (this.hasOwnProperty('password')) {
            this.password = bcrypt.hashSync(this.password, 10);
        }
    }
};
