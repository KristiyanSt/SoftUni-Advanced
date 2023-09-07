const { getById } = require("../services/cryptoService.js");

module.exports = () => {
    return async (req, res, next) => {
        if (req.params.id) {
            const crypto = await getById(req.params.id);

            if (!crypto) {
                return res.render('404', {
                    title: '404'
                });
            }

            req.crypto = crypto;
        }

        next();
    }
}