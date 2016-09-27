exports.up = function (knex) {
    return knex.schema.createTable('oauth_access_tokens', function (table) {
        table.increments('id').primary();
        table.integer('user_id').index().notNullable();
        table.integer('client_id').index().notNullable();
        table.string('access_token').index().notNullable();
        table.timestamps();
        table.timestamp('expires_at').nullable().defaultTo(null);

        table.foreign('client_id').references('id').inTable('oauth_clients').onDelete('cascade').onUpdate('cascade');
        table.foreign('user_id').references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('oauth_access_tokens');
};