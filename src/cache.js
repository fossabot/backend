import cacheManager from 'cache-manager';

import { getConfig, environment } from '../config';

const config = getConfig();

const store = config.cache.type === 'memory' ? 'memory' : require(`cache-manager-${config.cache.type}`);

const cache = cacheManager.caching({
    store,
    ...config.cache.options,
    isCacheableValue
});

function isCacheableValue(value) {
    return environment !== 'test' && value !== null && value !== false && value !== undefined;
}

export default cache;

export function getTTL(req) {
    const user = req.user;

    if (!user) {
        return config.cache.ttl.guest;
    }

    if (user.hasRole('admin')) {
        return config.cache.ttl.admin;
    }

    return config.cache.ttl.user;
}