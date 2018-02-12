exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        // table structure
        table.string('id', 36).primary();
        table
            .string('username', 64)
            .notNullable()
            .unique();
        table.string('password_hash', 60).notNullable();
        table
            .text('email')
            .notNullable()
            .unique();
        table
            .enu('role', ['user', 'admin'])
            .notNullable()
            .defaultTo('user');
        table
            .boolean('must_change_password')
            .notNullable()
            .defaultTo(false);
        table
            .boolean('is_banned')
            .notNullable()
            .defaultTo(false);
        table
            .text('ban_reason')
            .nullable()
            .defaultTo(null);
        table
            .string('tfa_secret', 32)
            .nullable()
            .defaultTo(null);
        table
            .boolean('is_verified')
            .notNullable()
            .defaultTo(false);
        table
            .string('verification_code', 128)
            .nullable()
            .defaultTo(null);
        table
            .string('password_reset_code', 128)
            .nullable()
            .defaultTo(null);
        table
            .timestamp('created_at')
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .timestamp('updated_at')
            .nullable()
            .defaultTo(null);
        table
            .timestamp('verified_at')
            .nullable()
            .defaultTo(null);
        table
            .timestamp('password_reset_sent_at')
            .nullable()
            .defaultTo(null);
        table
            .timestamp('password_last_changed_at')
            .nullable()
            .defaultTo(null);
        table
            .timestamp('banned_at')
            .nullable()
            .defaultTo(null);

        // indexes
        table.index('username');
        table.index('email');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
