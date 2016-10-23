import cacheManager from 'cache-manager';

import { getConfig } from '../config';

const config = getConfig();

const store = config.cache.type === 'memory' ? 'memory' : require(`cache-manager-${config.cache.type}`);

const cache = cacheManager.caching({
    store,
    ...config.cache.options
});

export default cache;