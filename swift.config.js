/* --------------------------------------- */
/* STORE CONFIGURATION
/* --------------------------------------- */

/* Custom base path
 * leave it blank if there is no custom base path
 * url/path on several files should be changed manually (/public/static/maintenance.html and /public/manifest.json)
 * move locales folder from /public/static into /public/{basePath}/static
 * NOTE: custom base path below should not end with '/'
 */
const basePath = '';

const HOST = {
    local: 'http://localhost:3000',
    dev: 'https://pwa-oms-multitenant.testingnow.me',
    stage: 'https://oms-pwa-multitenant.huawei-staging.testingnow.me',
    prod: 'https://v3.swiftoms.id',
};
// const HOST = {
//     local: 'http://localhost:3000',
//     dev: 'http://localhost:3000',
//     stage: 'http://localhost:3000',
//     prod: 'http://localhost:3000',
// };

/* Magento GraphQL Endpoint */
const graphqlEndpoint = {
    local: 'https://oms-multitenant.testingnow.me/graphql',
    dev: 'https://oms-multitenant.testingnow.me/graphql',
    stage: 'https://oms-multitenant.huawei-staging.testingnow.me/graphql',
    prod: 'https://gqlv3.swiftoms.id/graphql',
};

/* --------------------------------------- */
/* FEATURES CONFIGURATION
/* --------------------------------------- */

const installMessage = 'Get our free app.';
const appName = 'Swift APP';

/* Social Sharing */
const shareIcon = {
    facebook: true,
    twitter: true,
    line: true,
    email: true,
    telegram: true,
    pinterest: false,
    linkedin: false,
};

/* Password Validator */
const passwordStrength = {
    minValue: 8,
    maxValue: 20,
    numberOfRequiredClass: 3, // Lowercase + Uppercse + Dgits + spesial caracter = 4
};

/* Translation */
/* Default Language
 * The default language used for i18n and headers in graphql will be taken from graphql availableStores,
 * if graphql fails to retrieve data, it will use the defaultLanguage from config translation
 */
const translation = {
    defaultLanguage: 'id', // just change to your default language
    languages: ['id', 'en'], // array code language what you want
    // language label code
    languagesLabel: {
        id: 'Indonesia',
        en: 'English',
    },
};

/* Google Tag Manager
 * before enable this configuration, firstly you need to import the gtm tags json.
 * gtm tags json need to be exported from Magento admin in Welpixel GTM configuration.
 * adjust the tag name if you want before import into GTM dashboard setting.
 * as reference you can find sample gtm tags in folder "sample/gtm" folder
 * NOTE: this GTM functionality includes connecting to GA via GTM tag.
 */
const GTM = {
    enable: true,
    gtmId: {
        local: 'GTM-TFWH463Q', // sample: GTM-N76V8KQ
        dev: 'GTM-TFWH463Q', // sample: GTM-N76V8KQ
        stage: 'GTM-TZR73K2D', // sample: GTM-N76V8KQ
        prod: 'GTM-5QXTF64D', // sample: GTM-N76V8KQ
    },
};

/* Recapthca Configuration */
const recaptcha = {
    enable: false,
    siteKey: {
        local: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
        dev: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
        stage: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
        prod: '', // sample: 6LcZmLEZAAAAADkdlp8S8tExis2EVhNiuMv6ayo7
    },
    serverKey: {
        local: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
        dev: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
        stage: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
        prod: '', // sample: 6LcZmLEZAAAAANHhkqwoRna2vqIVWHNKwOvxm26n
    },
};

const sentry = {
    enabled: false,
    enableMode: 'prod',
    performanceTracing: false,
    errorTracing: true,
    tracesSampleRate: 1.0,
    dsn: {
        local: 'https://eb69d75c06b04174881af22fdb3b2f35@sentry.testingnow.me/3',
        dev: 'https://eb69d75c06b04174881af22fdb3b2f35@sentry.testingnow.me/3',
        stage: 'https://eb69d75c06b04174881af22fdb3b2f35@sentry.testingnow.me/3',
        prod: 'https://eb69d75c06b04174881af22fdb3b2f35@sentry.testingnow.me/3',
    },
};

/* Loader */
const loaderImage = '/assets/img/loader.svg';

/* --------------------------------------- */
/* LOCAD DATA CACHE & COKIES
/* --------------------------------------- */

const expiredCookies = 6;
const storeConfigNameCookie = 'storeConfig';
const nameCartId = 'nci';
const custDataNameCookie = 'cdt';
const sellerDataNameCookie = 'sdt';
const nameCheckoutCookie = 'ccdt';
const nameGlobalCookie = 'spwa';
const nameToken = 'sk';
const expiredToken = new Date(Date.now() + 1000 * 60 * 60 * 24);
const expiredDefault = 365;
const localResolverKey = 'resolver';
const loginRedirect = {
    seller: '/seller/dashboard',
    admin: '/',
};

const features = {
    ssrCache: false,
    facebookMetaId: {
        enabled: false,
        app_id: '', // if enabled add fb app id here. e.g. 3080154482073095
    },
    vesMenu: {
        enabled: true,
    },
    customInstallApp: {
        enabled: true,
    },
    firebaseConfig: {
        local: {
            apiKey: 'AIzaSyAkbixPXhhChuPFQx8owyiq0le2Z8vyT5I',
            authDomain: 'sirclo-1152.firebaseapp.com',
            databaseURL: 'https://sirclo-1152.firebaseio.com',
            projectId: 'sirclo-1152',
            storageBucket: 'sirclo-1152.appspot.com',
            messagingSenderId: '340119609749',
            appId: '1:340119609749:web:758811193ba5ae1878d69c',
        },
        dev: {
            apiKey: 'AIzaSyAkbixPXhhChuPFQx8owyiq0le2Z8vyT5I',
            authDomain: 'sirclo-1152.firebaseapp.com',
            databaseURL: 'https://sirclo-1152.firebaseio.com',
            projectId: 'sirclo-1152',
            storageBucket: 'sirclo-1152.appspot.com',
            messagingSenderId: '340119609749',
            appId: '1:340119609749:web:758811193ba5ae1878d69c',
        },
        stage: {
            apiKey: 'AIzaSyAkbixPXhhChuPFQx8owyiq0le2Z8vyT5I',
            authDomain: 'sirclo-1152.firebaseapp.com',
            databaseURL: 'https://sirclo-1152.firebaseio.com',
            projectId: 'sirclo-1152',
            storageBucket: 'sirclo-1152.appspot.com',
            messagingSenderId: '340119609749',
            appId: '1:340119609749:web:758811193ba5ae1878d69c',
        },
        prod: {
            apiKey: 'AIzaSyDH11IAsly0JKgv-9JhTPjQeeUsJlLRXEM',
            authDomain: 'sirclo-iii-prod.firebaseapp.com',
            projectId: 'sirclo-iii-prod',
            storageBucket: 'sirclo-iii-prod.appspot.com',
            messagingSenderId: '1089500867330',
            appId: '1:1089500867330:web:7b35d15bfc40a20e17701b',
            measurementId: 'G-KW4TVH08TK',
        },
    },
    chatSystem: {
        enabled: false,
        graphqlEndpoint: {
            local: 'https://chat-swift.testingnow.me/graphql',
            dev: 'https://chat-swift.testingnow.me/graphql',
            stage: 'https://chat-swift.testingnow.me/graphql',
            prod: 'https://chat-swift.testingnow.me/graphql',
        },
        graphqlContext: 'chatSystem',
    },
    pushNotification: {
        enabled: true,
        config: {
            // key from cloud messaging sertificat web push
            // pairKey: 'BCidvG55K4OZ1GuFITBzTpEUvR2K791RzPeApZCfyMQnccI4tQcwZNvyg5oorpaSKL2rB3nhsuavjHzqVeJXEAw', // sample: BCidvG55K4OZ1GuFITBzTpEUvR2K791RzPeApZCfyMQnccI4tQcwZNvyg5oorpaSKL2rB3nhsuavjHzqVeJXEAw
            pairKey: {
                local: 'BFjca_arfMvAN1gOivIhl29vQGULxRnvp37sMPPX0yctxSxA5qQW3niQw7dMoMUR6FmbaFkpEB_0aNEi1_BPIYA',
                dev: 'BFjca_arfMvAN1gOivIhl29vQGULxRnvp37sMPPX0yctxSxA5qQW3niQw7dMoMUR6FmbaFkpEB_0aNEi1_BPIYA',
                stage: 'BFjca_arfMvAN1gOivIhl29vQGULxRnvp37sMPPX0yctxSxA5qQW3niQw7dMoMUR6FmbaFkpEB_0aNEi1_BPIYA',
                prod: 'BE9xC2KiHb0Ad2teIBOYZNrHD-lNM9tujAC60WZO9OzBpcThNn0ZTRbu0hBWf_p3S-XWnmAwODENJiLkgc1VjCw',
            },
        },
    },
    teamworkChat: {
        enabled: true,
        basehref: 'https://teamwork.icubeonline.com',
        token: '7433609a-5393-11ee-98ed-3a17728ba9f7',
    },
};

const nossrCache = [
    '/graphql',
];

const debuging = {
    originalError: false,
};

/* Translation CSV Dir */
const translationCSVDir = 'public/static/locales_csv/';
const translationJSONDir = 'public/static/locales/';

/* Docs Guide */
const docsGuide = {
    local: 'https://docs.swiftstore.testingnow.me',
    dev: 'https://docs.swiftstore.testingnow.me',
    stage: 'https://doc.swiftstore.id',
    prod: 'https://doc.swiftstore.id',
};

module.exports = {
    sentry,
    debuging,
    GTM,
    HOST,
    basePath,
    graphqlEndpoint,
    shareIcon,
    passwordStrength,
    translation,
    expiredCookies,
    storeConfigNameCookie,
    nameCartId,
    nameToken,
    expiredToken,
    expiredDefault,
    loaderImage,
    custDataNameCookie,
    sellerDataNameCookie,
    nameCheckoutCookie,
    nameGlobalCookie,
    features,
    nossrCache,
    recaptcha,
    installMessage,
    appName,
    localResolverKey,
    translationCSVDir,
    translationJSONDir,
    loginRedirect,
    docsGuide,
};
