import knexCleaner from 'knex-cleaner';

import knex from '../../database/knex';

import File from '../File';
import Pack from '../Pack';
import PackFile from '../PackFile';

describe('Model: PackFile', () => {
    beforeAll(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
    });

    afterEach(async () => {
        await knexCleaner.clean(knex, { ignoreTables: ['migrations', 'migrations_lock'] });
    });

    describe('findById', () => {
        it('should return the data for the given pack file', async () => {
            const file = await File.query().insert({
                hash: 'cf80cd8aed482d5d1527d7dc72fceff84e6326592848447d2dc0b0e87dfc9a90',
                size: 22,
            });

            const pack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'This is a test pack',
            });

            const expectedOutput = {
                pack_id: pack.id,
                pack_directory_id: null,
                file_id: file.id,
                name: 'test.zip',
            };

            const created = await PackFile.query().insert({
                pack_id: pack.id,
                file_id: file.id,
                name: 'test.zip',
            });

            const packFile = await PackFile.query().findById(created.id);

            expect(packFile).toBeInstanceOf(Object);
            expect(packFile).toMatchObject(expectedOutput);
            expect(packFile).toHaveProperty('id');
            expect(packFile).toHaveProperty('created_at');
        });

        it('should return undefined if a pack file cannot be found by id', async () => {
            const packFile = await PackFile.query().findById(1);

            expect(packFile).toBeUndefined();
        });
    });

    describe('insert', () => {
        it('should create a pack file', async () => {
            const file = await File.query().insert({
                hash: 'cf80cd8aed482d5d1527d7dc72fceff84e6326592848447d2dc0b0e87dfc9a90',
                size: 22,
            });

            const pack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'This is a test pack',
            });

            const expectedOutput = {
                pack_id: pack.id,
                pack_directory_id: null,
                file_id: file.id,
                name: 'test.zip',
            };

            const packFile = await PackFile.query().insert({
                pack_id: pack.id,
                file_id: file.id,
                name: 'test.zip',
            });

            expect(packFile).toBeInstanceOf(Object);
            expect(packFile).toMatchObject(expectedOutput);
            expect(packFile).toHaveProperty('id');
            expect(packFile).toHaveProperty('created_at');
        });
    });
});
