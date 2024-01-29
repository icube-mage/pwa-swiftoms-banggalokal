/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import loginGqlService from '@modules/login/services/graphql';
import { removeIsLoginFlagging } from '@helper_auth';
import Cookies from 'js-cookie';
import { custDataNameCookie } from '@config';
import { useRouter } from 'next/router';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useTranslation } from '@i18n';
import LanguageSelect from '@modules/theme/layout/components/languageSelect';

const StyledBadge = withStyles(() => ({
    badge: {
        right: 5,
        top: 3,
        padding: '0 4px',
        background: '#BE1F93',
    },
}))(Badge);

const RightToolbar = ({ notificationRes }) => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [removeCustomerToken] = loginGqlService.removeToken();
    const [getCustomer, getCustomerRes] = loginGqlService.getCustomer();
    const getCustomerFromGql = () => getCustomerRes && getCustomerRes.data && getCustomerRes.data.customer;
    const [username, setUsername] = React.useState('');
    const handleSetUsername = (customer) => {
        const firstname = customer && customer.firstname;
        const lastname = customer && customer.lastname;
        setUsername(`${firstname} ${lastname}`);
    };

    React.useEffect(() => {
        if (Cookies.getJSON(custDataNameCookie)) {
            handleSetUsername(Cookies.getJSON(custDataNameCookie));
        } else {
            getCustomer();
        }
    }, []);

    React.useEffect(() => {
        if (getCustomerFromGql()) {
            Cookies.set(custDataNameCookie, getCustomerFromGql());
            handleSetUsername(getCustomerFromGql());
        }
    }, [getCustomerFromGql()]);

    const handleLogout = () => {
        removeCustomerToken()
            .then(() => {
                removeIsLoginFlagging();
                Cookies.remove(custDataNameCookie);
                router.push('/login');
            })
            .catch(() => {});
    };
    const { loading, data } = notificationRes;

    return (
        <ul>
            <li>
                <a href="#">
                    <Hidden xsDown implementation="css">
                        {username}
                        <KeyboardArrowDownIcon style={{ verticalAlign: 'middle', marginLeft: 5 }} />
                    </Hidden>
                    <Hidden smUp implementation="css">
                        <AccountCircleOutlinedIcon style={{ transform: 'translateY(2px)', fontSize: 27 }} />
                    </Hidden>
                </a>
                <ul>
                    {/* <li>
                        <a className="linkOut" href="/myaccount">
                            My Account
                        </a>
                    </li> */}
                    <li>
                        <a className="linkOut" href="#" onClick={handleLogout}>
                            {t('common:Sign_Out')}
                        </a>
                    </li>
                </ul>
            </li>
            <li>
                <IconButton style={{ padding: 0 }} color="inherit">
                    <StyledBadge overlap="rectangular" badgeContent={data?.getNotificationList.total_count} color="secondary">
                        <img style={{ filter: 'brightness(0%) invert(100%)' }} alt="" src="/assets/img/layout/notification.svg" />
                    </StyledBadge>
                </IconButton>
                <ul style={{ width: 270 }}>
                    {loading ? (
                        <CircularProgress size={20} />
                    ) : (
                        <div>
                            <a className="viewMessage" href="/oms/notification">
                                <li style={{ textAlign: 'left', margin: '5px 0' }}>
                                    {t('common:You_have')}
                                    {' '}
                                    {data?.getNotificationList.total_count || 0}
                                    {' '}
                                    {t('common:unread_notifications')}
                                </li>
                            </a>
                            {data?.getNotificationList?.items?.map((notif, idx) => (
                                <li
                                    key={idx}
                                    style={{
                                        color: 'black',
                                        borderTop: '1px solid #B1BCDB',
                                        margin: 0,
                                        width: 250,
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    <span style={{ color: '#B1BCDB', fontSize: 12 }}>{notif.created_at}</span>
                                    <br />
                                    <span style={{ color: '#435179', fontSize: 14, fontWeight: 'bold' }}>{notif.entity_type}</span>
                                    <br />
                                    <span
                                        style={{
                                            color: '#435179',
                                            fontSize: 12,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {notif.message.slice(0, 30)}
                                        ...
                                    </span>
                                </li>
                            ))}
                        </div>
                    )}
                </ul>
            </li>
            <li>
                <LanguageSelect white />
            </li>

            <style jsx>
                {`
                    ul {
                        margin: 0;
                        list-style: none;
                        padding: 0;
                        float: right;
                        font-size: 10px;
                        font-family: Montserrat !important;
                        position: fixed;
                        right: 12px;
                    }
                    li {
                        display: inline-block;
                        padding: 5px 12px;
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
                        padding: 5px 10px;
                        z-index: 999;
                        background: #fff;
                        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
                        right: 0;
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
                        color: #be1f93;
                    }
                    .linkOut {
                        color: #be1f93;
                    }
                    .viewMessage {
                        color: #be1f93;
                        font-size: 10px;
                    }
                `}
            </style>
        </ul>
    );
};
export default RightToolbar;
