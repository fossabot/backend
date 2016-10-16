import { Model } from 'objection';
import BaseModel from './BaseModel';

class OAuthClient extends BaseModel {
    static tableName = 'oauth_clients';

    static jsonSchema = {
        type: 'object',

        required: ['name', 'user_id', 'client_id', 'client_secret', 'redirect_uri'],

        properties: {
            id: {type: 'integer'},
            name: {type: 'string'},
            user_id: {type: ['integer', 'null'], minimum: 1, default: null},
            client_id: {type: 'string'},
            client_secret: {type: 'string'},
            redirect_uri: {type: 'string'},
            revoked: {type: 'boolean', default: false},
            created_at: {type: ['string', 'null'], format: 'date-time', default: null},
            updated_at: {type: ['string', 'null'], format: 'date-time', default: null}
        }
    };

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: `${__dirname}/User`,
            join: {
                from: 'oauth_clients.client_id',
                to: 'users.id'
            }
        }
    };

    /**
     * Transform the revoked field into a boolean.
     *
     * @type {object}
     */
    static transforms = {
        revoked: (input) => (!!input)
    };
}

export default OAuthClient;