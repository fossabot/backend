exports.up = function (knex) {
    return knex.schema.createTable('audit_log', function (table) {
        // table structure
        table.string('id', 36).primary();
        table.string('user_id', 36).notNullable();
        table.string('action', 255).notNullable();
        table
            .text('extra')
            .nullable()
            .defaultTo(null);
        table
            .timestamp('created_at')
            .notNullable()
            .defaultTo(knex.fn.now());

        // indexes
        table.index('user_id');

        // foreign keys
        table
            .foreign('user_id')
            .references('id')
            .inTable('users')
            .onDelete('cascade')
            .onUpdate('cascade');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('audit_log');
};
