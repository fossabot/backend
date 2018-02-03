import User from '../../models/User';

export async function getAll(ctx) {
    const users = await User.query();

    ctx.body = { users };
}
