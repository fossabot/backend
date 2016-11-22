exports.up = function (knex) {
    return knex.schema.createTable('packs', function (table) {
        table.increments('id').primary();
        table.string('name', 255).notNullable().unique();
        table.string('safe_name', 255).notNullable().unique();
        table.integer('position').unsigned().notNullable();
        table.enu('type', ['public', 'semipublic', 'private']).notNullable().defaultTo('private');
        table.boolean('enabled').notNullable().defaultTo(true);
        table.boolean('can_publish').notNullable().defaultTo(false);
        table.integer('created_by').unsigned().notNullable();

        table.timestamps();

        table.foreign('created_by').references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('packs');
};