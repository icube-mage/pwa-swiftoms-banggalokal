/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */

let WebFont = '';

if (typeof window !== 'undefined') {
    WebFont = require('webfontloader');
}

const Fonts = () => {
    if (typeof window !== 'undefined') {
        WebFont.load({
            custom: {
                families: [
                    'Plus Jakarta Sans',
                ],
                urls: [
                    'https://fonts.googleapis.com/css?family=Plus Jakarta Sans',
                ],
            },
        });
    }
};

export default Fonts;
