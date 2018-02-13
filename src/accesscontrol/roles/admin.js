export default {
    $extend: ['user'],
    user: {
        // doesn't allow admins to create users with custom secret/code attributes
        'create:any': ['*', '!tfa_secret', '!verification_code', '!password_reset_code'],

        // doesn't allow admins to see password hash, secrets or codes
        'read:any': ['*', '!password', '!tfa_secret', '!verification_code', '!password_reset_code'],

        // doesn't allow admins to update users with custom secret/code attributes
        'update:any': ['*', '!tfa_secret', '!verification_code', '!password_reset_code'],
        'delete:any': ['*'],
    },
    pack: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*'],
    },
    packTag: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*'],
    },
    packFile: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*'],
    },
    packVersion: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*'],
    },
    packVersionRevision: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*'],
    },
    launcherTag: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*'],
    },
    file: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*'],
    },
    directory: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*'],
    },
    mod: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*'],
    },
    modVersion: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*'],
    },
    minecraftVersion: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*'],
    },
    packStat: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*'],
    },
    server: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*'],
    },
    serverFeature: {
        'create:any': ['*'],
        'read:any': ['*'],
        'update:any': ['*'],
        'delete:any': ['*'],
    },
};
