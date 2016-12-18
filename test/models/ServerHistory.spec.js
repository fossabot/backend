import { Model } from 'objection';
import chai, { expect } from 'chai';
import knexCleaner from 'knex-cleaner';

import knex from '../../db';

import Pack from '../../src/models/Pack';
import Server from '../../src/models/Server';
import PackVersion from '../../src/models/PackVersion';
import ServerHistory from '../../src/models/ServerHistory';

/**
 * These tests are here not to test the functionality of the provided Model library (Objection.js) and is more to make sure commonly used queries (with custom changes to the models) are returning as
 * expected
 */
describe('Model: ServerHistory', function () {
    before(function (done) {
        Model.knex(knex);

        knex.migrate.rollback().then(() => knex.migrate.latest().then(() => done()));
    });

    afterEach(function (done) {
        knexCleaner.clean(knex, {ignoreTables: ['migrations', 'migrations_lock']}).then(() => done());
    });

    describe('findById', function () {
        it('should return the data for the given server history', async function () {
            const expectedOutput = {
                id: 1,
                server_id: 1,
                online: true,
                players: 22
            };

            await Pack.query().insert({
                name: 'Test Pack',
                description: 'Test Pack Description'
            });

            await PackVersion.query().insert({
                version: '1.2.3',
                pack_id: 1
            });

            await Server.query().insert({
                name: 'Test ServerHistory',
                host: '127.0.0.1',
                description: 'This is a test pack and it is for a test pack',
                pack_id: 1,
                pack_version_id: 1
            });

            await ServerHistory.query().insert({
                server_id: 1,
                online: true,
                players: 22
            });

            const serverHistory = await ServerHistory.query().findById(1);

            expect(serverHistory).to.be.an('object');
            expect(serverHistory).to.shallowDeepEqual(expectedOutput); // match our expectedOutput exactly but don't fail on missing
            expect(serverHistory).to.contain.all.keys(['created_at']); // things that return but are variable
        });
    });

    describe('insert', function () {
        it('should create a server history', async function () {
            const expectedOutput = {
                id: 1,
                server_id: 1,
                online: true,
                players: 22
            };

            await Pack.query().insert({
                name: 'Test Pack',
                description: 'Test Pack Description'
            });

            await PackVersion.query().insert({
                version: '1.2.3',
                pack_id: 1
            });

            await Server.query().insert({
                name: 'Test ServerHistory',
                host: '127.0.0.1',
                description: 'This is a test pack and it is for a test pack',
                pack_id: 1,
                pack_version_id: 1
            });

            const serverHistory = await ServerHistory.query().insert({
                server_id: 1,
                online: true,
                players: 22
            });

            expect(serverHistory).to.be.an('object');
            expect(serverHistory).to.shallowDeepEqual(expectedOutput); // match our expectedOutput exactly but don't fail on missing
            expect(serverHistory).to.contain.all.keys(['created_at']); // things that return but are variable
        });
    });
});