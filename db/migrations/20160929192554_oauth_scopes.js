exports.up = function (knex) {
    return knex.schema.createTable('oauth_scopes', function (table) {
        table.increments('id').primary();
        table.string('name').index().unique().notNullable();
        table.text('description').notNullable();
        table.timestamps();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('oauth_scopes');
};