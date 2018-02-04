exports.up = function (knex) {
    return knex.schema.createTable('minecraft_versions', function (table) {
        // table structure
        table.string('id', 36).primary();
        table
            .string('version', 16)
            .index()
            .unique()
            .notNullable();
        table
            .text('json')
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
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('minecraft_versions');
};
