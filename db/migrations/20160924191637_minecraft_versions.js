exports.up = function (knex) {
    return knex.schema.createTable('minecraft_versions', function (table) {
        table.increments('id').primary();
        table.string('version', 16).index().notNullable();
        table.jsonb('json').nullable().defaultTo(null);
        table.integer('created_by').unsigned().notNullable();
        table.timestamps();

        table.foreign('created_by').references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('minecraft_versions');
};