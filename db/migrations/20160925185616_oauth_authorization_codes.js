exports.up = function (knex) {
    return knex.schema.createTable('oauth_authorization_codes', function (table) {
        table.increments('id').primary();
        table.integer('user_id').index().notNullable();
        table.integer('client_id').index().notNullable();
        table.string('authorization_code').index().notNullable();
        table.string('redirect_uri', 2000).notNullable();
        table.string('scope').notNullable();
        table.boolean('revoked').notNullable().defaultTo(false);
        table.timestamps();
        table.timestamp('expires_at').notNullable();

        table.foreign('client_id').references('id').inTable('oauth_clients').onDelete('cascade').onUpdate('cascade');
        table.foreign('user_id').references('id').inTable('users').onDelete('cascade').onUpdate('cascade');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('oauth_authorization_codes');
};