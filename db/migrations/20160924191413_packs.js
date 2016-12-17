exports.up = function (knex) {
    return knex.schema.createTable('packs', function (table) {
        // table structure
        table.increments('id').unsigned().primary();
        table.string('name', 255).notNullable().unique();
        table.string('safe_name', 255).notNullable().unique();
        table.text('description').nullable().defaultTo(null);
        table.integer('position').unsigned().notNullable();
        table.enu('type', ['public', 'semipublic', 'private']).notNullable().defaultTo('private');
        table.boolean('is_disabled').notNullable().defaultTo(true);
        table.string('discord_invite-code', 32).nullable().defaultTo(null);
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').nullable().defaultTo(null);
        table.timestamp('disabled_at').nullable().defaultTo(null);

        // indexes
        table.index('name');
        table.index('safe_name');
        table.index('type');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('packs');
};