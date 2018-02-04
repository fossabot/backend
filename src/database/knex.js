import knex from 'knex';
import { Model } from 'objection';

const environment = process.env.NODE_ENV || 'development';
const config = require('../../knexfile.js')[environment];

const knexInstance = knex(config);

Model.knex(knexInstance);

export default knexInstance;
