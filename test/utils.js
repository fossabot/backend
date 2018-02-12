import Faker from 'faker';
import { randexp } from 'randexp';

import { getSafeString } from '../src/utils';

import Pack from '../src/models/Pack';
import User from '../src/models/User';

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
        username: randexp(/[A-Za-z0-9-_]{6,16}/),
        password: Faker.internet.password(),
        email: Faker.internet.email(),
    };

    return await User.query().insert({
        ...defaults,
        ...overrides,
    });
}
