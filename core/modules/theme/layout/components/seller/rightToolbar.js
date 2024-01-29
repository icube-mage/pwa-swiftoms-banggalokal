/* eslint-disable no-script-url */
/* eslint-disable no-new */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Cookies from 'js-cookie';
import { useTranslation } from '@i18n';
import { useRouter } from 'next/router';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import CircularProgress from '@material-ui/core/CircularProgress';

import IconButton from '@material-ui/core/IconButton';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { custDataNameCookie } from '@config';
import { getLoginInfo, removeIsLoginFlagging } from '@helper_auth';
import loginGqlService from '@modules/login/services/graphql';
import gqlNotificationSeller from '@sellermodules/notification/services/graphql';
import LanguageSelect from '@modules/theme/layout/components/languageSelect';
import {
    PRIMARY, TABLE_GRAY, PRIMARY_DARK, GRAY_LIGHT,
} from '@theme_color';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import firebaseApp from '@lib_firebase/index';

const useStyles = makeStyles((theme) => ({
    iconButton: {
        backgroundColor: TABLE_GRAY,
        height: 46,
        width: 46,
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
        margin: '0px 12px',
        '&:hover': {
            '& .MuiIconButton-root': {
                backgroundColor: PRIMARY,
                '& .icon': {
                    filter: 'brightness(0%) invert(100%)',
                },
            },
        },
        [theme.breakpoints.down('xs')]: {
            margin: '0px 6px',
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
    notificationRes, refetch, chat, chatAgentCode,
}) => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [removeCustomerToken] = loginGqlService.removeToken();
    const classes = useStyles();
    // eslint-disable-next-line radix
    const isLogin = parseInt(getLoginInfo());

    const db = firebaseApp.firestore();
    const agentCode = chatAgentCode || Cookies.getJSON('cdt')?.customer_company_code;
    const [msgs, setMsgs] = useState([]);

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
                    break;
                case 'notif_withdraw_approval':
                    router.push('/seller/income/withdraw');
                    break;
                case 'notif_rma':
                    router.push({
                        pathname: '/seller/return/detail/[id]',
                        query: { id: category_ref_id },
                    });
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

    useEffect(() => {
        let unsub = () => null;
        if (chat && isLogin) {
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

    return (
        <ul>
            {chat
                ? (
                    <li className={classes.lis}>
                        <Link href="/seller/chat">
                            <a>
                                <IconButton className={classes.iconButton}>
                                    <StyledBadge
                                        badgeContent={msgs.length}
                                        overlap="circular"
                                        // invisible={dataUnread && dataUnread.length === 0}
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
                    {/* {data?.getSellerNotifications.total_count
                        ? ( */}
                    <StyledBadge badgeContent={data?.getSellerNotifications?.total_count} max={99} overlap="circular">
                        <img alt="" src="/assets/img/layout/notification.svg" className="icon" />
                    </StyledBadge>
                    {/* )
                        : <img alt="" src="/assets/img/layout/notification.svg" className="icon" />} */}
                </IconButton>
                <ul style={{ width: 270, left: -120 }}>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '15px 20px' }}>
                            <CircularProgress size={20} />
                        </div>
                    ) : (
                        <div>
                            <li
                                className="viewMessage"
                                style={{ textAlign: 'left', padding: '10px 20px' }}
                            >
                                {t('common:You_have')}
                                {' '}
                                {data?.getSellerNotifications.total_count || 0}
                                {' '}
                                {t('common:unread_notifications')}
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
                                        }}
                                    >
                                        {notif.message.slice(0, 50)}
                                        ...
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
                                    style={{ cursor: 'pointer' }}
                                >
                                    {t('common:Read_All')}
                                </div>
                                <div>
                                    <Link href="/seller/notification">
                                        <a style={{ color: PRIMARY, fontSize: 12 }}>
                                            {t('common:View_all_notifications')}
                                        </a>
                                    </Link>
                                </div>
                            </li>
                        </div>
                    )}
                </ul>
            </li>
            <li className={classes.lis}>
                <a href="#">
                    <IconButton className={classes.iconButton}>
                        <img alt="" src="/assets/img/layout/avatar.svg" className="icon" />
                    </IconButton>
                    {/* <KeyboardArrowDownIcon className={classes.iconSvg} /> */}
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
            <li>
                <LanguageSelect color={PRIMARY_DARK} />
            </li>

            <style jsx>
                {`
                    ul {
                        margin: 0;
                        list-style: none;
                        padding: 0;
                        float: right;
                        font-size: 10px;
                        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
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
                `}
            </style>
        </ul>
    );
};
export default RightToolbar;
