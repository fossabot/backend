exports.up = function (knex) {
    return knex.schema.createTable('pack_users', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.integer('pack_id').unsigned().notNullable();
        table.integer('created_by').unsigned().notNullable();

        table.datetime('created_at');

        table.unique(['user_id', 'pack_id']);
        table.foreign('pack_id').references('id').inTable('packs').onDelete('cascade').onUpdate('cascade');
        table.foreign('user_id').references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
        table.foreign('created_by').references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('pack_users');
};