import { Model } from 'objection';
import knexCleaner from 'knex-cleaner';

import knex from '../../src/db';

import Role from '../../src/models/Role';
import Permission from '../../src/models/Permission';

describe('Model: Permission', () => {
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

    describe('findById', () => {
        it('should return the data for the given permission', async () => {
            const expectedOutput = {
                name: 'testpermission',
                description: 'This is a test permission',
                updated_at: null,
            };

            const created = await Permission.query().insert({
                name: 'testpermission',
                description: 'This is a test permission',
            });

            const permission = await Permission.query().findById(created.id);

            expect(permission).toBeInstanceOf(Object);
            expect(permission).toMatchObject(expectedOutput);
            expect(permission).toHaveProperty('id');
            expect(permission).toHaveProperty('created_at');
        });

        it('should return undefined if a permission cannot be found by id', async () => {
            const permission = await Permission.query().findById(1);

            expect(permission).toBeUndefined();
        });
    });

    describe('insert', () => {
        it('should create a permission', async () => {
            const expectedOutput = {
                name: 'testpermission',
                description: 'This is a test permission',
                updated_at: null,
            };

            const permission = await Permission.query().insert({
                name: 'testpermission',
                description: 'This is a test permission',
            });

            expect(permission).toBeInstanceOf(Object);
            expect(permission).toMatchObject(expectedOutput);
            expect(permission).toHaveProperty('id');
            expect(permission).toHaveProperty('created_at');
        });
    });

    describe('roles', () => {
        it('should create a role for a permission', async () => {
            const permission = await Permission.query().insert({
                name: 'testpermission',
                description: 'This is a test permission',
            });

            await permission.$relatedQuery('roles').insert({
                name: 'testrole',
                description: 'This is a test role',
            });

            const permissionRoles = await permission.$relatedQuery('roles');

            expect(permissionRoles).toBeInstanceOf(Array);
            expect(permissionRoles).toHaveLength(1);

            const role = permissionRoles[0];

            expect(role).toBeInstanceOf(Object);
            expect(role).toHaveProperty('name', 'testrole');
            expect(role).toHaveProperty('description', 'This is a test role');
        });

        it('should attach a role to a permission', async () => {
            const permission = await Permission.query().insert({
                name: 'testpermission',
                description: 'This is a test permission',
            });

            const createdRole = await Role.query().insert({
                name: 'testrole',
                description: 'This is a test role',
            });

            await permission.$relatedQuery('roles').relate(createdRole.id);

            const permissionRoles = await permission.$relatedQuery('roles');

            expect(permissionRoles).toBeInstanceOf(Array);
            expect(permissionRoles).toHaveLength(1);

            const role = permissionRoles[0];

            expect(role).toBeInstanceOf(Object);
            expect(role).toHaveProperty('name', 'testrole');
            expect(role).toHaveProperty('description', 'This is a test role');
        });
    });
});
