exports.seed = async function (knex) {
    // deletes ALL existing entries
    await knex('oauth_scopes').del();

    // inserts seed entries
    await knex('oauth_scopes').insert([
        {
            name: 'self:read',
            description: 'Read access to own user information.',
        },
        {
            name: 'self:write',
            description: 'Write access to own user information).',
        },
        {
            name: 'admin:read',
            description: 'Read access to admin functions.',
        },
        {
            name: 'admin:write',
            description: 'Write access to admin functions.',
        },
        {
            name: 'packs:create',
            description: 'Access to create a pack.',
        },
        {
            name: 'packs:read',
            description: 'Read access to pack information.',
        },
        {
            name: 'packs:write',
            description: 'Write access to pack information.',
        },
        {
            name: 'packs:files:read',
            description: 'Read access to pack files.',
        },
        {
            name: 'packs:files:write',
            description: 'Write access to pack files.',
        },
        {
            name: 'packs:logs:read',
            description: 'Read access to pack logs.',
        },
        {
            name: 'packs:stats:write',
            description: 'Write access to pack stats.',
        },
        {
            name: 'packs:tags:read',
            description: 'Read access to pack tags.',
        },
        {
            name: 'packs:tags:write',
            description: 'Write access to pack tags.',
        },
        {
            name: 'packs:versions:read',
            description: 'Read access to pack versions.',
        },
        {
            name: 'packs:versions:write',
            description: 'Write access to pack versions.',
        },
        {
            name: 'servers:create',
            description: 'Access to create a server.',
        },
        {
            name: 'servers:feature',
            description: 'Access to feature a server.',
        },
        {
            name: 'servers:read',
            description: 'Read access to server information.',
        },
        {
            name: 'servers:vote:read',
            description: 'Read access to server votes.',
        },
        {
            name: 'servers:owners:read',
            description: 'Read access to server owners.',
        },
        {
            name: 'servers:owners:write',
            description: 'Write access to server owners.',
        },
        {
            name: 'servers:write',
            description: 'Write access to server information.',
        },
    ]);
};
