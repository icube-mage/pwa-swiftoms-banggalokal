/* eslint-disable no-lonely-if */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import {
    setLastPathWithoutLogin,
    removeLastPathWithoutLogin,
} from '@helper_auth';
import Router from 'next/router';
import { modules } from '@config';

export const isRouteNeedRedirectWhenLogin = (path) => {
    const route = [
        '/login',
        '/register',
        '/forgotpassword',
        '/seller/register',
    ];
    return !!route.find((val) => val === path);
};

export const isRouteNeedAuth = (path) => {
    const route = [
        '/',
        '/seller',
    ];
    return !route.length || !!route.find((val) => val === path);
};

const setLastPathNoAuth = (req, value = '') => {
    if (req && req.session) {
        req.session.lastPathNoAuth = value;
    }
};

const routeMiddleware = (params) => {
    const {
        req, res, query, asPath, isLogin, lastPathNoAuth,
    } = params;
    /**
     * middleware enabled or disabled feature
     */
    for (const key in modules) {
        const feature = modules[key];
        if (asPath.indexOf(feature.path) >= 0 && !feature.enabled) {
            if (typeof window !== 'undefined') {
                window.location.href = '/';
            } else if (res) {
                res.writeHead(301, {
                    Location: '/',
                });
                res.end();
            }
            return {};
        }
    }

    if (isLogin) {
        if (isRouteNeedRedirectWhenLogin(asPath)) {
            if (query.redirect && query.redirect !== '') {
                if (typeof window !== 'undefined') {
                    Router.push(query.redirect);
                    removeLastPathWithoutLogin();
                } else {
                    res.redirect(query.redirect);
                    setLastPathNoAuth(req, '');
                }
            } else if (typeof window !== 'undefined') {
                Router.push(lastPathNoAuth);
                removeLastPathWithoutLogin();
            } else {
                res.redirect(lastPathNoAuth);
                setLastPathNoAuth(req, '');
            }
        } else {
            typeof window !== 'undefined' ? removeLastPathWithoutLogin() : setLastPathNoAuth(req, '');
        }
    } else {
        if (isRouteNeedAuth(asPath)) {
            if (typeof window !== 'undefined') {
                Router.push('/login');
                setLastPathWithoutLogin(asPath);
            } else {
                setLastPathNoAuth(req, asPath);
                res.redirect('/login');
            }
        } else {
            typeof window !== 'undefined' ? removeLastPathWithoutLogin() : setLastPathWithoutLogin(req, '');
        }
    }
};

export default routeMiddleware;
