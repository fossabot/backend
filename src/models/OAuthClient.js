import User from './User';
import { Model } from 'objection';
import BaseModel from './BaseModel';

class OAuthClient extends BaseModel {
    static tableName = 'oauth_clients';

    static jsonSchema = {
        type: 'object',

        required: ['name', 'client_id', 'client_secret', 'refresh_token', 'expires_at'],

        properties: {
            id: {type: 'integer'},
            name: {type: 'string'},
            user_id: {type: ['integer', 'null'], minimum: 1, default: null},
            client_id: {type: 'string'},
            client_secret: {type: 'string'},
            created_at: {type: ['string', 'null'], format: 'date-time', default: null},
            updated_at: {type: ['string', 'null'], format: 'date-time', default: null}
        }
    };

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'oauth_clients.client_id',
                to: 'users.id'
            }
        }
    };
}

export default OAuthClient;