import { format as dateFormat }  from 'date-fns';

import knex from '../../db';

class BaseModel {
    /**
     * Sets up the table name and the knex DB connector.
     *
     * @param table
     */
    constructor(table) {
        this.table = table;
    }

    get knex() {
        return knex(this.table);
    }

    /**
     * If we should automatically update timestamps (created_at, updated_at) when appropriate.
     *
     * @returns {boolean}
     */
    get timestamps() {
        return false;
    }

    /**
     * An array of attribute names that should be hidden when returning a model.
     *
     * @returns {Array}
     */
    get hidden() {
        return [];
    }

    /**
     * An object of attributes to cast.
     *
     * @returns {Object}
     */
    get casts() {
        return {};
    }

    /**
     * A list of error messages which are returned from these methods.
     *
     * @returns {Object}
     */
    get errorMessages() {
        return {
            'get.notFound': 'Not found.',
            'create.onlyOne': 'Only one model can be created using this method.'
        };
    }

    /**
     * This function is run before inserting the data into the database.
     *
     * Useful for overriding any attributes you may need to such as hashing a password.
     *
     * @param {Object} attributes
     * @returns {Object}
     */
    beforeCreate(attributes) {
        return attributes;
    }

    /**
     * This will cast any set values in the casts attribute to the specified type.
     *
     * @param {Object} input
     * @returns {Object}
     */
    cast(input) {
        let returnValue = {...input};

        Object.keys(returnValue).forEach((key) => {
            if (this.casts.hasOwnProperty(key)) {
                const cast = this.casts[key];

                switch (cast) {
                    case 'boolean':
                        returnValue[key] = !!returnValue[key];
                        break;
                }
            }
        });

        return returnValue;
    }

    /**
     * This will remove any specified hidden fields from the object passed in.
     *
     * @param {Object} input
     * @returns {Object}
     */
    removeHiddenFields(input) {
        let returnValue = {...input};

        Object.keys(returnValue).forEach((key) => {
            if (this.hidden.indexOf(key) !== -1) {
                delete returnValue[key];
            }
        });

        return returnValue;
    }

    /**
     * This is a base function for creating a model with the given attributes.
     *
     * Should be overwritten on a Model by Model basis depending on needs.
     *
     * @param {Object} attributes
     * @returns {Promise}
     */
    create(attributes) {
        return new Promise((resolve, reject) => {
            if (Array.isArray(attributes)) {
                reject(new Error(this.errorMessages['create.onlyOne']));
            }

            let insertObj = {...attributes};

            insertObj = this.beforeCreate(insertObj);

            if (this.timestamps) {
                insertObj['created_at'] = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
            }

            this.knex
                .insert(insertObj)
                .then((ids) => {
                    resolve(this.get(ids[0]));
                })
                .catch(reject);
        });
    }

    /**
     * This is a base function for getting a model based on a given id.
     *
     * Should be overwritten on a Model by Model basis depending on needs.
     *
     * @param {Number} id
     * @returns {Promise}
     */
    get(id) {
        return new Promise((resolve, reject) => {
            this.knex
                .first()
                .where({id})
                .then((model) => {
                    if (typeof model === 'undefined') {
                        reject(new Error(this.errorMessages['get.notFound']));
                    }

                    model = this.removeHiddenFields(model);
                    model = this.cast(model);

                    resolve(model);
                })
                .catch(reject);
        });
    }
}

export default BaseModel;