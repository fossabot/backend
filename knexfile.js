const config = require('config');

// eslint-disable-next-line prefer-const
let knexConfig = {};

switch (config.util.getEnv('NODE_ENV')) {
    case 'test': {
        knexConfig.test = {
            client: 'sqlite3',
            connection: {
                filename: ':memory:',
            },
            migrations: {
                tableName: 'migrations',
                directory: `${__dirname}/migrations`,
            },
            seeds: {
                directory: `${__dirname}/seeds/test`,
            },
            useNullAsDefault: true,
            pool: {
                afterCreate: (conn, cb) => {
                    conn.run('PRAGMA foreign_keys = ON', cb);
                },
            },
        };
        break;
    }
    default:
    case 'development': {
        knexConfig.development = {
            client: 'sqlite3',
            connection: {
                filename: './db/development.sqlite3',
            },
            migrations: {
                tableName: 'migrations',
                directory: `${__dirname}/migrations`,
            },
            seeds: {
                directory: `${__dirname}/seeds/development`,
            },
            useNullAsDefault: true,
            pool: {
                afterCreate: (conn, cb) => {
                    conn.run('PRAGMA foreign_keys = ON', cb);
                },
            },
        };
        break;
    }
    case 'production': {
        knexConfig.production = {
            client: 'sqlite3',
            connection: {
                filename: './db/production.sqlite3',
            },
            migrations: {
                tableName: 'migrations',
                directory: `${__dirname}/migrations`,
            },
            seeds: {
                directory: `${__dirname}/seeds/production`,
            },
            useNullAsDefault: true,
            pool: {
                afterCreate: (conn, cb) => {
                    conn.run('PRAGMA foreign_keys = ON', cb);
                },
            },
        };
        break;
    }
}

module.exports = knexConfig;
