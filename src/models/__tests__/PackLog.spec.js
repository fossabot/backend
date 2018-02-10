import knexCleaner from 'knex-cleaner';

import knex from '../../database/knex';

import Pack from '../Pack';
import PackLog from '../PackLog';
import PackVersion from '../PackVersion';

describe('Model: PackLog', () => {
    beforeAll(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
    });

    afterEach(async () => {
        await knexCleaner.clean(knex, { ignoreTables: ['migrations', 'migrations_lock'] });
    });

    describe('insert', () => {
        it('should create a pack log', async () => {
            const pack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'This is a test pack',
            });

            const packVersion = await PackVersion.query().insert({
                version: '1.2.3',
                pack_id: pack.id,
            });

            const packLog = await PackLog.query().insert({
                pack_id: pack.id,
                pack_version_id: packVersion.id,
                username: 'test',
                action: 'pack_install',
            });

            expect(packLog).toBeInstanceOf(Object);
            expect(packLog).toHaveProperty('id');
            expect(packLog).toHaveProperty('pack_id', pack.id);
            expect(packLog).toHaveProperty('pack_version_id', packVersion.id);
            expect(packLog).toHaveProperty('username', 'test');
            expect(packLog).toHaveProperty('action', 'pack_install');
        });
    });

    describe('pack', () => {
        it('should return the pack for a pack log', async () => {
            const createdPack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'This is a test pack',
            });

            const packVersion = await PackVersion.query().insert({
                version: '1.2.3',
                pack_id: createdPack.id,
            });

            const packLog = await PackLog.query().insert({
                pack_id: createdPack.id,
                pack_version_id: packVersion.id,
                username: 'test',
                action: 'pack_install',
            });

            const pack = await packLog.$relatedQuery('pack');

            expect(pack).toBeInstanceOf(Object);
            expect(pack).toHaveProperty('id');
            expect(pack).toHaveProperty('name', 'Test Pack');
            expect(pack).toHaveProperty('description', 'This is a test pack');
        });
    });

    describe('packVersion', () => {
        it('should return the pack version for a pack log', async () => {
            const pack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'This is a test pack',
            });

            const createdPackVersion = await PackVersion.query().insert({
                version: '1.2.3',
                pack_id: pack.id,
            });

            const packLog = await PackLog.query().insert({
                pack_id: pack.id,
                pack_version_id: createdPackVersion.id,
                username: 'test',
                action: 'pack_install',
            });

            const packVersion = await packLog.$relatedQuery('packVersion');

            expect(packVersion).toBeInstanceOf(Object);
            expect(packVersion).toHaveProperty('id');
            expect(packVersion).toHaveProperty('version', '1.2.3');
        });
    });
});
