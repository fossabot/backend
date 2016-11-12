import fs from 'fs';
import path from 'path';

import BaseController from './BaseController';

/**
 * The DocsController controls the routes for the documentation.
 */
class DocsController extends BaseController {
    /**
     * This returns homepage for the documentation.
     *
     * @param {Object} req
     * @param {Object} res
     * @param {function} next
     * @returns {Object}
     */
    static render(req, res, next) {
        let url = req.url.substr(1);

        if (!url) {
            return res.render('../../docs/index.md');
        }

        if (url.indexOf('/') !== -1 && url.indexOf('v1/') !== 0) {
            return next();
        }

        if (url.substr(-1) === '/') {
            url = `${url}index`;
        }

        const file = path.resolve(`${process.cwd()}/docs/${url}.md`);

        if (fs.existsSync(file)) {
            return res.render(file);
        }

        return next();
    }
}

export default DocsController;