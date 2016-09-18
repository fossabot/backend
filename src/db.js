import knex from 'knex';
import { getConfig } from '../config';

export default callback => {
    const config = getConfig();
    const db = knex(config);

    callback(db);
}
