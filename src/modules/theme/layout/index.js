/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Cookies from 'js-cookie';
import { useTranslation } from '@i18n';

import Hidden from '@material-ui/core/Hidden';
import CircularProgress from '@material-ui/core/CircularProgress';

import Sidebar from '@modules/theme/layout/components/sidebar';
import SidebarSeller from '@modules/theme/layout/components/seller/sidebar';
import Header from '@modules/theme/layout/components/header';
import HeaderSeller from '@modules/theme/layout/components/seller/header';
import gqlNotification from '@modules/notification/services/graphql';

import gqlNotificationSeller from '@sellermodules/notification/services/graphql';
import gqlNotificationUpdateSeller from '@sellermodules/notificationupdate/services/graphql';
import gqlServices from '@modules/theme/services/graphql';

import { helpersMenuList } from '@modules/theme/helpers';
import sellerMenus from '@modules/theme/helpers/seller';
import useStyles from '@modules/theme/layout/style';

import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { sentry } from '@root/swift.config.js';
import { getAppEnv } from '@helpers/env';
import { getLocalStorage, setLocalStorage } from '@helper_localstorage';
import BackdropLoad from '@helper_backdropload';
import { features } from '@config';

import MobileMenu from '@modules/theme/layout/components/mobilemenu';

const appEnv = getAppEnv();
sentry.enabled && sentry.enableMode === appEnv ? Sentry.init({
    dsn: sentry.errorTracing ? sentry.dsn[appEnv] : null,
    integrations: sentry.performanceTracing ? [new BrowserTracing()] : [],
    tracesSampleRate: sentry.tracesSampleRate,
}) : null;

const Loading = dynamic(() => import('@common_loaders/Backdrop'), { ssr: false });
const Message = dynamic(() => import('@common_toast'), { ssr: false });

const Layout = (props) => {
    const {
        children, pageConfig, useBreadcrumbs = true, plainMode = false, seller, chatAgentCode = '', hideMobileMenu,
    } = props;
    const classes = useStyles();
    const router = useRouter();
    const [open, setOpen] = React.useState(false);
    const [load, setLoad] = React.useState(false);
    const [loadLang, setLoadLang] = React.useState(false);
    const [activeParentMenu, setActiveParentMenu] = React.useState();
    const [activeChildMenu, setActiveChildMenu] = React.useState();
    const [backdropLoader, setBackdropLoader] = React.useState(false);
    const [currentLocation, setCurrentLocation] = React.useState('');
    const [toastMessage, setToastMessage] = React.useState({
        open: false,
        variant: '',
        text: '',
    });
    const storeLogo = Cookies.getJSON('store_logo');
    const { t } = useTranslation('menu');

    const [getAcl] = gqlServices.customerAccessControlListLazy();
    const [getStoreConfigWave] = gqlServices.getStoreConfigWave();
    const [getStoreConfigBatch] = gqlServices.getStoreConfigBatch();
    const [getStoreConfigTada] = gqlServices.getStoreConfigTada();
    const [getStoreConfigVendor] = gqlServices.getStoreConfigVendor();

    const [getNotificationList, notificationRes] = gqlNotification.getNotificationList({
        pageSize: 4,
        currentPage: 1,
        filter: {
            is_read: {
                eq: '0',
            },
            type: { eq: 'web' },
        },
        sort: {
            id: 'ASC',
        },
    });

    const [getSellerNotificationsList, sellerNotificationRes] = gqlNotificationSeller.getSellerNotifications({
        pageSize: 4,
        currentPage: 1,
        filter: {
            is_read: {
                eq: '0',
            },
        },
        sort: {
            created_at: 'DESC',
        },
    });

    const [getInformationUpdateList, informationUpdateRes] = gqlNotificationUpdateSeller.getInformationUpdateList({
        pageSize: 4,
        currentPage: 1,
        sort: {
            inserted_at: 'DESC',
        },
    });

    const menuList = seller ? sellerMenus(t) : helpersMenuList(t);
    const mappedMenuList = menuList.reduce((accumulator, parent) => {
        const parentBreadcrumb = { url: parent.url || '', label: parent.label };
        const mappedParent = {
            key: parent.key,
            url: parent.url || '',
            breadcrumb: [parentBreadcrumb],
        };
        accumulator.push(mappedParent);
        if (parent && parent.children && parent.children.length) {
            const mappedChildren = parent.children.map((child) => {
                const childBreadcrumb = [parentBreadcrumb, { url: child.url || '', label: child.label }];
                return {
                    key: child.key,
                    url: child.url || '',
                    parentKey: parent.key,
                    breadcrumb: childBreadcrumb,
                };
            });
            accumulator = [...accumulator, ...mappedChildren];
        }
        return accumulator;
    }, []);

    const getBreadcrumbData = () => {
        const activeMenu = mappedMenuList.find((e) => e.url === router.pathname);
        let activeMenuBreadcrumb = [];
        if (pageConfig?.customBreadcrumb) {
            activeMenuBreadcrumb = pageConfig.customBreadcrumb;
        } else if (activeMenu) {
            activeMenuBreadcrumb = activeMenu && activeMenu.breadcrumb;
        } else {
            const activeMenuSecondary = mappedMenuList.find((e) => e.url === router.pathname?.split('/').slice(0, 3).join('/'));
            activeMenuBreadcrumb = (activeMenuSecondary && activeMenuSecondary.breadcrumb) || [];
            activeMenuBreadcrumb.push({ url: router.asPath, label: pageConfig?.title ? pageConfig.title : currentLocation });
        }
        return [{ url: '/', label: 'Home' }, ...activeMenuBreadcrumb];
    };

    const handleCloseMessage = () => {
        setToastMessage({ ...toastMessage, open: false });
    };

    const updateNotification = () => {
        if (typeof window !== 'undefined' && router.pathname.split('/')?.[1] !== 'login' && Cookies.get('isLogin') === '1') {
            if (seller) {
                getSellerNotificationsList();
                getInformationUpdateList();
            } else {
                getNotificationList();
            }
        }
    };

    const showSessionExpired = () => {
        window.toastMessage({
            open: true,
            text: `${t('Your_session_has_expired')} ${t('Please_login_again')}`,
            variant: 'error',
        });
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.backdropLoader = (e) => { setBackdropLoader(e); updateNotification(); };
            window.toastMessage = setToastMessage;
            window.showSessionExpired = showSessionExpired;
            if (window.innerWidth >= 768) setOpen(true);
        }
    }, []);

    useEffect(() => {
        updateNotification();
    }, [router]);

    const removeLastPathOnUrl = (url) => {
        const splittedUrl = url.split('/');
        const slicedCount = splittedUrl?.length > 5 ? 4 : 3;
        const output = splittedUrl.slice(0, slicedCount).join('/');
        return output;
    };

    useEffect(() => {
        const activeMenuFirstChild = mappedMenuList.find((e) => e.url === (router && router.asPath) || e.url === (router && router.pathname));

        if (activeMenuFirstChild && activeMenuFirstChild.parentKey) {
            if (activeMenuFirstChild && activeMenuFirstChild.parentKey) {
                setActiveChildMenu(activeMenuFirstChild);
                setActiveParentMenu(mappedMenuList.find((e) => e.key === activeMenuFirstChild.parentKey));
            } else {
                setActiveParentMenu(activeMenuFirstChild);
            }
        } else {
            let activeMenuSecondChild = null;

            for (let i = 0; i < mappedMenuList.length; i += 1) {
                if (mappedMenuList[i].url.includes(removeLastPathOnUrl(router && router.asPath) || removeLastPathOnUrl(router && router.pathname))) {
                    activeMenuSecondChild = mappedMenuList[i];
                    break;
                }
            }
            if (activeMenuSecondChild && activeMenuSecondChild.parentKey) {
                setActiveChildMenu(activeMenuSecondChild);
                setActiveParentMenu(mappedMenuList.find((e) => e.key === activeMenuSecondChild.parentKey));
            } else {
                setActiveParentMenu(activeMenuSecondChild);
            }
        }
    }, [router]);

    const showHeader = () => {
        if (typeof pageConfig === 'undefined' || (pageConfig && typeof pageConfig.header === 'undefined')) {
            return true;
        }
        return pageConfig && pageConfig.header;
    };

    const showSidebar = () => {
        if (typeof pageConfig === 'undefined' || (pageConfig && typeof pageConfig.sidebar === 'undefined')) {
            return true;
        }
        return pageConfig && pageConfig.sidebar;
    };

    const containerHeader = () => {
        if (pageConfig?.noPaddingContainer) {
            return classes.contentNoHeader;
        }
        return showHeader() ? classes.content : classes.contentNoHeader;
    };

    useEffect(() => {
        setCurrentLocation((old) => {
            if (activeChildMenu?.breadcrumb?.filter((val) => val?.url)?.[0]?.label) {
                const labelMenu = activeChildMenu?.breadcrumb?.filter((val) => val?.url)?.[0]?.label;
                if (router.pathname.split('/').length > 3) {
                    const lengthPath = router.pathname.split('/').length;

                    if (!router.pathname.split('/')[lengthPath - 1].includes('[')) {
                        const pathRoute = router.pathname.split('/')[lengthPath - 1];
                        return `${pathRoute?.charAt(0)?.toUpperCase() + pathRoute.slice(1)} ${labelMenu}`;
                    }
                    const pathRoute = router.pathname.split('/')[lengthPath - 2];
                    return `${pathRoute?.charAt(0)?.toUpperCase() + pathRoute.slice(1)} ${labelMenu}`;
                }
                return labelMenu;
            }

            if (activeParentMenu?.breadcrumb?.[0]?.label) {
                return activeParentMenu?.breadcrumb?.[0]?.label;
            }

            if (router.pathname.split('/')?.[1] === 'login') {
                return 'Login';
            }

            if (router.pathname.split('/')?.[1] === 'requestreturn') {
                return 'Request Return';
            }

            return old;
        });
    }, [activeChildMenu, activeParentMenu, router]);

    useEffect(() => {
        window.addEventListener('beforeunload', () => setLocalStorage('refreshAcl', 1));
        return () => {
            window.removeEventListener('beforeunload', () => setLocalStorage('refreshAcl', 1));
        };
    }, []);

    useEffect(async () => {
        if (getLocalStorage('refreshAcl') !== 0 && Cookies.get('isLogin') === '1') {
            try {
                setLoad(true);
                const [resAcl, resWave, resBatch, resTada, resVendor] = await Promise.all([
                    getAcl(),
                    getStoreConfigWave(),
                    getStoreConfigBatch(),
                    getStoreConfigTada(),
                    getStoreConfigVendor(),
                ]);
                setLocalStorage('acl', JSON.stringify(resAcl.data.customerAccessControlList));
                setLocalStorage('config_acl', JSON.stringify({
                    pickpackWave: resWave.data.getStoreConfig,
                    pickpackBatch: resBatch.data.getStoreConfig,
                    tada: resTada.data.getStoreConfig,
                    vendor: resVendor.data.getStoreConfig,
                }));
            } catch (error) {
                setLoad(false);
            } finally {
                setLocalStorage('refreshAcl', 0);
                setLoad(false);
            }
        }
    }, []);

    useEffect(() => {
        BackdropLoad(load);
    }, [load]);

    useEffect(() => {
        const { basehref, token, enabled } = features.teamworkChat;
        if (enabled && Cookies.get('isLogin') === '1' && !document.getElementById('deskWidgetMain')) {
            // eslint-disable-next-line func-names
            !(function (e) {
                window.deskcontactwidget = {};

                const r = e.getElementsByTagName('script')[0];
                const c = e.createElement('script');
                c.type = 'text/javascript';
                c.async = !0;
                c.src = `${basehref}/support/v1/contact/main.js?token=${token}`;
                r.parentNode.insertBefore(c, r);

                window.addEventListener('message', (ev) => {
                    const target = ev.data[0];
                    const a = ev.data[1];
                    const deskWidgetMain = document.getElementById('deskWidgetMain');
                    const widgetChat = document.querySelector('#deskWidgetMain .toggle-trigger');
                    const svg = document.querySelector('#deskWidgetMain .toggle-trigger svg');

                    // eslint-disable-next-line default-case
                    switch (target) {
                    case 'setContactFormHeight':
                        document.getElementById('deskcontactwidgetframe').height = Math.min(a, window.window.innerHeight - 75);
                        if (deskWidgetMain) {
                            deskWidgetMain.style.bottom = '70px';
                            deskWidgetMain.style.right = '13px';
                        }
                        if (svg) {
                            svg.setAttribute('viewBox', '0 0 40 40');
                            svg.setAttribute('width', 30);
                            svg.setAttribute('height', 30);
                        }
                        break;
                    default:
                        if (deskWidgetMain) {
                            deskWidgetMain.style.bottom = '70px';
                            deskWidgetMain.style.right = '13px';
                        }
                        if (svg) {
                            svg.setAttribute('viewBox', '0 0 40 40');
                            svg.setAttribute('width', 30);
                            svg.setAttribute('height', 30);
                        }
                    }

                    if (typeof window !== 'undefined') {
                        const containsPrint = window.location.href.includes('/print');
                        if (widgetChat && containsPrint) {
                            widgetChat.style.display = 'none';
                        }
                    }
                }, !1);
            }(document));
        }
    }, []);

    return (
        <>
            <Head>
                <title>{pageConfig?.title ? pageConfig.title : currentLocation}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={classes.root}>
                {plainMode ? null : showHeader() && (
                    seller ? (
                        <HeaderSeller
                            notificationRes={sellerNotificationRes}
                            informationUpdateRes={informationUpdateRes}
                            mappedMenuList={sellerMenus}
                            open={open}
                            setOpen={setOpen}
                            storeLogo={storeLogo}
                            refetch={() => sellerNotificationRes.refetch()}
                            chatAgentCode={chatAgentCode}
                            isSeller={seller ?? false}
                            pageConfig={pageConfig}
                            backUrl={pageConfig.backUrl}
                            setLoadLang={setLoadLang}
                        />
                    )
                        : (
                            <Header
                                notificationRes={notificationRes}
                                mappedMenuList={mappedMenuList}
                                breadcrumbData={getBreadcrumbData()}
                                open={open}
                                setOpen={setOpen}
                                storeLogo={storeLogo}
                                isSeller={seller ?? false}
                                setLoadLang={setLoadLang}
                            />
                        )
                )}
                {showSidebar() && !plainMode && (
                    <>
                        {seller ? (
                            <SidebarSeller
                                activeParentMenu={activeParentMenu}
                                setActiveParentMenu={setActiveParentMenu}
                                activeChildMenu={activeChildMenu}
                                setActiveChildMenu={setActiveChildMenu}
                                open={open}
                                setOpen={setOpen}
                                menuList={menuList}
                                storeLogo={storeLogo}
                            />
                        )
                            : (
                                <Sidebar
                                    activeParentMenu={activeParentMenu}
                                    setActiveParentMenu={setActiveParentMenu}
                                    activeChildMenu={activeChildMenu}
                                    setActiveChildMenu={setActiveChildMenu}
                                    open={open}
                                    setOpen={setOpen}
                                    menuList={menuList}
                                    storeLogo={storeLogo}
                                />
                            )}
                    </>
                )}
                <main className={containerHeader()}>
                    <Loading open={backdropLoader} />
                    <Message open={toastMessage.open} variant={toastMessage.variant} setOpen={handleCloseMessage} message={toastMessage.text} autoHideDuration={toastMessage.duration} />
                    {/* necessary for content to be below app bar */}
                    <div className={showHeader() && !plainMode ? classes.toolbar : ''} />
                    {showHeader() && useBreadcrumbs && !plainMode && (
                        <Hidden smUp implementation="css">
                            <div style={{ height: 0 }} />
                        </Hidden>
                    )}
                    {loadLang ? (
                        <div className={classes.progressContainer}>
                            <CircularProgress className={classes.progress} size={80} />
                        </div>
                    )
                        : children}
                    <Hidden mdUp implementation="css">
                        <div style={{ height: 64 }} />
                    </Hidden>
                </main>
                {seller && !hideMobileMenu && <Hidden smUp><MobileMenu /></Hidden>}
            </div>
        </>
    );
};

export default Layout;
