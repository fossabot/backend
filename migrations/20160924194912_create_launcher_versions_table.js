exports.up = function (knex) {
    return knex.schema.createTable('launcher_versions', function (table) {
        table.string('id', 36).primary();
        table
            .string('version', 16)
            .index()
            .unique()
            .notNullable();
        table.text('changelog').notNullable();

        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('launcher_versions');
};
