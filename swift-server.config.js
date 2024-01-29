/* eslint-disable max-len */
/* --------------------------------------- */
/* Server Side Configuration
/* --------------------------------------- */
// put all sensitive configuration that is used in server side only here
// this way to avoid sensitive values such as ecnryption key to be included in js bundling and can be exposed in client side.

/* Encryption */
const encryption = {
    key: 'TXAjwm8k53PJG9NacLbyZavvQB2qBh43',
    algorithm: 'aes-256-cbc',
};

/* key server fcm */
const fcm = {
    topic: 'notificationspwa',
    // FCM_KEY_SERVER: 'AAAAR3QV_eY:APA91bH8qpxTbLjDqYAMnHPObCBzH0tc3iBnc3dIdhl58tvixteDBJpi54lrYSNJqqFjJ6d_2v9_DoPHf6AHgMQdEwXZ-oNMp3DTR7A4X-txOTuf9ZkFQDu0zDkH_kPfbM5n8gw7Nqz6',
    FCM_KEY_SERVER: {
        local: 'AAAATzC1YZU:APA91bGahcT_gYXSjR97HKM07m9h96Z2S8l26IGqLPt96dGbJgYvJSLeWlOz5MHM-YwlDSdWQfiyBuVA71ZqmORw8rLDn1VZbXWC8E2KfR1atryxPiWNxxngxwY9ZQJaInik8UHTEBCI',
        dev: 'AAAATzC1YZU:APA91bGahcT_gYXSjR97HKM07m9h96Z2S8l26IGqLPt96dGbJgYvJSLeWlOz5MHM-YwlDSdWQfiyBuVA71ZqmORw8rLDn1VZbXWC8E2KfR1atryxPiWNxxngxwY9ZQJaInik8UHTEBCI',
        stage: 'AAAATzC1YZU:APA91bGahcT_gYXSjR97HKM07m9h96Z2S8l26IGqLPt96dGbJgYvJSLeWlOz5MHM-YwlDSdWQfiyBuVA71ZqmORw8rLDn1VZbXWC8E2KfR1atryxPiWNxxngxwY9ZQJaInik8UHTEBCI',
        prod: 'AAA_atP6wI:APA91bH5yPgFz5KC8l3r0R-ZazgkbQUkYJidlGPenQpnBrfKuAr3PJB8_wvDJb_dki70jKNmyVJ1rtEWus3YOhYgTca6kbziSUL8XfhBKBCEdOwakavD_b7MRG1-cOLuRHN_OmgrhPnr',
    },
};

/* Cookie */
const SESSION_SECRET = 'asdasdd1212ads12!!!@**DADxx1';

// chat config
const chatConfig = {
    username: 'mage2user!2345',
    password: 'Qpoiuuytru88123981723',
};

module.exports = {
    encryption,
    SESSION_SECRET,
    fcm,
    chatConfig,
};
