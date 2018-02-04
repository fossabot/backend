exports.up = function (knex) {
    return knex.schema.createTable('roles', function (table) {
        // table structure
        table.string('id', 36).primary();
        table
            .string('name', 255)
            .notNullable()
            .unique();
        table
            .string('display_name', 255)
            .nullable()
            .defaultTo(null);
        table.text('description').notNullable();
        table
            .timestamp('created_at')
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .timestamp('updated_at')
            .nullable()
            .defaultTo(null);

        // indexes
        table.index('name');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('roles');
};
