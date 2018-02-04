exports.up = function (knex) {
    return knex.schema.createTable('role_permissions', function (table) {
        // table structure
        table.string('id', 36).primary();
        table.string('role_id', 36).notNullable();
        table.string('permission_id', 36).notNullable();
        table
            .timestamp('created_at')
            .notNullable()
            .defaultTo(knex.fn.now());

        // indexes
        table.unique(['permission_id', 'role_id']);

        // foreign keys
        table
            .foreign('role_id')
            .references('id')
            .inTable('roles')
            .onDelete('cascade')
            .onUpdate('cascade');
        table
            .foreign('permission_id')
            .references('id')
            .inTable('permissions')
            .onDelete('cascade')
            .onUpdate('cascade');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('role_permissions');
};
