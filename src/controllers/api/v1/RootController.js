import { version } from '../../../../package.json';

class RootController {
    constructor({config, db}) {
        this.config = config;
        this.db = db;
    }

    root(req, res) {
        return res.json({version});
    }
}

export default RootController;