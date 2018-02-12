import passport from 'koa-passport';
import { Strategy } from 'passport-local';

import User from './models/User';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.query().findOne({ id });

        return done(user || null);
    } catch (err) {
        return done(err);
    }
});

passport.use(
    'local',
    new Strategy(
        {
            session: false,
        },
        async (email, password, done) => {
            try {
                // find user by username or email
                const user = await User.query()
                    .where({ email })
                    .orWhere({ username: email })
                    .first();

                if (!user) {
                    return done(null, false);
                }

                return done(null, user.verifyPassword(password) && user);
            } catch (err) {
                return done(err);
            }
        }
    )
);

export default passport;
