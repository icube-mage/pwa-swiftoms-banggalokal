const { fcm } = require('../../../swift-server.config');
const { getAppEnv } = require('../../../core/helpers/env');

/* eslint-disable max-len */
module.exports = (req, res) => {
    const { token } = req.body;
    const { topic, FCM_KEY_SERVER } = fcm;
    const appEnv = getAppEnv();
    const fcmkeyserver = FCM_KEY_SERVER[appEnv] ? FCM_KEY_SERVER[appEnv] : FCM_KEY_SERVER.prod;

    const keyserver = `key=${fcmkeyserver}`;

    if (req.session.fcm_token !== token) {
        fetch(`https://iid.googleapis.com/iid/v1/${token}/rel/topics/${topic}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': 0,
                Authorization: keyserver,
            },
        })
            .then(() => {
                req.session.fcm_token = token;
                res.status(200).json({
                    status: 200,
                    message: 'success subscribe token',
                });
            })
            .catch((err) => res.status(500).json(err));
    } else {
        res.json({
            status: 200,
            message: 'subscribe token',
        });
    }
};
