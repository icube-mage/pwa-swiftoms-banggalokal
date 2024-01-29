/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
/* eslint-disable no-console */
import React from 'react';
import App from 'next/app';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '@theme_theme';
import { appWithTranslation } from '@i18n';
import { getLoginInfo, getLastPathWithoutLogin } from '@helper_auth';
// import PageProgressLoader from '@common_loaders/PageProgress';
import routeMiddleware from '@middleware_route';
import LinearProgress from '@common_loaders/PageProgress';
import requestGraphInternal from '@graphql_request_internal';
import helperCookies from '@helper_cookies';
import Cookies from 'js-cookie';
import Error from '@core/modules/error/pages/default';

/**
 * Uncomment codes below when firebase push notification configuration is enabled
 * */
// import Notification from '@lib_firebase/notification';
// import firebase from '@lib_firebase/index';

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
            lastPathNoAuth = req && req.session && req.session.lastPathNoAuth ? req.session.lastPathNoAuth : isSeller ? '/seller/order' : '/';
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
        /**
         * Uncomment codes below when firebase push notification configuration is enabled
         * */
        // if (features.pushNotification.enabled) {
        //     // initial firebase messaging
        //     Notification.init();
        //     // handle if have message on focus
        //     try {
        //         const messaging = firebase.messaging();
        //         // Handle incoming messages. Called when:
        //         // - a message is received while the app has focus
        //         // - the user clicks on an app notification created by a service worker
        //         //   `messaging.setBackgroundMessageHandler` handler.
        //         messaging.onMessage((payload) => {
        //             console.log(payload);
        //             navigator.serviceWorker.ready.then((registration) => {
        //                 registration.showNotification('HQQ Go ditemukan!', {
        //                     body: payload.data.body,
        //                     vibrate: [200, 100, 200, 100, 200, 100, 200],
        //                     data: payload.notification,
        //                     actions: [
        //                         {
        //                             action: 'open-event',
        //                             title: 'Buka Event',
        //                         },
        //                     ],
        //                 });
        //             });
        //         });
        //     } catch (err) {
        //         console.log(err);
        //     }
        // }

        // lazy load fonts. use this to load non critical fonts
        // Fonts();
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
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
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    {/* <PageProgressLoader /> */}
                    {allowed ? <Component {...pageProps} /> : <Error {...pageProps} statusCode={404} isSeller={isSeller} />}
                </ThemeProvider>
            </>
        );
    }
}
export default (appWithTranslation(MyApp));
