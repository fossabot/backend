const dateFormat = require('date-fns/format');

exports.seed = function (knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('roles').del(),
        knex('user_roles').del(),

        // Inserts seed entries
        knex('roles').insert({
            name: 'admin',
            description: 'Can administer the system.',
            created_by: 1,
            created_at: dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
        }),
        knex('user_roles').insert({
            role_id: 1,
            user_id: 1,
            created_by: 1,
            created_at: dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
        })
    );
};