exports.up = function (knex) {
    return knex.schema.createTable('oauth_refresh_tokens', function (table) {
        table.increments('id').primary();
        table.integer('access_token_id').index().notNullable();
        table.string('refresh_token', 255).index().unique().notNullable();
        table.text('scope').notNullable();
        table.boolean('revoked').notNullable().defaultTo(false);

        table.timestamps();
        table.timestamp('expires_at').notNullable();

        table.foreign('access_token_id').references('id').inTable('oauth_access_tokens').onDelete('cascade').onUpdate('cascade');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('oauth_refresh_tokens');
};