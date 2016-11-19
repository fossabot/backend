exports.up = function (knex) {
    return knex.schema.createTable('oauth_clients', function (table) {
        table.increments('id').primary();
        table.string('name');
        table.integer('user_id').index().notNullable();
        table.string('client_id', 80).index().notNullable();
        table.string('client_secret', 80).index().notNullable();
        table.string('redirect_uri', 2000).notNullable();
        table.boolean('revoked').notNullable().defaultTo(false);
        table.timestamps();

        table.foreign('user_id').references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('oauth_clients');
};