exports.seed = function (knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('oauth_scopes').del(),

        // Inserts seed entries
        knex('oauth_scopes').insert([
            {
                name: 'self:read',
                description: 'Allow reading own user credentials.'
            },
            {
                name: 'self:write',
                description: 'Allow modifying own user credentials.'
            },
            {
                name: 'admin',
                description: 'Allow administration of the system.'
            },
        ])
    );
};