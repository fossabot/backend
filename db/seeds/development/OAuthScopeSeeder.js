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
                name: 'admin:read',
                description: 'Read all system information (requires admin role).'
            },
            {
                name: 'admin:write',
                description: 'Change all system information (requires admin role).'
            }
        ])
    );
};