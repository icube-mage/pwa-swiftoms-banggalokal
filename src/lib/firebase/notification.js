/* eslint-disable no-empty */
import { features } from '@config';
import { getAppEnv } from '@helpers/env';
import firebase from './index';

const notification = {
    // send token to api
    sendTokenToServer(token) {
        fetch('/auth/fcm-token', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({
                token,
            }),
        });
    },
    getTokenFcm() {
        const messaging = firebase.messaging();
        messaging
            .getToken()
            .then((currentToken) => {
                if (currentToken) {
                    notification.sendTokenToServer(currentToken);
                }
            })
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.log('Unable to retrieve current token ', err);
            });
    },
    updateTokenFcm() {
        const messaging = firebase.messaging();
        // Callback fired if Instance ID token is updated.
        messaging.onTokenRefresh(() => {
            messaging
                .getToken()
                .then((refreshedToken) => {
                    notification.sendTokenToServer(refreshedToken);
                })
                .catch((err) => {
                // eslint-disable-next-line no-console
                    console.log('Unable to retrieve refreshed token ', err);
                });
        });
    },
    init() {
        try {
            const messaging = firebase.messaging();
            const appEnv = getAppEnv();
            const pairKey = features.pushNotification.config.pairKey[appEnv]
                ? features.pushNotification.config.pairKey[appEnv] : features.pushNotification.config.pairKey.prod;

            messaging.usePublicVapidKey(pairKey);

            // request notification
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    notification.getTokenFcm();
                    notification.updateTokenFcm();
                } else {
                    // handle ketika di block
                }
            });
        } catch (err) {}
    },
};

export default notification;
