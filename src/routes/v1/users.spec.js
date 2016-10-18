import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../index';
import knex from '../../../db';

import * as testUtils from '../../../test/utils';

chai.use(chaiHttp);

describe('/v1/users', function () {
    beforeEach(function (done) {
        knex.migrate.rollback()
            .then(function () {
                knex.migrate.latest()
                    .then(function () {
                        return knex.seed.run()
                            .then(function () {
                                done();
                            });
                    });
            });
    });

    afterEach(function (done) {
        knex.migrate.rollback()
            .then(function () {
                done();
            });
    });

    after(function (done) {
        app.server.close();
        done();
    });

    describe('GET /v1/users', function () {
        it('should return all the users in the system', async function () {
            const created_role = await testUtils.createRole({
                name: 'admin'
            });

            const created_user = await testUtils.createUser({
                username: 'test',
                email: 'test@example.com'
            });

            await testUtils.addRoleToUser(created_role, created_user);

            const client = await testUtils.createOAuthClient({
                user_id: created_user.id
            });

            const token = await testUtils.createAccessToken({
                user_id: created_user.id,
                client_id: client.id,
                scope: 'admin:read'
            });

            const response = await chai.request(app).get('/v1/users').set('Authorization', `Bearer ${token.access_token}`);

            expect(response).to.have.status(200);
            expect(response).to.be.json;

            const body = response.body;

            expect(body).to.be.a('array');
            expect(body).to.have.length(2);

            const user = body[1];

            expect(user).to.be.an('object');
            expect(user.username).to.equal('test');
            expect(user.email).to.equal('test@example.com');
        });
    });

    xit('should return an error if user doesn\'t have an admin role', async function () {
        const created_role = await testUtils.createRole({
            name: 'user'
        });

        const created_user = await testUtils.createUser({
            username: 'test',
            email: 'test@example.com'
        });

        await testUtils.addRoleToUser(created_role, created_user);

        const client = await testUtils.createOAuthClient({
            user_id: created_user.id
        });

        const token = await testUtils.createAccessToken({
            user_id: created_user.id,
            client_id: client.id,
            scope: 'admin:read'
        });

        const response = await chai.request(app).get('/v1/users').set('Authorization', `Bearer ${token.access_token}`);

        expect(response).to.have.status(200);
        expect(response).to.be.json;
    });
});