import Faker from 'faker';

import Role from '../src/models/Role';
import User from '../src/models/User';
import OAuthScope from '../src/models/OAuthScope';

export async function createUser(overrides) {
    const defaults = {
        username: Faker.internet.userName(),
        password: Faker.internet.password(),
        email: Faker.internet.email()
    };

    return await User.query().insert({
        ...defaults,
        ...overrides
    });
}

export async function createRole(overrides) {
    const createdById = overrides.created_by || (await createUser()).id;

    const defaults = {
        name: Faker.random.word(),
        description: Faker.random.words(10),
        created_by: createdById
    };

    return await Role.query().insert({
        ...defaults,
        ...overrides
    });
}

export async function createUserWithRole(userOverrides, roleOverrides, overrides) {
    const user = createUser(userOverrides);
    const role = createRole(roleOverrides);

    const createdById = overrides.created_by || createUser().id;

    const defaults = {
        user_id: user.id,
        role_id: role.id,
        created_by: createdById
    };

    return await Role.$relatedQuery('users').insert({
        ...defaults,
        ...overrides
    });
}

export async function createScope(overrides) {
    const defaults = {
        name: Faker.random.word(),
        description: Faker.random.words(10)
    };

    return await OAuthScope.query().insert({
        ...defaults,
        ...overrides
    });
}