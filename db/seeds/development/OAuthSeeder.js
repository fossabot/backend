exports.seed = function (knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('oauth_clients').del(),

        // Inserts seed entries
        knex('oauth_clients').insert({
            name: 'Test',
            client_id: '2398dn08nd0dsadjasd',
            client_secret: 'asduhasoufhoashfouash2',
            redirect_uri: 'http://localhost:3000/oauth'
        })
    );
};