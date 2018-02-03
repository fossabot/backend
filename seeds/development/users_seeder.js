const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');

exports.seed = function (knex, Promise) {
    // deletes ALL existing entries
    return knex('users')
        .del()
        .then(function () {
            // inserts seed entries
            return knex('users').insert([
                {
                    id: uuidv4(),
                    username: 'user1',
                    password: bcrypt.hashSync('password', 10),
                    email: 'user1@example.com',
                    verification_code: 'testing',
                    created_at: new Date().toJSON(),
                },
                {
                    id: uuidv4(),
                    username: 'user2',
                    password: bcrypt.hashSync('password', 10),
                    email: 'user2@example.com',
                    verification_code: 'testing',
                    created_at: new Date().toJSON(),
                },
                {
                    id: uuidv4(),
                    username: 'user3',
                    password: bcrypt.hashSync('password', 10),
                    email: 'user3@example.com',
                    verification_code: 'testing',
                    created_at: new Date().toJSON(),
                },
                {
                    id: uuidv4(),
                    username: 'user4',
                    password: bcrypt.hashSync('password', 10),
                    email: 'user4@example.com',
                    verification_code: 'testing',
                    created_at: new Date().toJSON(),
                },
                {
                    id: uuidv4(),
                    username: 'user5',
                    password: bcrypt.hashSync('password', 10),
                    email: 'user5@example.com',
                    verification_code: 'testing',
                    created_at: new Date().toJSON(),
                },
                {
                    id: uuidv4(),
                    username: 'user6',
                    password: bcrypt.hashSync('password', 10),
                    email: 'user6@example.com',
                    verification_code: 'testing',
                    created_at: new Date().toJSON(),
                },
                {
                    id: uuidv4(),
                    username: 'user7',
                    password: bcrypt.hashSync('password', 10),
                    email: 'user7@example.com',
                    verification_code: 'testing',
                    created_at: new Date().toJSON(),
                },
                {
                    id: uuidv4(),
                    username: 'user8',
                    password: bcrypt.hashSync('password', 10),
                    email: 'user8@example.com',
                    verification_code: 'testing',
                    created_at: new Date().toJSON(),
                },
                {
                    id: uuidv4(),
                    username: 'user9',
                    password: bcrypt.hashSync('password', 10),
                    email: 'user9@example.com',
                    verification_code: 'testing',
                    created_at: new Date().toJSON(),
                },
                {
                    id: uuidv4(),
                    username: 'user10',
                    password: bcrypt.hashSync('password', 10),
                    email: 'user10@example.com',
                    verification_code: 'testing',
                    created_at: new Date().toJSON(),
                },
            ]);
        });
};
