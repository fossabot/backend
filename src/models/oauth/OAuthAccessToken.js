import { Model } from 'objection';
import BaseModel from '../BaseModel';

class OAuthAccessToken extends BaseModel {
    static tableName = 'oauth_access_tokens';

    static jsonSchema = {
        type: 'object',

        required: ['user_id', 'client_id', 'access_token', 'scope', 'expires_at'],

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
            client_id: {
                type: 'string',
                minLength: 36,
                maxLength: 36,
                pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
            },
            access_token: {
                type: 'string',
                minLength: 60,
                maxLength: 60,
            },
            scope: { type: 'string' },
            revoked: {
                type: 'boolean',
                default: false,
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
            expires_at: {
                type: 'string',
                format: 'date-time',
            },
        },
    };

    static relationMappings = {
        client: {
            relation: Model.HasOneRelation,
            modelClass: `${__dirname}/OAuthClient`,
            join: {
                from: 'oauth_access_tokens.user_id',
                to: 'oauth_clients.id',
            },
        },
        refresh_token: {
            relation: Model.HasOneRelation,
            modelClass: `${__dirname}/OAuthRefreshToken`,
            join: {
                from: 'oauth_access_tokens.id',
                to: 'oauth_refresh_tokens.refresh_token_id',
            },
        },
        user: {
            relation: Model.HasOneRelation,
            modelClass: `${__dirname}/../User`,
            join: {
                from: 'oauth_access_tokens.user_id',
                to: 'users.id',
            },
        },
    };

    /**
     * Transform the revoked field into a boolean.
     *
     * @type {object}
     */
    static transforms = {
        revoked: (input) => {
            return !!input;
        },
        scope: (input) => {
            return input.split(',');
        },
    };

    /**
     * Ran when creating model from Json.
     *
     * @param {object} json
     * @param {object} opt
     * @returns {object}
     */
    $parseJson(json, opt) {
        // eslint-disable-next-line prefer-const
        let updatedJson = super.$parseJson(json, opt);

        if (typeof updatedJson.expires_at !== 'string' && typeof updatedJson.expires_at.toJSON === 'function') {
            updatedJson.expires_at = updatedJson.expires_at.toJSON();
        }

        return updatedJson;
    }

    /**
     * Checks to see if this access token has the provided scope or not.
     *
     * @param {string} scope
     * @returns {boolean}
     */
    hasScope(scope) {
        if (!this.scope || !this.scope.length) {
            return false;
        }

        const validScopes = this.scope.filter((name) => {
            return name === scope;
        });

        return validScopes.length;
    }
}

export default OAuthAccessToken;
