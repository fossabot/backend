import User from './User';
import { Model } from 'objection';
import BaseModel from './BaseModel';
import OAuthClient from './OAuthClient';

class OAuthAuthorizationCode extends BaseModel {
    static tableName = 'oauth_authorization_codes';

    static jsonSchema = {
        type: 'object',

        required: ['user_id', 'client_id', 'authorization_code', 'redirect_uri', 'expires_at'],

        properties: {
            id: {type: 'integer'},
            user_id: {type: 'integer', minimum: 1},
            client_id: {type: 'integer', minimum: 1},
            authorization_code: {type: 'string'},
            redirect_uri: {type: 'string'},
            created_at: {type: ['string', 'null'], format: 'date-time', default: null},
            updated_at: {type: ['string', 'null'], format: 'date-time', default: null},
            expires_at: {type: ['string', 'null'], format: 'date-time', default: null}
        }
    };

    static relationMappings = {
        client: {
            relation: Model.BelongsToOneRelation,
            modelClass: OAuthClient,
            join: {
                from: 'oauth_authorization_codes.user_id',
                to: 'oauth_clients.id'
            }
        },
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'oauth_authorization_codes.client_id',
                to: 'users.id'
            }
        }
    };
}

export default OAuthAuthorizationCode;