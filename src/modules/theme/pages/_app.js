/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
import React from 'react';
import App from 'next/app';
import TagManager from 'react-gtm-module';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '@theme_theme';
import routeMiddleware from '@middleware_route';
import LinearProgress from '@common_loaders/PageProgress';
import requestGraphInternal from '@graphql_request_internal';
import helperCookies from '@helper_cookies';
import Cookies from 'js-cookie';
import Error from '@core/modules/error/pages/default';
import { ThemeProvider } from '@material-ui/core/styles';
import { getAppEnv } from '@root/core/helpers/env';
import { appWithTranslation } from '@i18n';
import { setResolver } from '@helper_localstorage';
import { getLoginInfo, getLastPathWithoutLogin } from '@helper_auth';
import { features, loginRedirect, GTM } from '@config';

/**
 * Uncomment codes below when firebase push notification configuration is enabled
 * */
import Notification from '@lib_firebase/notification';
import firebase from '@lib_firebase/index';

class MyApp extends App {
    constructor(props) {
        super(props);
        this.isLogin = false;
    }

    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }
        const {
            res, pathname, query, req,
        } = ctx;
        // check if login from server
        let isLogin = 0;
        let lastPathNoAuth = '';
        const allcookie = req ? req.cookies : {};
        let isSeller = false;
        if (typeof window !== 'undefined') {
            isLogin = getLoginInfo();
            lastPathNoAuth = getLastPathWithoutLogin();
            isSeller = Cookies.getJSON('cdt')?.customer_company_code;
        } else {
            isSeller = !!JSON.parse(allcookie?.cdt || '{}')?.customer_company_code;
            isLogin = allcookie.isLogin || 0;
            lastPathNoAuth = req && req.session && req.session.lastPathNoAuth ? req.session.lastPathNoAuth : isSeller ? loginRedirect.seller : loginRedirect.admin;
        }
        isLogin = parseInt(isLogin);
        routeMiddleware({
            res, req, query, asPath: pathname, isLogin, lastPathNoAuth, isSeller,
        });

        // add get session from server
        let storeLogo = allcookie.store_logo || {};
        const getStoreLogo = await requestGraphInternal(`
                {
                    getStoreLogo{
                        favicon
                        logo
                        login_side_image
                    }
                }
            `);
        storeLogo = getStoreLogo && getStoreLogo.getStoreLogo && getStoreLogo.getStoreLogo;

        return {
            pageProps: {
                ...pageProps, isLogin, lastPathNoAuth, storeLogo, isSeller,
            },
        };
    }

    componentDidMount() {
        /*
         * ---------------------------------------------
         * REMOVE CONSOLE
         * remove all console.log statement when APP_ENV = 'prod'
         */
        if (getAppEnv() === 'prod') {
            // eslint-disable-next-line no-console
            console.log = () => { };
        }

        /*
         * ---------------------------------------------
         * FIREBASE INITIALIZATION
         */
        const appEnv = getAppEnv();
        const firebaseApiKey = features.firebaseConfig[appEnv].apiKey ? features.firebaseConfig[appEnv].apiKey : features.firebaseConfig.prod.apiKey;

        if (firebaseApiKey !== '' && features.pushNotification.enabled) {
            // initial firebase messaging
            Notification.init();
            // handle if have message on focus
            try {
                const messaging = firebase.messaging();
                // Handle incoming messages. Called when:
                // - a message is received while the app has focus
                // - the user clicks on an app notification created by a service worker
                //   `messaging.setBackgroundMessageHandler` handler.
                messaging.onMessage((payload) => {
                    navigator.serviceWorker.ready.then((registration) => {
                        // This prevents to show one notification for each tab
                        setTimeout(() => {
                            // eslint-disable-next-line no-console
                            console.log('[firebase-messaging-sw.js] Received foreground message ', payload);
                            const lastNotification = localStorage.getItem('lastNotification');
                            const isDifferentContent = payload.data.updated_date + payload.data.title !== lastNotification;
                            if (isDifferentContent) {
                                localStorage.setItem('lastNotification', payload.data.updated_date + payload.data.title);
                                registration.showNotification(payload.data.title, {
                                    body: payload.data.body,
                                    vibrate: [200, 100, 200, 100, 200, 100, 200],
                                    icon: payload.data.logo || '',
                                    image: payload.data.image || '',
                                    data: payload.data,
                                });
                            }
                        }, Math.random() * 1000);
                    });
                });
            } catch (err) {
                // eslint-disable-next-line no-console
                console.log(err);
            }
        }

        /*
         * ---------------------------------------------
         * GTM INITIALIZATION
         */

        /* Google Tag Manager
         * NOTE: this GTM functionality includes connecting to GA via GTM tag.
         */
        const tagManagerArgs = {
            gtmId: GTM.gtmId[appEnv || 'prod'],
        };
        if (GTM.enable) TagManager.initialize(tagManagerArgs);

        /*
         * LAZY LOADING FONTS
         * Use this to load non critical fonts
         */
        // Fonts();

        /*
         * ---------------------------------------------
         * REMOVE THE SERVER SIDE INJECTED CSS
         * This is for speed performanc purpose
         */
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        /*
         * ---------------------------------------------
         * COOKIE CLEARANCE
         * remove config cookie if the page is reloaded
         */
        if (typeof window !== 'undefined') {
            // eslint-disable-next-line func-names
            window.onbeforeunload = function () {
                setResolver({});
            };
        }
    }

    render() {
        const { Component, pageProps, router } = this.props;
        if (typeof document !== 'undefined') {
            // will run in client's browser only
            const favEl = document.getElementById('favicon');
            favEl.href = pageProps.storeLogo?.favicon || '/assets/img/swiftoms_logo_collapsed.png';
            helperCookies.set('store_logo', pageProps.storeLogo);
        }
        const { isSeller } = pageProps;
        let allowed = true;

        const whitelist = ['/version', '/requestreturn', '/user/account/confirm'];
        if (!whitelist.some((rt) => router.pathname.startsWith(rt))) {
            if (pageProps.isLogin && isSeller && !router.pathname.startsWith('/seller/')) {
                allowed = false;
            }

            if (pageProps.isLogin && !isSeller && router.pathname.startsWith('/seller/')) {
                allowed = false;
            }
        }
        return (
            <>
                <LinearProgress />
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {allowed ? <Component {...pageProps} /> : <Error {...pageProps} statusCode={404} isSeller={isSeller} />}
                </ThemeProvider>
            </>
        );
    }
}
export default (appWithTranslation(MyApp));
