import chai, { expect } from 'chai';
import { format as dateFormat } from 'date-fns';

import knex from '../../db';

import { User } from '../../src/models';

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

    describe('get', function () {
        it('should return the data for the given user', function () {
            const input = {
                username: 'test',
                password: 'test',
                email: 'test@example.com'
            };

            const expectedOutput = {
                id: 1,
                username: 'test',
                email: 'test@example.com',
                must_change_password: 0,
                created_at: null,
                updated_at: null
            };

            User.create(input).then(() => {
                return User.get(1).then((user) => {
                    expect(user).to.be.an('object');
                    expect(user).to.deep.equal(expectedOutput);
                });
            });
        });

        it('should reject with an error if the given user cannot be found by id', function () {
            return User.get(100).catch((err) => {
                expect(err).to.be.an('Error');
                expect(err.message).to.equal('User not found.');
            });
        });
    });

    describe('create', function () {
        it('should create a user and return the created user', function () {
            const input = {
                username: 'test',
                password: 'test',
                email: 'test@example.com'
            };

            return User.create(input).then((user) => {
                expect(user).to.be.an('object');

                expect(user).to.have.property('id').that.is.a('number');
                expect(user).to.have.property('id').that.equals(1);

                expect(user).to.have.property('username').that.is.a('string');
                expect(user).to.have.property('username').that.equals('test');

                expect(user).to.have.property('email').that.is.a('string');
                expect(user).to.have.property('email').that.equals('test@example.com');

                expect(user).to.have.property('must_change_password').that.is.a('boolean');
                expect(user).to.have.property('must_change_password').that.equals(false);

                expect(user).to.have.property('created_at').that.is.a('string');
                expect(user).to.have.property('updated_at').that.is.null;
            });
        });

        it('should reject with an error if the passed in data isn\'t an array', function () {
            const input = [
                {
                    username: 'test',
                    password: 'test',
                    email: 'test@example.com'
                },
                {
                    username: 'test2',
                    password: 'test2',
                    email: 'test2@example.com'
                }
            ];

            return User.create(input).catch((err) => {
                expect(err).to.be.an('Error');
                expect(err.message).to.equal('Only one user can be created using this method.');
            });
        });
    });
});