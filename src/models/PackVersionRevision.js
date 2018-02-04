import { Model } from 'objection';

import BaseModel from './BaseModel';

import { sha256 } from '../utils';

/**
 * A PackVersionRevision is a single revision of a PackVersion's JSON.
 *
 * When a new PackVersionRevision is made for a PackVersion, it must be verified before it can be used as the revision
 * to publish. This process is automatic.
 *
 * Each PackVersionRevision contains the JSON as well as a hash of that JSON.
 *
 * @see Pack
 * @see PackVersion
 * @extends BaseModel
 */
class PackVersionRevision extends BaseModel {
    static tableName = 'pack_version_revisions';

    static jsonAttributes = ['json'];

    static jsonSchema = {
        type: 'object',

        required: ['json'],

        uniqueProperties: [['pack_version_id', 'hash']],

        additionalProperties: false,

        properties: {
            id: {
                type: 'string',
                minLength: 36,
                maxLength: 36,
                pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
            },
            pack_version_id: {
                type: 'string',
                minLength: 36,
                maxLength: 36,
                pattern: '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
            },
            hash: {
                type: 'string',
                minLength: 64,
                maxLength: 64,
            },
            json: { type: 'string' },
            is_verified: {
                type: 'boolean',
                default: false,
            },
            is_verifying: {
                type: 'boolean',
                default: false,
            },
            created_at: {
                type: 'string',
                format: 'date-time',
            },
            verified_at: {
                type: ['string', 'null'],
                format: 'date-time',
                default: null,
            },
        },
    };

    static relationMappings = {
        packVersion: {
            relation: Model.HasOneRelation,
            modelClass: `${__dirname}/PackVersion`,
            join: {
                from: 'pack_version_revisions.pack_version_id',
                to: 'pack_versions.id',
            },
        },
    };

    /**
     * Transform the must_change_password field into a boolean.
     *
     * @type {object}
     */
    static transforms = {
        is_verified: (input) => !!input,
        is_verifying: (input) => !!input,
    };

    /**
     * Before inserting make sure we generate the hash.
     *
     * @param {object} queryContext
     */
    $beforeInsert(queryContext) {
        super.$beforeInsert(queryContext);

        this.hash = sha256(this.json);
    }

    /**
     * Before updating make sure we generate the hash.
     *
     * @param {ModelOptions} opt
     * @param {QueryBuilderContext} queryContext
     */
    $beforeUpdate(opt, queryContext) {
        super.$beforeUpdate(opt, queryContext);

        this.hash = sha256(this.json);
    }
}

export default PackVersionRevision;
