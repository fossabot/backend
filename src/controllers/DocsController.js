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
     * @returns {Object}
     */
    static async render(req, res) {
        try {
            let url = req.url && req.url.substr(1);

            if (!url) {
                if (req.originalUrl === '/docs') {
                    return res.redirect('/docs/');
                }

                return res.status(200).send(await DocsController.renderMarkdown(path.resolve(`${process.cwd()}/docs/files/index.md`)));
            }

            if (url.substr(-1) === '/') {
                url = `${url}index`;
            }

            const file = path.resolve(`${process.cwd()}/docs/files/${url}.md`);

            if (!fs.existsSync(file)) {
                const indexFile = path.resolve(`${process.cwd()}/docs/files/${url}/index.md`);

                if (!fs.existsSync(indexFile)) {
                    return res.status(404).send(await DocsController.renderMarkdown(path.resolve(`${process.cwd()}/docs/errors/404.md`)));
                }

                return res.redirect(`/docs${req.url}/`);
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

        // this adds in anchor tags to first and second level headings
        markdown.use(function (remarkable) {
            remarkable.renderer.rules.heading_open = DocsController.headingsOpenParser;
            remarkable.renderer.rules.heading_close = DocsController.headingsCloseParser;
        });

        const options = {
            'content': markdown.render(content),
            'meta': markdown.meta
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

    /**
     * This will parse all opening headings and add in anchor tags for all second level headings.
     *
     * @param {Object} tokens
     * @param {number} idx
     * @returns {string}
     */
    static headingsOpenParser(tokens, idx) {
        if (tokens[idx].hLevel === 2) {
            return `<h${tokens[idx].hLevel} id="${DocsController.slugify(tokens[idx + 1].content)}"><a class="heading-anchor" href="#${DocsController.slugify(tokens[idx + 1].content)}">`;
        } else {
            return `<h${tokens[idx].hLevel}>`;
        }
    }

    /**
     * This will parse all closing headings to close off a tags.
     *
     * @param {Object} tokens
     * @param {number} idx
     * @returns {string}
     */
    static headingsCloseParser(tokens, idx) {
        if (tokens[idx].hLevel === 2) {
            return `</a></h${tokens[idx].hLevel}>`;
        } else {
            return `</h${tokens[idx].hLevel}>`;
        }
    }

    /**
     * This will slugify a url for use in anchor tags on headers.
     *
     * @param {string} str
     * @returns {string}
     */
    static slugify(str) {
        str = DocsController.getTitle(str);
        str = str.toLowerCase();
        str = str.split(/ /).join('-');
        str = str.split(/\t/).join('--');
        str = str.split(/[|$&`~=\\\/@+*!?({[\]})<>=.,;:'"^]/).join('');
        str = str.split(/[。？！，、；：“”【】（）〔〕［］﹃﹄“ ”‘’﹁﹂—…－～《》〈〉「」]/).join('');
        return str;
    }

    /**
     * This will get the title from the given string.
     *
     * @param {string} str
     * @returns {string}
     */
    static getTitle(str) {
        if (/^\[[^\]]+\]\(/.test(str)) {
            var m = /^\[([^\]]+)\]/.exec(str);
            if (m) return m[1];
        }

        return str;
    }
}

export default DocsController;