import Faker from 'faker';
import { randexp } from 'randexp';

import { generateUID, getSafeString } from '../src/utils';

import Pack from '../src/models/Pack';
import Role from '../src/models/Role';
import User from '../src/models/User';
import Permission from '../src/models/Permission';

/**
 * Creates a Pack for testing.
 *
 * @param {object} [overrides={}]
 * @returns {Pack}
 */
export async function createPack(overrides = {}) {
    const packName = Faker.random.words(2);
    const safeName = getSafeString(packName);

    const defaults = {
        name: packName,
        safe_name: safeName,
    };

    return await Pack.query().insert({
        ...defaults,
        ...overrides,
    });
}

/**
 * Creates a User for testing.
 *
 * @param {object} [overrides={}]
 * @returns {User}
 */
export async function createUser(overrides = {}) {
    const defaults = {
        username: randexp('[A-Za-z0-9-_]{6,16}'),
        password: Faker.internet.password(),
        email: Faker.internet.email(),
    };

    return await User.query().insert({
        ...defaults,
        ...overrides,
    });
}

/**
 * Creates a Permission for testing.
 *
 * @param {object} [overrides={}]
 * @returns {Permission}
 */
export async function createPermission(overrides = {}) {
    const defaults = {
        name: Faker.random.words(2),
        description: Faker.random.words(10),
    };

    return await Permission.query().insert({
        ...defaults,
        ...overrides,
    });
}

/**
 * Creates a Role for testing.
 *
 * @param {object} [overrides={}]
 * @returns {Role}
 */
export async function createRole(overrides = {}) {
    const defaults = {
        name: Faker.random.words(2),
        description: Faker.random.words(10),
    };

    return await Role.query().insert({
        ...defaults,
        ...overrides,
    });
}

/**
 * Adds the given Permission to the given Role.
 *
 * @param {Permission} permission
 * @param {Role} role
 * @returns {UserRole}
 */
export async function addPermissionToRole(permission, role) {
    return await role.$relatedQuery('permissions').relate({
        id: permission.id,
    });
}

/**
 * Adds the given Role to the given User.
 *
 * @param {Role} role
 * @param {User} user
 * @returns {UserRole}
 */
export async function addRoleToUser(role, user) {
    return await user.$relatedQuery('roles').relate({
        id: role.id,
    });
}
