import knexCleaner from 'knex-cleaner';

import knex from '../../database/knex';

import Pack from '../Pack';
import PackDirectory from '../PackDirectory';

describe('Model: PackDirectory', () => {
    beforeAll(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
    });

    afterEach(async () => {
        await knexCleaner.clean(knex, { ignoreTables: ['migrations', 'migrations_lock'] });
    });

    describe('findById', () => {
        it('should return the data for the given pack directory', async () => {
            const pack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'This is a test pack',
            });

            const expectedOutput = {
                name: 'test',
                pack_id: pack.id,
                parent: null,
                updated_at: null,
            };

            const created = await PackDirectory.query().insert({
                name: 'test',
                pack_id: pack.id,
            });

            const packDirectory = await PackDirectory.query().findById(created.id);

            expect(packDirectory).toBeInstanceOf(Object);
            expect(packDirectory).toMatchObject(expectedOutput);
            expect(packDirectory).toHaveProperty('id');
            expect(packDirectory).toHaveProperty('created_at');
        });

        it('should return undefined if a pack directory cannot be found by id', async () => {
            const packDirectory = await PackDirectory.query().findById(1);

            expect(packDirectory).toBeUndefined();
        });
    });

    describe('insert', () => {
        it('should create a pack directory', async () => {
            const pack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'This is a test pack',
            });

            const expectedOutput = {
                name: 'test',
                pack_id: pack.id,
                parent: null,
                updated_at: null,
            };

            const packDirectory = await PackDirectory.query().insert({
                name: 'test',
                pack_id: pack.id,
            });

            expect(packDirectory).toBeInstanceOf(Object);
            expect(packDirectory).toMatchObject(expectedOutput);
            expect(packDirectory).toHaveProperty('id');
            expect(packDirectory).toHaveProperty('created_at');
        });
    });
});
