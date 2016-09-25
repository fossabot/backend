import chai, { expect } from 'chai';

import knex from '../../db';

import User from './User';

/**
 * These tests are here not to test the functionality of the provided Model library (Objection.js) and is more to make sure commonly used queries (with custom changes to the models) are returning as
 * expected
 */
describe('Model: User', function () {
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

    describe('findById', function () {
        it('should return the data for the given user', async function () {
            const input = {
                username: 'test',
                password: 'test',
                email: 'test@example.com'
            };

            const insertedUser = await User.query().insert(input);

            expect(insertedUser).to.not.be.undefined;

            const user = await User.query().findById(insertedUser.id);

            expect(user).to.be.an('object');

            expect(user).to.have.property('id').that.is.a('number');
            expect(user).to.have.property('id').that.equals(insertedUser.id);

            expect(user).to.have.property('username').that.is.a('string');
            expect(user).to.have.property('username').that.equals('test');

            expect(user).to.have.property('email').that.is.a('string');
            expect(user).to.have.property('email').that.equals('test@example.com');

            expect(user).to.have.property('must_change_password').that.is.a('boolean');
            expect(user).to.have.property('must_change_password').that.equals(false);

            expect(user).to.have.property('created_at').that.is.a('string');
            expect(user).to.have.property('updated_at').that.is.null;
        });

        it('should return undefined if a user cannot be found by id', async function () {
            const user = await User.query().findById(1);

            expect(user).to.be.undefined;
        });
    });

    describe('insert', function () {
        it('should create a user', async function () {
            const input = {
                username: 'test',
                password: 'test',
                email: 'test@example.com'
            };

            const user = await User.query().insert(input);

            expect(user).to.be.an('object');

            expect(user).to.have.property('id').that.is.a('number');
            expect(user).to.have.property('id').that.equals(1);

            expect(user).to.have.property('username').that.is.a('string');
            expect(user).to.have.property('username').that.equals('test');

            expect(user).to.have.property('email').that.is.a('string');
            expect(user).to.have.property('email').that.equals('test@example.com');

            expect(user).to.have.property('password').that.is.a('string');

            expect(user).to.have.property('must_change_password').that.is.a('boolean');
            expect(user).to.have.property('must_change_password').that.equals(false);

            expect(user).to.have.property('created_at').that.is.a('string');
            expect(user).to.have.property('updated_at').that.is.null;
        });

        it('should throw an error if email is invalid format', function () {
            const input = {
                username: 'test',
                password: 'test',
                email: 'error'
            };

            const expectedError = '"email": "should match format \\"email\\"';

            return expect(User.query().insert(input)).to.be.rejectedWith(expectedError);
        });

        it('should throw an error if username is invalid format', function () {
            const input = {
                username: 'a',
                password: 'test',
                email: 'test@example.com'
            };

            const expectedError = '"username": "should NOT be shorter than 3 characters"';

            return expect(User.query().insert(input)).to.be.rejectedWith(expectedError);
        });
    });
});