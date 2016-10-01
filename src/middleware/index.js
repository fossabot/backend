import { Router } from 'express';

/**
 * This middleware checks to see if the given user/token combination has the provided scope and/or role.
 *
 * @param {string} scope
 * @param {string} role
 * @returns {function}
 */
export function checkPermissions({scope = null, role = null}) {
    return (req, res, next) => {
        const user = req.user;
        const {token} = req.authInfo;

        if (scope && !token.hasScope(scope)) {
            return next(new Error(`Invalid scope on token. Scope '${scope}' is needed.`));
        }

        if (role && !user.hasRole(role)) {
            return next(new Error(`User doesn\'t have required role. '${role}' role is needed.`));
        }

        return next();
    };
}

export default () => {
    const middleware = Router();

    return middleware;
}