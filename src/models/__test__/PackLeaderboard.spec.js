import knexCleaner from 'knex-cleaner';

import knex from '../../database/knex';

import Pack from '../Pack';
import PackVersion from '../PackVersion';
import PackLeaderboard from '../PackLeaderboard';

describe('Model: PackLeaderboard', () => {
    beforeAll(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
    });

    afterEach(async () => {
        await knexCleaner.clean(knex, { ignoreTables: ['migrations', 'migrations_lock'] });
    });

    describe('insert', () => {
        it('should create a pack leaderboard', async () => {
            const pack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'This is a test pack',
            });

            const packVersion = await PackVersion.query().insert({
                version: '1.2.3',
                pack_id: pack.id,
            });

            const packLeaderboard = await PackLeaderboard.query().insert({
                pack_id: pack.id,
                pack_version_id: packVersion.id,
                username: 'test',
                time_played: 44,
            });

            expect(packLeaderboard).toBeInstanceOf(Object);
            expect(packLeaderboard).toHaveProperty('id');
            expect(packLeaderboard).toHaveProperty('pack_id', pack.id);
            expect(packLeaderboard).toHaveProperty('pack_version_id', packVersion.id);
            expect(packLeaderboard).toHaveProperty('username', 'test');
            expect(packLeaderboard).toHaveProperty('time_played', 44);
        });
    });

    describe('pack', () => {
        it('should return the pack for a pack leaderboard', async () => {
            const createdPack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'This is a test pack',
            });

            const packVersion = await PackVersion.query().insert({
                version: '1.2.3',
                pack_id: createdPack.id,
            });

            const packLeaderboard = await PackLeaderboard.query().insert({
                pack_id: createdPack.id,
                pack_version_id: packVersion.id,
                username: 'test',
                time_played: 44,
            });

            const pack = await packLeaderboard.$relatedQuery('pack');

            expect(pack).toBeInstanceOf(Object);
            expect(pack).toHaveProperty('id');
            expect(pack).toHaveProperty('name', 'Test Pack');
            expect(pack).toHaveProperty('description', 'This is a test pack');
        });
    });

    describe('packVersion', () => {
        it('should return the pack version for a pack leaderboard', async () => {
            const pack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'This is a test pack',
            });

            const createdPackVersion = await PackVersion.query().insert({
                version: '1.2.3',
                pack_id: pack.id,
            });

            const packLeaderboard = await PackLeaderboard.query().insert({
                pack_id: pack.id,
                pack_version_id: createdPackVersion.id,
                username: 'test',
                time_played: 44,
            });

            const packVersion = await packLeaderboard.$relatedQuery('packVersion');

            expect(packVersion).toBeInstanceOf(Object);
            expect(packVersion).toHaveProperty('id');
            expect(packVersion).toHaveProperty('version', '1.2.3');
        });
    });
});
