import { Model } from 'objection';
import knexCleaner from 'knex-cleaner';

import knex from '../../src/db';

import Role from '../../src/models/Role';
import User from '../../src/models/User';
import Permission from '../../src/models/Permission';

describe('Model: Role', () => {
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
        it('should return the data for the given role', async () => {
            const expectedOutput = {
                name: 'testrole',
                description: 'This is a test role',
                updated_at: null,
            };

            const created = await Role.query().insert({
                name: 'testrole',
                description: 'This is a test role',
            });

            const role = await Role.query().findById(created.id);

            expect(role).toBeInstanceOf(Object);
            expect(role).toMatchObject(expectedOutput);
            expect(role).toHaveProperty('id');
            expect(role).toHaveProperty('created_at');
        });

        it('should return undefined if a role cannot be found by id', async () => {
            const pack = await Role.query().findById(1);

            expect(pack).toBeUndefined();
        });
    });

    describe('insert', () => {
        it('should create a role', async () => {
            const expectedOutput = {
                name: 'testrole',
                description: 'This is a test role',
                updated_at: null,
            };

            const role = await Role.query().insert({
                name: 'testrole',
                description: 'This is a test role',
            });

            expect(role).toBeInstanceOf(Object);
            expect(role).toMatchObject(expectedOutput);
            expect(role).toHaveProperty('id');
            expect(role).toHaveProperty('created_at');
        });
    });

    describe('users', () => {
        it('should create a user for a role', async () => {
            const expectedOutput = {
                username: 'test',
                email: 'test@example.com',
            };

            const role = await Role.query().insert({
                name: 'testrole',
                description: 'This is a test role',
            });

            await role.$relatedQuery('users').insert({
                username: 'test',
                password: 'test',
                email: 'test@example.com',
            });

            const roleUsers = await role.$relatedQuery('users');

            expect(roleUsers).toBeInstanceOf(Array);
            expect(roleUsers).toHaveLength(1);

            const user = roleUsers[0];

            expect(user).toBeInstanceOf(Object);
            expect(user).toMatchObject(expectedOutput);
        });

        it('should attach a user to a role', async () => {
            const role = await Role.query().insert({
                name: 'testrole',
                description: 'This is a test role',
            });

            const createdUser = await User.query().insert({
                username: 'test',
                password: 'test',
                email: 'test@example.com',
            });

            await role.$relatedQuery('users').relate(createdUser.id);

            const roleUsers = await role.$relatedQuery('users');

            expect(roleUsers).toBeInstanceOf(Array);
            expect(roleUsers).toHaveLength(1);

            const user = roleUsers[0];

            expect(user).toBeInstanceOf(Object);
            expect(user).toHaveProperty('username', 'test');
            expect(user).toHaveProperty('email', 'test@example.com');
        });
    });

    describe('permissions', () => {
        it('should create a permission for a role', async () => {
            const role = await Role.query().insert({
                name: 'testrole',
                description: 'This is a test role',
            });

            await role.$relatedQuery('permissions').insert({
                name: 'testpermission',
                description: 'This is a test permission',
            });

            const permissionRoles = await role.$relatedQuery('permissions');

            expect(permissionRoles).toBeInstanceOf(Array);
            expect(permissionRoles).toHaveLength(1);

            const permission = permissionRoles[0];

            expect(permission).toBeInstanceOf(Object);
            expect(permission).toHaveProperty('name', 'testpermission');
            expect(permission).toHaveProperty('description', 'This is a test permission');
        });

        it('should attach a permission to a role', async () => {
            const role = await Role.query().insert({
                name: 'testrole',
                description: 'This is a test role',
            });

            const createdPermission = await Permission.query().insert({
                name: 'testpermission',
                description: 'This is a test permission',
            });

            await role.$relatedQuery('permissions').relate(createdPermission.id);

            const permissionRoles = await role.$relatedQuery('permissions');

            expect(permissionRoles).toBeInstanceOf(Array);
            expect(permissionRoles).toHaveLength(1);

            const permission = permissionRoles[0];

            expect(permission).toBeInstanceOf(Object);
            expect(permission).toHaveProperty('name', 'testpermission');
            expect(permission).toHaveProperty('description', 'This is a test permission');
        });
    });
});
