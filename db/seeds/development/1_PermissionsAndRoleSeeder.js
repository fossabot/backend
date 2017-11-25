const config = require('config');
const uuidv4 = require('uuid/v4');

exports.seed = async function (knex) {
    async function getRoleID(name) {
        const result = await knex('roles')
            .select('id')
            .where('name', name)
            .first();

        return result.id;
    }

    async function getPermissionID(name) {
        const result = await knex('permissions')
            .select('id')
            .where('name', name)
            .first();

        return result.id;
    }

    await knex('permissions').del();
    await knex('role_permissions').del();
    await knex('roles').del();

    await knex('permissions').insert([
        {
            id: uuidv4(),
            name: 'pack.admin.read',
            description: 'Grants read access to pack admins.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'pack.admin.write',
            description: 'Grants write access to pack admins.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'pack.create',
            description: 'Grants access to create packs.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'pack.file.read',
            description: 'Grants read access to pack files.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'pack.file.write',
            description: 'Grants write access to pack files.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'pack.log.read',
            description: 'Grants read access to pack logs.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'pack.read',
            description: 'Grants read access to a pack.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'pack.stat.read',
            description: 'Grants read access to pack stats.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'pack.tag.read',
            description: 'Grants read access to pack tags.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'pack.tag.write',
            description: 'Grants write access to pack tags.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'pack.version.read',
            description: 'Grants read access to pack versions.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'pack.version.write',
            description: 'Grants write access to pack versions.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'pack.write',
            description: 'Grants write access to a pack.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'server.create',
            description: 'Grants access to create servers.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'server.feature',
            description: 'Grants access to feature a server.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'server.read',
            description: 'Grants read access to a server.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'server.owner.read',
            description: 'Grants read access to server owners.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'server.owner.write',
            description: 'Grants write access to server owners.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'server.vote.read',
            description: 'Grants access to view votes for a server.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'server.write',
            description: 'Grants write access to a server.',
            created_at: new Date().toJSON(),
        },
    ]);

    await knex('roles').insert([
        {
            id: uuidv4(),
            name: 'admin',
            display_name: 'Administrator',
            description: 'Administrator of the system, has complete power to do everything.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'user',
            display_name: 'User',
            description: 'User who has signed up and verified their email but has no pack or server listing.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'pack_developer',
            display_name: 'Pack Developer',
            description: 'Pack Developer who has access to pack functionality of ATLauncher.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'server_owner',
            display_name: 'Server Owner',
            description: 'Server owner who has access to the server list functionality of ATLauncher.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'unverified',
            display_name: 'Unverified',
            description: 'User who has signed up, but not verified their email.',
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            name: 'banned',
            display_name: 'Banned',
            description: 'User who has been banned.',
            created_at: new Date().toJSON(),
        },
    ]);

    // admin role
    const admin_role_id = await getRoleID('admin');
    const admin_permissions = await knex('permissions').select('id');
    admin_permissions.forEach(async ({ id: permission_id }) => {
        await knex('role_permissions').insert({
            id: uuidv4(),
            role_id: admin_role_id,
            permission_id,
            created_at: new Date().toJSON(),
        });
    });

    // user role
    await knex('role_permissions').insert([
        {
            id: uuidv4(),
            role_id: await getRoleID('user'),
            permission_id: await getPermissionID('pack.create'),
            created_at: new Date().toJSON(),
        },
        {
            id: uuidv4(),
            role_id: await getRoleID('user'),
            permission_id: await getPermissionID('server.create'),
            created_at: new Date().toJSON(),
        },
    ]);

    // pack_developer role
    const pack_developer_role_id = await getRoleID('pack_developer');
    const pack_developer_permissions = await knex('permissions')
        .select('id')
        .where('name', 'like', 'pack.%');

    pack_developer_permissions.forEach(async ({ id: permission_id }) => {
        await knex('role_permissions').insert({
            id: uuidv4(),
            role_id: pack_developer_role_id,
            permission_id,
            created_at: new Date().toJSON(),
        });
    });

    // server_owner role
    const server_owner_role_id = await getRoleID('server_owner');
    const server_owner_permissions = await knex('permissions')
        .select('id')
        .where('name', 'like', 'server.%');
    server_owner_permissions.forEach(async ({ id: permission_id }) => {
        await knex('role_permissions').insert({
            id: uuidv4(),
            role_id: server_owner_role_id,
            permission_id,
            created_at: new Date().toJSON(),
        });
    });
};
