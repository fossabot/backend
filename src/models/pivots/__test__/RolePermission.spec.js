import { Model } from 'objection';
import knexCleaner from 'knex-cleaner';

import knex from '../../../database/knex';

import * as testUtils from '../../../../test/utils';
import RolePermission from '../RolePermission';

/**
 * These tests are here not to test the functionality of the provided Model library (Objection.js)
 * and is more to make sure commonly used queries (with custom changes to the models) are returning
 * as expected
 */
describe('Model: RolePermission', () => {
    beforeAll((done) => {
        Model.knex(knex);

        knex.migrate.rollback().then(() => knex.migrate.latest().then(() => done()));
    });

    afterEach((done) => {
        knexCleaner.clean(knex, { ignoreTables: ['migrations', 'migrations_lock'] }).then(() => done());
    });

    describe('insert', () => {
        it('should create a role permission', async () => {
            const permission = await testUtils.createPermission();
            const role = await testUtils.createRole();

            const expectedOutput = {
                permission_id: permission.id,
                role_id: role.id,
            };

            const permissionRole = await RolePermission.query().insert({
                permission_id: permission.id,
                role_id: role.id,
            });

            expect(permissionRole).toBeInstanceOf(Object);
            expect(permissionRole).toMatchObject(expectedOutput);
            expect(permissionRole).toHaveProperty('id');
            expect(permissionRole).toHaveProperty('created_at');
        });

        it('should not create a role permission when it already exists', async () => {
            const permission = await testUtils.createPermission();
            const role = await testUtils.createRole();
            await testUtils.addPermissionToRole(permission, role);

            const expectedOutput = {
                role_id: [
                    {
                        message: 'role_id is already taken.',
                    },
                ],
                permission_id: [
                    {
                        message: 'permission_id is already taken.',
                    },
                ],
            };

            try {
                await RolePermission.query().insert({
                    permission_id: permission.id,
                    role_id: role.id,
                });
            } catch (error) {
                expect(error.data).toEqual(expectedOutput);
            }
        });
    });
});
