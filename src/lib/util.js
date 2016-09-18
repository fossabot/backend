/**
 * Creates a callback that proxies node callback style arguments to an Express Response object.
 *
 * @param {express.Response} res Express HTTP Response
 * @param {number} status Status code to send on success
 * @returns {function}
 */
export function toRes(res, status = 200) {
    return (err, thing) => {
        if (err) return res.status(500).send(err);

        if (thing && typeof thing.toObject === 'function') {
            thing = thing.toObject();
        }

        return res.status(status).json(thing);
    };
}