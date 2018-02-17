import uuidV4 from 'uuid/v4';
import _castArray from 'lodash/castArray';
import { Model, ValidationError } from 'objection';

/**
 * This BaseModel extends the objection.js Model and adds in some custom things including:
 *   - Adding automatic timestamps
 *   - Adding in transformable properties
 *   - Checking for uniqueness when updating/inserting
 *
 * @extends Model
 */
class BaseModel extends Model {
    /**
     * If we should update the created_at attribute when inserted and the updated_at attribute when updated.
     *
     * @type {boolean}
     */
    static timestamps = true;

    /**
     * If this model is immutable and shouldn't allow updating.
     *
     * @type {boolean}
     */
    static immutable = false;

    /**
     * An object of attribute names with function values to transform attributes on the model if they exist.
     *
     * @type {object}
     */
    static transforms = {};

    /**
     * Ran before inserting into the database.
     *
     * It will:
     *   - add an id if not already added and model doesn't have noAutoID field
     *   - add the created_at field if timestamps are enabled
     *   - check to make sure there are no duplicates values in the database as defined in the
     *     jsonSchema.uniqueProperties value
     *
     * @param {object} queryContext
     */
    async $beforeInsert(queryContext) {
        // always add in a UUID for id on insert unless the model doesn't have the column
        if (!this.constructor.noAutoID) {
            this.id = uuidV4();
        }

        // add in created_at timestamp unless the model doesn't use timestamps
        if (this.constructor.timestamps) {
            this.created_at = new Date().toJSON();
        }

        try {
            await this.getUniqueQuery(false, queryContext);
        } catch (e) {
            throw new ValidationError(e);
        }
    }

    /**
     * Ran before updating the database.
     *
     * It will:
     *   - throw an error if trying to update an immutable class
     *   - change the updated_at field if timestamps are enabled
     *   - check to make sure there are no duplicates values in the database as defined in the
     *     jsonSchema.uniqueProperties value
     *
     * @param {ModelOptions} opt
     */
    async $beforeUpdate(opt) {
        if (this.constructor.immutable) {
            throw new Error(`${this.constructor.name} is set as immutable so updates are not allowed.`);
        }

        if (this.constructor.timestamps) {
            this.updated_at = new Date().toJSON();
        }

        try {
            await this.getUniqueQuery(true, opt);
        } catch (e) {
            throw new ValidationError(e);
        }
    }

    /**
     * Ran after querying the database and transforming to the Model.
     *
     * @param {object} json
     * @returns {object}
     */
    $parseDatabaseJson(json) {
        // eslint-disable-next-line prefer-const
        let parsedJson = super.$parseDatabaseJson.call(this, json);

        Object.keys(this.constructor.transforms).forEach((key) => {
            if (parsedJson.hasOwnProperty(key)) {
                parsedJson[key] = this.constructor.transforms[key](parsedJson[key], parsedJson);
            }
        });

        return parsedJson;
    }

    /**
     * This will return a bunch of promises that will check the database for unique property clashes.
     *
     * @param {boolean} [update=false]
     * @param {object} [queryOptions={}]
     * @returns {Promise[]}
     */
    getUniqueQuery(update = false, queryOptions = {}) {
        const uniqueProperties = (this.constructor.jsonSchema && this.constructor.jsonSchema.uniqueProperties) || [];

        return Promise.all(
            uniqueProperties.map(
                (property) =>
                    new Promise((resolve, reject) => {
                        const whereConditions = {};

                        _castArray(property)
                            .filter((prop) => this[prop])
                            .forEach((prop) => {
                                whereConditions[prop] = this[prop];
                            });

                        const query = this.constructor
                            .query()
                            .select('id')
                            .where(whereConditions)
                            .first();

                        if (update) {
                            query.whereNot('id', queryOptions.old.id);
                        }

                        // eslint-disable-next-line promise/prefer-await-to-then
                        return query.then((row) => {
                            if (row) {
                                const errors = {};

                                _castArray(property).forEach((prop) => {
                                    errors[prop] = [
                                        {
                                            keyword: 'unique',
                                            message: `${prop} is already in use`,
                                        },
                                    ];
                                });

                                return reject(errors);
                            }

                            return resolve();
                        });
                    })
            )
        );
    }
}

export default BaseModel;
