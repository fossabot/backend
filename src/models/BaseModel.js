import { Model } from 'objection';
import { format as dateFormat } from 'date-fns';

class BaseModel extends Model {
    /**
     * If we should update the created_at attribute when inserted and the updated_at attribute when updated.
     *
     * @type {boolean}
     */
    timestamps = true;

    /**
     * An object of attribute names with function values to transform attributes on the model if they exist.
     *
     * @type {object}
     */
    transforms = {};

    /**
     * Ran before inserting into the database.
     */
    $beforeInsert() {
        if (this.timestamps) {
            this.created_at = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
        }
    }

    /**
     * Ran before updating the database.
     */
    $beforeUpdate() {
        if (this.timestamps) {
            this.updated_at = dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss');
        }
    }

    /**
     * Ran after querying the database and transforming to the Model.
     *
     * @param {object} json
     * @returns {object}
     */
    $parseDatabaseJson(json) {
        json = super.$parseDatabaseJson.call(this, json);

        Object.keys(this.transforms).forEach((key) => {
            if (json.hasOwnProperty(key)) {
                json[key] = this.transforms[key](json[key]);
            }
        });

        return json;
    }
}

export default BaseModel;