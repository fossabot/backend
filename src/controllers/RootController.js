import BaseController from './BaseController';

/**
 * The RootController controls the routes for the root of the API.
 */
class RootController extends BaseController {
    /**
     * This returns the current version of the api as defined in the package.json.
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object}
     */
    login(req, res) {
        return res.render('login', {error: req.flash('error')});
    }

    /**
     * This returns the current version of the api as defined in the package.json.
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object}
     */
    logout(req, res) {
        const redirectUrl = req.header('Referer') || '/';

        req.logout();
        res.redirect(redirectUrl);
    }
}

export default RootController;