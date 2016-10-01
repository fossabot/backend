import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../index';
import knex from '../../../db';

import * as testUtils from '../../../test/utils';

chai.use(chaiHttp);

describe('/v1/roles', function () {
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

    describe('GET /v1/roles', function () {
        it('should return all the roles in the system', async function () {
            await testUtils.createRole({
                name: 'test',
                description: 'This is a test role.'
            });

            const response = await chai.request(app).get('/v1/roles');

            expect(response).to.have.status(200);
            expect(response).to.be.json;

            const body = response.body;

            expect(body).to.be.a('array');
            expect(body).to.have.length(1);

            const role = body[0];

            expect(role).to.be.an('object');
            expect(role.name).to.equal('test');
            expect(role.description).to.equal('This is a test role.');
        });
    });
});