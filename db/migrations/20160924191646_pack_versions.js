exports.up = function (knex) {
    return knex.schema.createTable('pack_versions', function (table) {
        table.increments('id').primary();
        table.integer('pack_id').unsigned().notNullable();
        table.string('version', 32).notNullable().index();
        table.integer('minecraft_version_id').unsigned().notNullable();
        table.boolean('is_development').notNullable().defaultTo(true);
        table.text('changelog').nullable().defaultTo(null);
        table.text('xml').nullable().defaultTo(null);
        table.jsonb('json').nullable().defaultTo(null);

        table.integer('created_by').unsigned().notNullable();
        table.integer('published_by').unsigned().nullable().defaultTo(null);

        table.timestamps();
        table.timestamp('published_at').nullable().defaultTo(null);

        table.unique(['pack_id', 'version']);
        table.foreign('minecraft_version_id').references('id').inTable('minecraft_versions').onDelete('cascade').onUpdate('cascade');
        table.foreign('pack_id').references('id').inTable('packs').onDelete('cascade').onUpdate('cascade');
        table.foreign('created_by').references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('pack_versions');
};