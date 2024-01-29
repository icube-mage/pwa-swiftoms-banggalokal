/* eslint-disable no-nested-ternary */
/* eslint-disable no-script-url */
/* eslint-disable no-new */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import clsx from 'clsx';
import { sendDataLayer } from '@helper_gtm';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import CircularProgress from '@material-ui/core/CircularProgress';

import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Hidden from '@material-ui/core/Hidden';
import { getDocsGuide } from '@helper_config';

import Button from '@common_button/index';

import gqlNotificationSeller from '@sellermodules/notification/services/graphql';
import loginGqlService from '@modules/login/services/graphql';
import SearchHeader from '@modules/theme/layout/components/search/index';
import DrawerHelp from '@modules/theme/layout/components/seller/drawerHelp';

import { setLocalStorage, getLocalStorage } from '@helper_localstorage';
import { removeIsLoginFlagging } from '@helper_auth';
import { custDataNameCookie } from '@config';
import {
    PRIMARY, BORDER_COLOR, PRIMARY_DARK, GRAY_LIGHT, BLACK, ERROR,
} from '@theme_color';

import { useTranslation } from '@i18n';
import firebaseApp from '@lib_firebase/index';
import { BREAKPOINTS } from '@theme_vars';

const useStyles = makeStyles((theme) => ({
    iconButton: {
        border: `1px solid ${BORDER_COLOR}`,
        height: 30,
        width: 30,
        borderRadius: 4,
        '& .icon': {
            height: 20,
            width: 20,
            fill: PRIMARY_DARK,
        },
        [theme.breakpoints.down('xs')]: {
            height: 30,
            width: 30,
            '& .icon': {
                height: 16,
                width: 16,
            },
        },
    },
    iconSvg: {
        '&.MuiSvgIcon-root': {
            height: 20,
            width: 20,
            fill: PRIMARY_DARK,
            verticalAlign: 'middle',
        },
    },
    lis: {
        margin: '0px 5px',
        '&:hover': {
            '& .MuiIconButton-root': {
                backgroundColor: PRIMARY,
                '& .icon': {
                    filter: 'brightness(0%) invert(100%)',
                },
            },
        },
        '&:first-child': {
            [theme.breakpoints.up('md')]: {
                width: '100%',
                marginTop: 5,
                marginBottom: 5,
            },
            [theme.breakpoints.up('middleView')]: {
                width: 'auto',
            },
        },
        [theme.breakpoints.down('xs')]: {
            margin: '0px 6px',
        },
    },
    notifTab: {
        display: 'flex',
        alignitems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${BORDER_COLOR}`,
        position: 'relative',
    },
    btnTabContainer: {
        padding: '0 15px',
        paddingTop: 10,
        '&.active': {
            '&::after': {
                content: "''",
                display: 'inherit',
                height: 3,
                background: `${PRIMARY} 0% 0% no-repeat padding-box`,
            },
        },
        '& .flex': {
            display: 'flex',
            alignItems: 'center',
            gap: 5,
        },
    },
    redIndicator: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        backgroundColor: ERROR,
    },
    btnNotifRoot: {
        padding: '10px 0',
        fontSize: 13,
        textDecoration: 'none',
        color: BLACK,
        '&:hover': {
            textDecoration: 'none',
            color: BLACK,
        },
        '&.active': {
            color: PRIMARY,
            '&:hover': {
                color: PRIMARY,
            },
        },
    },
    liNotifUpdate: {
        fontSize: 12,
        '& .flex': {
            display: 'flex',
            alignItems: 'center',
            gap: 5,
        },
        '& .title': {
            fontWeight: 'bold',
            marginTop: 5,
            marginBottom: 3,
        },
    },
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
        padding: 4,
        background: PRIMARY,
        color: 'white',
        borderRadius: '50%',
        border: '1px solid white',
        height: 20,
        fontSize: 10,
        [theme.breakpoints.down('xs')]: {
            height: 18,
        },
    },
}))(Badge);

const RightToolbar = ({
    notificationRes, refetch, chat, chatAgentCode, dataAcl, isSeller,
    openSearch, setOpenSearch, informationUpdateRes,
}) => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [removeCustomerToken] = loginGqlService.removeToken();
    const classes = useStyles();

    const db = firebaseApp.firestore();
    const agentCode = chatAgentCode || Cookies.getJSON('cdt')?.customer_company_code;
    const accountName = Cookies.getJSON('cdt')?.firstname;
    const [msgs, setMsgs] = useState([]);
    const [notifTab, setNotifTab] = useState('operational');

    const dataTabs = [
        { label: t('common:Operational'), value: 'operational' },
        { label: t('common:Update'), value: 'update' },
    ];

    const handleLogout = () => {
        removeCustomerToken()
            .then(() => {
                removeIsLoginFlagging();
                Cookies.remove(custDataNameCookie);
                router.push('/login');
            })
            .catch(() => { });
    };
    const { loading, data } = notificationRes;
    const { loading: loadingInfo, data: dataInfo } = informationUpdateRes;

    const [sellerNotificationRead] = gqlNotificationSeller.sellerNotificationRead();
    const onClickNotif = (notif = {}) => {
        const { category, category_ref_id, id } = notif;
        const ids = [];
        if (id) {
            ids.push(id);
        }
        window.backdropLoader(true);
        sellerNotificationRead({ variables: { ids } }).then(() => {
            if (id) {
                switch (category) {
                case 'notif_new_order':
                case 'notif_cancel_order':
                    router.push({
                        pathname: '/seller/order/detail/[id]',
                        query: { id: category_ref_id },
                    });
                    window.backdropLoader(false);
                    break;
                case 'notif_error_order_queue':
                    router.push({ pathname: '/seller/order/failed' });
                    window.backdropLoader(false);
                    break;
                case 'notif_withdraw_approval':
                    router.push('/seller/income/withdraw');
                    window.backdropLoader(false);
                    break;
                case 'notif_rma':
                    router.push({
                        pathname: '/seller/return/detail/[id]',
                        query: { id: category_ref_id },
                    });
                    window.backdropLoader(false);
                    break;
                case 'notif_mpadapter':
                    router.push({ pathname: '/seller/order' });
                    window.backdropLoader(false);
                    break;
                case 'notif_export_order_product':
                    router.push({ pathname: '/seller/report/history' });
                    window.backdropLoader(false);
                    break;
                default:
                    window.backdropLoader(false);
                    break;
                }
            } else {
                refetch();
                window.backdropLoader(false);
            }
        })
            .catch((e) => {
                window.backdropLoader(false);
                window.toastMessage({
                    open: true,
                    text: e.message,
                    variant: 'error',
                });
            });
    };

    const sendToGTM = () => {
        const dataLayer = {
            event: 'documentation_support',
            eventLabel: 'Documentation Support',
        };
        sendDataLayer(dataLayer);
    };

    useEffect(() => {
        let unsub = () => null;
        if (chat) {
            const refereceUserDb = db.collection('messages');
            const adminQuery = refereceUserDb
                .where('is_admin_read', 'in', [0]);
            const customerQuery = refereceUserDb
                .where('is_admin_read', 'in', [0])
                .where('agent_code', '==', agentCode);
            const q = agentCode === '' ? adminQuery : customerQuery;

            unsub = q.onSnapshot((querySnapshot) => {
                const unread = [];
                querySnapshot.docs.forEach((doc) => {
                    unread.push({
                        chatId: doc.id,
                        ...doc.data(),
                    });
                });
                setMsgs(unread);
            });
        }

        return unsub;
    }, [chat, agentCode]);

    useEffect(() => {
        if (chat && msgs && msgs.length > 0 && typeof window !== 'undefined') {
            if (Notification.permission !== 'granted') {
                Notification.requestPermission();
            } else {
                new Notification('New Messages', {
                    icon: '/assets/img/icon_email.png',
                    body: `you have ${msgs.length} messages`,
                });
            }
        }
    }, [msgs]);

    const refOpenSearch = React.useRef(null);
    const handleClickSearch = () => {
        setOpenSearch(!openSearch);
    };
    const handleOutsideClick = (e) => {
        if (refOpenSearch.current && !refOpenSearch.current.contains(e.target)) {
            setOpenSearch(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const [openHelp, setOpenHelp] = React.useState(false);

    if (getLocalStorage
        && (!getLocalStorage('system_update_count') || getLocalStorage('system_update_count') > dataInfo?.getInformationUpdateList?.total_count)
        && !loading && dataInfo) {
        setLocalStorage('system_update_count', dataInfo?.getInformationUpdateList?.total_count >= 2
            ? dataInfo?.getInformationUpdateList?.total_count - 1 : dataInfo?.getInformationUpdateList?.total_count);
    }

    return (
        <ul>
            <li className={classes.lis}>
                <Hidden smDown><SearchHeader isSeller={isSeller} dataAcl={dataAcl} /></Hidden>
                <Hidden mdUp>
                    <IconButton
                        id="guide-search-mobile"
                        className={classes.iconButton}
                        onClick={() => handleClickSearch()}
                        ref={refOpenSearch}
                    >
                        <img alt="logo-search" src="/assets/img/search.svg" className="icon" />
                    </IconButton>
                </Hidden>
            </li>
            {chat
                ? (
                    <li className={classes.lis}>
                        <Link href="/seller/chat">
                            <a>
                                <IconButton className={classes.iconButton}>
                                    <StyledBadge
                                        badgeContent={msgs.length}
                                        overlap="circular"
                                        color="error"
                                    >
                                        <img alt="logo-chat" src="/assets/img/layout/seller/chat.svg" className="icon" />
                                    </StyledBadge>
                                </IconButton>
                            </a>
                        </Link>
                        <ul style={{ padding: '15px 20px', width: 270, left: -120 }}>
                            <li className="viewMessage">
                                {t('common:You_have')}
                                {' '}
                                {msgs.length}
                                {' '}
                                {t('common:unread_messages')}
                            </li>
                        </ul>
                    </li>
                ) : null}
            <li className={classes.lis}>
                <IconButton className={classes.iconButton}>
                    <StyledBadge
                        badgeContent={(data?.getSellerNotifications?.total_count || 0)
                            + (getLocalStorage('system_update_count') && dataInfo?.getInformationUpdateList?.total_count
                                ? (dataInfo?.getInformationUpdateList?.total_count - getLocalStorage('system_update_count'))
                                : 0)}
                        max={99}
                        overlap="circular"
                    >
                        <img alt="" src="/assets/img/layout/notification.svg" className="icon" />
                    </StyledBadge>
                </IconButton>
                <ul style={{ width: 270, left: -190 }}>
                    <div id="notif-header-ta'b" className={classes.notifTab}>
                        {dataTabs.map((tab, index) => (
                            <div className={clsx(classes.btnTabContainer, notifTab === tab.value && 'active')} key={index}>
                                <div className="flex">
                                    <Button
                                        classes={{ root: clsx(classes.btnNotifRoot, notifTab === tab.value && 'active') }}
                                        onClick={() => setNotifTab(tab.value)}
                                        buttonType="buttonText"
                                    >
                                        {tab.label}
                                        {tab.value === 'operational'
                                            && `${data?.getSellerNotifications?.total_count
                                                ? ` (${data?.getSellerNotifications?.total_count})` : ''}`}
                                    </Button>
                                    {tab.value === 'operational' && !!data?.getSellerNotifications?.items?.length
                                        && <div className={classes.redIndicator} />}
                                    {tab.value === 'update'
                                        && getLocalStorage('system_update_count') < dataInfo?.getInformationUpdateList?.total_count
                                        && <div className={classes.redIndicator} />}
                                </div>
                            </div>
                        ))}
                    </div>
                    {loading || loadingInfo ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '15px 20px' }}>
                            <CircularProgress size={20} />
                        </div>
                    ) : (notifTab === 'operational'
                        ? (
                            <div>
                                <li
                                    style={{
                                        color: 'black',
                                        margin: 0,
                                        textOverflow: 'ellipsis',
                                        padding: '10px 20px',
                                    }}
                                    aria-hidden="true"
                                    className={classes.liNotifUpdate}
                                >
                                    <div className="title">
                                        {t('common:You_have')}
                                        {' '}
                                        {data?.getSellerNotifications.total_count || 0}
                                        {' '}
                                        {t('common:unread_notifications')}
                                    </div>
                                </li>
                                {data?.getSellerNotifications?.items?.map((notif, idx) => (
                                    <li
                                        key={idx}
                                        style={{
                                            color: 'black',
                                            borderTop: '1px solid #B1BCDB',
                                            margin: 0,
                                            textOverflow: 'ellipsis',
                                            padding: '10px 20px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => onClickNotif(notif)}
                                        aria-hidden="true"
                                    >
                                        <div style={{ color: '#9A9A9A', fontSize: 11, marginBottom: 5 }}>{notif.created_at}</div>
                                        <span style={{ color: '#000000', fontSize: 13, fontWeight: 'bold' }}>{notif.entity_type}</span>
                                        <br />
                                        <span
                                            style={{
                                                color: '#747474',
                                                fontSize: 12,
                                                overflow: 'hidden',
                                                wordBreak: 'break-word',
                                                display: '-webkit-box',
                                                '-webkit-line-clamp': '3',
                                                '-webkit-box-orient': 'vertical',
                                            }}
                                        >
                                            {notif.message}
                                        </span>
                                    </li>
                                ))}
                                <li
                                    className="viewMessage"
                                    style={{
                                        textAlign: 'left',
                                        padding: '10px 20px',
                                        borderTop: '1px solid #B1BCDB',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <div
                                        onClick={onClickNotif}
                                        aria-hidden="true"
                                        style={{ cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        {t('common:Read_All')}
                                    </div>
                                    <div>
                                        <Link href="/seller/notification">
                                            <a style={{ color: PRIMARY, fontSize: 12, fontWeight: 'bold' }}>
                                                {t('common:View_all_notifications')}
                                            </a>
                                        </Link>
                                    </div>
                                </li>
                            </div>
                        )
                        : (
                            <div>
                                {!dataInfo?.getInformationUpdateList?.items?.length
                                    && (
                                        <li
                                            style={{
                                                color: 'black',
                                                margin: 0,
                                                textOverflow: 'ellipsis',
                                                padding: '10px 20px',
                                            }}
                                            aria-hidden="true"
                                            className={classes.liNotifUpdate}
                                        >
                                            <div className="title">
                                                {t('common:There_is_no_update_information_at_this_time')}
                                            </div>
                                        </li>
                                    )}
                                {dataInfo?.getInformationUpdateList?.items?.map((info, idx) => (
                                    <li
                                        key={idx}
                                        style={{
                                            color: 'black',
                                            margin: 0,
                                            textOverflow: 'ellipsis',
                                            padding: '10px 20px',
                                            cursor: 'pointer',
                                            ...(idx && { borderTop: '1px solid #B1BCDB' }),
                                        }}
                                        onClick={() => router.push('/seller/update')}
                                        aria-hidden="true"
                                        className={classes.liNotifUpdate}
                                    >
                                        <div className="flex">
                                            <div style={{ color: '#9A9A9A', fontSize: 11 }}>
                                                Info |
                                                {' '}
                                                {info.inserted_at}
                                            </div>
                                        </div>
                                        <div className="title">
                                            {info.title}
                                        </div>
                                        <div style={{
                                            color: '#747474',
                                            fontSize: 12,
                                            overflow: 'hidden',
                                        }}
                                        >
                                            {info.short_content}
                                        </div>
                                    </li>
                                ))}
                                <li
                                    className="viewMessage"
                                    style={{
                                        textAlign: 'left',
                                        padding: '10px 20px',
                                        borderTop: '1px solid #B1BCDB',
                                    }}
                                >
                                    <div>
                                        <Link href="/seller/update">
                                            <a style={{ color: PRIMARY, fontSize: 12, fontWeight: 'bold' }}>
                                                {t('common:view_more')}
                                            </a>
                                        </Link>
                                    </div>
                                </li>
                            </div>
                        )
                    )}
                </ul>
            </li>
            <li className={classes.lis}>
                <a href={getDocsGuide()} target="_blank" rel="noreferrer" onClick={sendToGTM}>
                    <IconButton className={classes.iconButton}>
                        <img alt="" src="/assets/img/icon_help_docs.svg" className="icon help" />
                    </IconButton>
                </a>
            </li>
            <li className={classes.lis}>
                <a href="#">
                    <IconButton className={classes.iconButton} onClick={() => setOpenHelp(true)}>
                        <img alt="" src="/assets/img/layout/seller/help.svg" className="icon" />
                    </IconButton>
                </a>
                <DrawerHelp openHelp={openHelp} setOpenHelp={setOpenHelp} />
            </li>
            <li className={classes.lis}>
                <a href="#">
                    <Hidden xsDown>
                        <span className="userName">{accountName}</span>
                        <KeyboardArrowDownIcon className={classes.iconSvg} />
                    </Hidden>
                </a>
                <ul style={{ padding: '15px 20px' }}>
                    <li>
                        <Link href="/seller/account">
                            <a className="linkOut">
                                {t('common:Edit_Profile')}
                            </a>
                        </Link>
                        <div style={{ marginBottom: 20 }} />
                        <a className="linkOut" href="#" onClick={handleLogout}>
                            {t('common:Sign_Out')}
                        </a>
                    </li>
                </ul>
            </li>

            <style jsx>
                {`
                    ul {
                        margin: 0;
                        list-style: none;
                        padding: 0;
                        float: right;
                        font-size: 10px;
                        position: fixed;
                        right: 12px;
                        border-radius: 8px;
                    }
                    li {
                        display: inline-block;
                        position: relative;
                        vertical-align: middle;
                    }
                    li:hover > ul {
                        display: block;
                    }
                    ul ul {
                        position: absolute;
                        display: none;
                        margin: 0;
                        z-index: 999;
                        background: #fff;
                        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
                        right: -20px;
                        border: 1px solid ${GRAY_LIGHT};
                    }
                    ul ul li {
                        display: block;
                    }
                    ul ul ul {
                        position: absolute;
                        top: 0;
                        left: 100%;
                    }
                    a {
                        color: #ffffff;
                        text-decoration: none;
                        white-space: nowrap;
                        font-size: 14px;
                    }
                    a .userName {
                        color: ${BLACK};
                    }
                    a:hover {
                        border-bottom: 1px dashed #fff;
                        color: ${PRIMARY_DARK};
                    }
                    .linkOut {
                        color: ${PRIMARY_DARK};
                        font-size: 13px;
                    }
                    .viewMessage {
                        color: ${PRIMARY};
                        font-size: 12px;
                    }
                    @media screen and (min-width: ${BREAKPOINTS.md}px) and (max-width: ${BREAKPOINTS.lg}px) {
                        ul {
                            position: unset;
                            flex-grow: 1;
                            text-align: right;
                            padding-bottom: 5px;
                        }
                    }
                `}
            </style>
        </ul>
    );
};
export default RightToolbar;
