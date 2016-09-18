import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../index';
import knex from '../../../db';
import { version } from '../../../package.json';

chai.use(chaiHttp);

describe('V1 Routes', function () {
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

    describe('GET /v1', function () {
        it('should return the version', function (done) {
            chai.request(app).get('/v1').end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;

                const body = res.body;

                expect(body).to.be.a('object');
                expect(body).to.have.property('version').that.is.a('string');
                expect(body).to.have.property('version').that.equals(version);
                done();
            });
        });
    });
});