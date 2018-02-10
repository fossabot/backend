import knexCleaner from 'knex-cleaner';

import knex from '../../database/knex';

import Pack from '../Pack';
import Server from '../Server';
import ServerVote from '../ServerVote';
import PackVersion from '../PackVersion';

/**
 * These tests are here not to test the functionality of the provided Model library (Objection.js) and is more to make
 * sure commonly used queries (with custom changes to the models) are returning as expected.
 */
describe('Model: ServerVote', () => {
    beforeAll(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
    });

    afterEach(async () => {
        await knexCleaner.clean(knex, { ignoreTables: ['migrations', 'migrations_lock'] });
    });

    describe('findById', () => {
        it('should return the data for the given server vote', async () => {
            const pack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'Test Pack Description',
            });

            const packVersion = await PackVersion.query().insert({
                version: '1.2.3',
                pack_id: pack.id,
            });

            const server = await Server.query().insert({
                name: 'Test ServerHistory',
                host: '127.0.0.1',
                description: 'This is a test pack and it is for a test pack',
                pack_id: pack.id,
                pack_version_id: packVersion.id,
            });

            const expectedOutput = {
                server_id: server.id,
                username: 'Test',
            };

            const created = await ServerVote.query().insert({
                server_id: server.id,
                username: 'Test',
            });

            const serverVote = await ServerVote.query().findById(created.id);

            expect(serverVote).toBeInstanceOf(Object);
            expect(serverVote).toMatchObject(expectedOutput);
            expect(serverVote).toHaveProperty('id');
            expect(serverVote).toHaveProperty('created_at');
        });
    });

    describe('insert', () => {
        it('should create a server vote', async () => {
            const pack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'Test Pack Description',
            });

            const packVersion = await PackVersion.query().insert({
                version: '1.2.3',
                pack_id: pack.id,
            });

            const server = await Server.query().insert({
                name: 'Test ServerHistory',
                host: '127.0.0.1',
                description: 'This is a test pack and it is for a test pack',
                pack_id: pack.id,
                pack_version_id: packVersion.id,
            });

            const expectedOutput = {
                server_id: server.id,
                username: 'Test',
            };

            const serverVote = await ServerVote.query().insert({
                server_id: server.id,
                username: 'Test',
            });

            expect(serverVote).toBeInstanceOf(Object);
            expect(serverVote).toMatchObject(expectedOutput);
            expect(serverVote).toHaveProperty('id');
            expect(serverVote).toHaveProperty('created_at');
        });
    });
});
