exports.up = function (knex) {
    return knex.schema.createTable('roles', function (table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable().unique();
        table.text('description').notNullable();
        table.integer('created_by').unsigned().notNullable();

        table.timestamps();

        table.foreign('created_by').references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('roles');
};