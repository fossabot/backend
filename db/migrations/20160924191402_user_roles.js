exports.up = function (knex) {
    return knex.schema.createTable('user_roles', function (table) {
        table.increments('id').primary();
        table.integer('role_id').unsigned().notNullable();
        table.integer('user_id').unsigned().notNullable();
        table.integer('created_by').unsigned().notNullable();
        table.timestamps();

        table.unique(['user_id', 'role_id']);
        table.foreign('role_id').references('id').inTable('roles').onDelete('cascade').onUpdate('cascade');
        table.foreign('user_id').references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
        table.foreign('created_by').references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('user_roles');
};