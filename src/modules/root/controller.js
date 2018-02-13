import config from 'config';

import { version } from '../../../package.json';

/**
 * This returns information about the api.
 *
 * @param {object} ctx
 */
export function get(ctx) {
    ctx.ok({
        version,
        contact: {
            security: config.get('contact.security'),
            issues: config.get('contact.issues'),
            discord: config.get('contact.discord'),
            general: config.get('contact.general'),
        },
    });
}
