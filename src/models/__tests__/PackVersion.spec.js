import knexCleaner from 'knex-cleaner';

import knex from '../../database/knex';

import Pack from '../Pack';
import PackVersion from '../PackVersion';
import MinecraftVersion from '../MinecraftVersion';

describe('Model: PackVersion', () => {
    beforeAll(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
    });

    afterEach(async () => {
        await knexCleaner.clean(knex, { ignoreTables: ['migrations', 'migrations_lock'] });
    });

    describe('insert', () => {
        it('should create a pack version', async () => {
            const pack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'This is a test pack',
            });

            const packVersion = await PackVersion.query().insert({
                version: 'test',
                changelog: 'test',
                pack_id: pack.id,
            });

            expect(packVersion).toBeInstanceOf(Object);
            expect(packVersion).toHaveProperty('id');
            expect(packVersion).toHaveProperty('pack_id', pack.id);
            expect(packVersion).toHaveProperty('minecraft_version_id', null);
            expect(packVersion).toHaveProperty('published_revision_id', null);
            expect(packVersion).toHaveProperty('version', 'test');
            expect(packVersion).toHaveProperty('changelog', 'test');
            expect(packVersion).toHaveProperty('created_at');
            expect(packVersion).toHaveProperty('updated_at', null);
            expect(packVersion).toHaveProperty('published_at', null);
        });
    });

    describe('minecraftVersion', () => {
        it('should get the Minecraft version for a pack version', async () => {
            const pack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'This is a test pack',
            });

            const createdMinecraftVersion = await MinecraftVersion.query().insert({
                version: '1.2.3',
            });

            const packVersion = await PackVersion.query().insert({
                version: 'test',
                minecraft_version_id: createdMinecraftVersion.id,
                changelog: ' test',
                pack_id: pack.id,
            });

            const minecraftVersion = await packVersion.$relatedQuery('minecraftVersion');

            expect(minecraftVersion).toBeInstanceOf(Object);
            expect(minecraftVersion).toHaveProperty('version', '1.2.3');
        });
    });
});
