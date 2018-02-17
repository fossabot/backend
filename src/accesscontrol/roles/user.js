export default {
    $extend: ['guest'],
    user: {
        'read:own': ['id', 'username', 'email', 'is_verified', 'created_at', 'updated_at'],
        'update:own': ['username', 'email'],
        'delete:own': ['*'],
    },
    pack: {
        'read:own': ['*', '!is_disabled', '!disabled_at'],
        'create:own': ['name', 'description', 'is_private', 'website_url', 'support_url', 'discord_invite_code'],
        'update:own': ['name', 'description', 'is_private', 'website_url', 'support_url', 'discord_invite_code'],
        'delete:own': ['*'],
    },
    packTag: {
        'create:own': ['tag'],
        'read:own': ['*'],
        'update:own': ['tag'],
        'delete:own': ['*'],
    },
    launcherTag: {
        'read:own': ['*'],
    },
    packFile: {
        'create:own': ['*'],
        'read:own': ['*'],
        'update:own': ['*'],
        'delete:own': ['*'],
    },
    packVersion: {
        'create:own': ['*'],
        'read:own': ['*'],
        'update:own': ['*'],
        'delete:own': ['*'],
    },
    packVersionRevision: {
        'create:own': ['*'],
        'read:own': ['*'],
        'update:own': ['*'],
        'delete:own': ['*'],
    },
    file: {
        'create:own': ['*'],
        'read:own': ['*'],
        'update:own': ['*'],
        'delete:own': ['*'],
    },
    directory: {
        'create:own': ['*'],
        'read:own': ['*'],
        'update:own': ['*'],
        'delete:own': ['*'],
    },
    mod: {
        'create:own': ['*'],
        'read:own': ['*'],
        'update:own': ['*'],
        'delete:own': ['*'],
    },
    modVersion: {
        'create:own': ['*'],
        'read:own': ['*'],
        'update:own': ['*'],
        'delete:own': ['*'],
    },
    minecraftVersion: {
        'create:own': ['*'],
        'read:own': ['*'],
        'update:own': ['*'],
        'delete:own': ['*'],
    },
    packStat: {
        'create:own': ['*'],
        'read:own': ['*'],
        'update:own': ['*'],
        'delete:own': ['*'],
    },
    server: {
        'create:own': ['*'],
        'read:own': ['*'],
        'update:own': ['*'],
        'delete:own': ['*'],
    },
    serverFeature: {
        'create:own': ['*'],
        'read:own': ['*'],
        'update:own': ['*'],
        'delete:own': ['*'],
    },
};
