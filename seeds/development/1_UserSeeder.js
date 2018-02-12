const config = require('config');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
    // deletes ALL existing entries
    await knex('users').del();

    // inserts seed entries
    await knex('users').insert([
        {
            id: uuidv4(),
            username: 'admin',
            password: bcrypt.hashSync('password', config.get('bcryptRounds')),
            role: 'admin',
            email: 'admin@example.com',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            username: 'user',
            password: bcrypt.hashSync('password', config.get('bcryptRounds')),
            role: 'user',
            email: 'user@example.com',
            created_at: new Date().toJSON(),
        },
    ]);
};
