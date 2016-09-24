exports.up = function (knex) {
    return knex.schema.createTable('launcher_tags', function (table) {
        table.increments('id').primary();
        table.string('tag', 64).index().notNullable();
        table.integer('pack_id').unsigned().notNullable();
        table.integer('created_by').unsigned().notNullable();
        table.timestamps();

        table.unique(['tag', 'pack_id']);
        table.foreign('pack_id').references('id').inTable('packs').onDelete('cascade').onUpdate('cascade');
        table.foreign('created_by').references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('launcher_tags');
};