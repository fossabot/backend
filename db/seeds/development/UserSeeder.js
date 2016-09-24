const bcrypt = require('bcryptjs');
const dateFormat = require('date-fns/format');

const getConfig = require('../../../config').getConfig;

const config = getConfig();

exports.seed = function (knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('users').del(),

        // Inserts seed entries
        knex('users').insert({
            username: 'admin',
            password: bcrypt.hashSync('password', config.bcryptRounds),
            email: 'test@example.com',
            must_change_password: 0,
            created_at: dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
        })
    );
};