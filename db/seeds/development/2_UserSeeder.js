const config = require('config');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');

exports.seed = async function (knex) {
    async function getRoleID(name) {
        const result = await knex('roles')
            .select('id')
            .where('name', name)
            .first();

        return result.id;
    }

    async function getUserID(username) {
        const result = await knex('users')
            .select('id')
            .where('username', username)
            .first();

        return result.id;
    }

    // deletes ALL existing entries
    await knex('users').del();
    await knex('user_roles').del();
    await knex('oauth_clients').del();

    // inserts seed entries
    await knex('users').insert([
        {
            id: uuidv4(),
            username: 'admin',
            password: bcrypt.hashSync('password', config.get('bcryptRounds')),
            email: 'admin@example.com',
            verification_code: 'testing',
            created_at: new Date().toJSON(),
        },
    ]);

    await knex('user_roles').insert({
        id: uuidv4(),
        role_id: await getRoleID('admin'),
        user_id: await getUserID('admin'),
        created_at: new Date().toJSON(),
    });

    await knex('oauth_clients').insert([
        {
            id: uuidv4(),
            name: 'Test',
            user_id: await getUserID('admin'),
            client_id: 'test',
            client_secret: 'test',
            redirect_uri: 'http://127.0.0.1:3000/oauth',
        },
        {
            id: uuidv4(),
            name: 'Postman',
            user_id: await getUserID('admin'),
            client_id: 'postman',
            client_secret: 'postman',
            redirect_uri: 'https://www.getpostman.com/oauth2/callback',
        },
    ]);
};
