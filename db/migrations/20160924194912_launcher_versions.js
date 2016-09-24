exports.up = function (knex) {
    return knex.schema.createTable('launcher_versions', function (table) {
        table.increments('id').primary();
        table.string('version', 16).index().notNullable();
        table.text('changelog').notNullable();
        table.integer('created_by').unsigned().notNullable().references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
        table.timestamps();

        table.foreign('created_by').references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('launcher_versions');
};