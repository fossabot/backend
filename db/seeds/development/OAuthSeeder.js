exports.seed = function (knex, Promise) {
    return Promise.join(
        // Deletes ALL existing entries
        knex('oauth_clients').del(),

        // Inserts seed entries
        knex('oauth_clients').insert([
            {
                name: 'Test',
                client_id: 'test',
                client_secret: 'test',
                redirect_uri: 'http://localhost:3000/oauth'
            },
            {
                name: 'Postman',
                client_id: 'postman',
                client_secret: 'postman',
                redirect_uri: 'https://www.getpostman.com/oauth2/callback'
            }
        ])
    );
};