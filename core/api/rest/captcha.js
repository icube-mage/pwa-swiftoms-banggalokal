const qs = require('querystring');
const { recaptcha } = require('../../../swift.config');
const { getAppEnv } = require('../../helpers/env');

module.exports = (req, res) => {
    const { response, secret } = req.body;
    const appEnv = getAppEnv();
    const secretConfig = recaptcha.serverKey[appEnv] || recaptcha.serverKey.prod;
    fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        body: qs.stringify({
            response,
            secret: secret || secretConfig,
        }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
    })
        .then((data) => data.json())
        .then((json) => {
            res.status(200).json(json);
        })
        .catch((err) => res.status(500).json(err));
};
