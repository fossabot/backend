import AccessControl from 'accesscontrol';

import grants from './grants';

const ac = new AccessControl(grants);

// don't allow changing
ac.lock();

export default ac;
