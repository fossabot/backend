import knexCleaner from 'knex-cleaner';

import knex from '../../database/knex';

import Pack from '../Pack';
import User from '../User';
import Server from '../Server';
import PackVersion from '../PackVersion';
import ServerFeaturedHistory from '../ServerFeaturedHistory';

describe('Model: ServerFeaturedHistory', () => {
    beforeAll(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
    });

    afterEach(async () => {
        await knexCleaner.clean(knex, { ignoreTables: ['migrations', 'migrations_lock'] });
    });

    describe('findById', () => {
        it('should return the data for the given server feature history', async () => {
            const user = await User.query().insert({
                username: 'Test',
                email: 'test@example.com',
                password: 'test',
            });

            const pack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'Test Pack Description',
            });

            const packVersion = await PackVersion.query().insert({
                version: '1.2.3',
                pack_id: pack.id,
            });

            const server = await Server.query().insert({
                name: 'Test ServerFeaturedHistory',
                host: '127.0.0.1',
                description: 'This is a test pack and it is for a test pack',
                pack_id: pack.id,
                pack_version_id: packVersion.id,
            });

            const expectedOutput = {
                server_id: server.id,
                user_id: user.id,
                price: 5.55,
                transaction_id: 'asldhjaslkdjlkas1234',
                days: 14,
            };

            const serverFeaturedHistory = await ServerFeaturedHistory.query().insert({
                server_id: server.id,
                user_id: user.id,
                price: 5.55,
                transaction_id: 'asldhjaslkdjlkas1234',
                days: 14,
                expires_at: new Date().toJSON(),
            });

            const serverHistory = await ServerFeaturedHistory.query().findById(serverFeaturedHistory.id);

            expect(serverHistory).toBeInstanceOf(Object);
            expect(serverHistory).toMatchObject(expectedOutput);
            expect(serverHistory).toHaveProperty('id');
            expect(serverHistory).toHaveProperty('created_at');
            expect(serverHistory).toHaveProperty('expires_at');
        });
    });

    describe('insert', () => {
        it('should create a server feature history', async () => {
            const user = await User.query().insert({
                username: 'Test',
                email: 'test@example.com',
                password: 'test',
            });

            const pack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'Test Pack Description',
            });

            const packVersion = await PackVersion.query().insert({
                version: '1.2.3',
                pack_id: pack.id,
            });

            const server = await Server.query().insert({
                name: 'Test ServerFeaturedHistory',
                host: '127.0.0.1',
                description: 'This is a test pack and it is for a test pack',
                pack_id: pack.id,
                pack_version_id: packVersion.id,
            });

            const expectedOutput = {
                server_id: server.id,
                user_id: user.id,
                price: 5.55,
                transaction_id: 'asldhjaslkdjlkas1234',
                days: 14,
            };

            const serverHistory = await ServerFeaturedHistory.query().insert({
                server_id: server.id,
                user_id: user.id,
                price: 5.55,
                transaction_id: 'asldhjaslkdjlkas1234',
                days: 14,
                expires_at: new Date().toJSON(),
            });

            expect(serverHistory).toBeInstanceOf(Object);
            expect(serverHistory).toMatchObject(expectedOutput);
            expect(serverHistory).toHaveProperty('id');
            expect(serverHistory).toHaveProperty('created_at');
        });
    });
});
