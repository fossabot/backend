import { Model } from 'objection';
import knexCleaner from 'knex-cleaner';

import knex from '../../database/knex';

import Pack from '../Pack';
import LauncherTag from '../LauncherTag';

/**
 * These tests are here not to test the functionality of the provided Model library (Objection.js) and is more to make sure commonly used queries (with custom changes to the models) are returning as
 * expected
 */
describe('Model: LauncherTag', () => {
    beforeAll((done) => {
        Model.knex(knex);

        knex.migrate.rollback().then(() => {
            return knex.migrate.latest().then(() => {
                return done();
            });
        });
    });

    afterEach((done) => {
        knexCleaner.clean(knex, { ignoreTables: ['migrations', 'migrations_lock'] }).then(() => {
            return done();
        });
    });

    describe('insert', () => {
        it('should create a launcher tag', async () => {
            const pack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'This is a test pack',
            });

            const expectedOutput = {
                tag: 'test',
                pack_id: pack.id,
            };

            const packTag = await LauncherTag.query().insert({
                tag: 'test',
                pack_id: pack.id,
            });

            expect(packTag).toBeInstanceOf(Object);
            expect(packTag).toMatchObject(expectedOutput);
            expect(packTag).toHaveProperty('id');
            expect(packTag).toHaveProperty('created_at');
        });

        it('should not allow invalid characters when creating a tag', async () => {
            const pack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'This is a test pack',
            });

            const input = {
                tag: 'test*',
                pack_id: pack.id,
            };

            const expectedError = {
                tag: [
                    {
                        message: 'should match pattern "^[A-Za-z0-9-_:]+$"',
                        keyword: 'pattern',
                        params: {
                            pattern: '^[A-Za-z0-9-_:]+$',
                        },
                    },
                ],
            };

            return expect(LauncherTag.query().insert(input)).rejects.toHaveProperty('data', expectedError);
        });
    });

    describe('pack', () => {
        it('should attach a tag to a pack', async () => {
            const pack = await Pack.query().insert({
                name: 'Test Pack',
                description: 'This is a test pack',
            });

            await pack.$relatedQuery('launcherTags').insert({
                tag: 'test',
            });

            const launcherTags = await pack.$relatedQuery('launcherTags');

            expect(launcherTags).toBeInstanceOf(Array);
            expect(launcherTags).toHaveLength(1);

            const packTag = launcherTags[0];

            expect(packTag).toBeInstanceOf(Object);
            expect(packTag).toHaveProperty('tag', 'test');
            expect(packTag).toHaveProperty('pack_id', pack.id);
        });
    });
});
