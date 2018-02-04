exports.up = function (knex) {
    return knex.schema.createTable('pack_directories', function (table) {
        // table structure
        table.string('id', 36).primary();
        table.string('pack_id', 36).notNullable();
        table.string('name', 32).notNullable();
        table
            .string('parent', 36)
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

        // indexes
        table.unique(['pack_id', 'parent', 'name']);

        // foreign keys
        table
            .foreign('pack_id')
            .references('id')
            .inTable('packs')
            .onDelete('cascade')
            .onUpdate('cascade');
        table
            .foreign('parent')
            .references('id')
            .inTable('pack_directories')
            .onDelete('cascade')
            .onUpdate('cascade');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('pack_directories');
};
