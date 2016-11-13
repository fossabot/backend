import fs from 'fs';
import pug from 'pug';
import path from 'path';
import meta from 'remarkable-meta';
import Remarkable from 'remarkable';

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
    static async render(req, res, next) {
        try {
            let url = req.url.substr(1);

            if (!url) {
                return res.status(200).send(await DocsController.renderMarkdown(path.resolve(`${process.cwd()}/docs/files/index.md`)));
            }

            if (url.substr(-1) === '/') {
                url = `${url}index`;
            }

            const file = path.resolve(`${process.cwd()}/docs/files/${url}.md`);

            if (!fs.existsSync(file)) {
                return res.status(404).send(await DocsController.renderMarkdown(path.resolve(`${process.cwd()}/docs/errors/404.md`)));
            }

            return res.status(200).send(await DocsController.renderMarkdown(file));
        } catch (e) {
            return res.status(500).send(await DocsController.renderMarkdown(path.resolve(`${process.cwd()}/docs/errors/500.md`)));
        }
    }

    /**
     * This will render the given markdown file for the documentation.
     *
     * @param {string} filePath
     * @returns {Promise}
     */
    static async renderMarkdown(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        const templateFile = path.resolve(`${process.cwd()}/docs/templates/base.pug`);

        const markdown = new Remarkable();

        markdown.use(meta);

        const options = {
            'content': markdown.render(content),
            'meta': markdown.meta,
        };

        return await new Promise((resolve, reject) => {
            pug.renderFile(templateFile, options, function (err, contents) {
                if (err) {
                    reject(err);
                }

                return resolve(contents);
            });
        });
    }
}

export default DocsController;