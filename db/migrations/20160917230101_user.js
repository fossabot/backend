exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('username', 64).notNullable().unique();
        table.string('password').notNullable();
        table.string('email').notNullable().unique();
        table.boolean('must_change_password').notNullable().defaultTo(false);
        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};