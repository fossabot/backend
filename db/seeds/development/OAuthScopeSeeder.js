exports.seed = function (knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('oauth_scopes').del(),

        // Inserts seed entries
        knex('oauth_scopes').insert([
            {
                name: 'self:read',
                description: 'Read own user credentials (except password).'
            },
            {
                name: 'self:write',
                description: 'Change own user credentials (including password).'
            },
            {
                name: 'users:read',
                description: 'Read other users credentials (except password) (requires admin role).'
            },
            {
                name: 'users:write',
                description: 'Change other users credentials (including password) (requires admin role).'
            }
        ])
    );
};