/* eslint-disable */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable indent */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from '@i18n';
import gqlSeller from '@sellermodules/storesetting/services/graphql';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Hidden from '@material-ui/core/Hidden';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import LanguageSelect from '@modules/theme/layout/components/languageSelect';

import Cookies from 'js-cookie';
import { custDataNameCookie } from '@config';
import { removeIsLoginFlagging } from '@helper_auth';
import loginGqlService from '@modules/login/services/graphql';

import { miniDrawerWidthSeller, drawerWidthSeller } from '@modules/theme/layout/helpers';
import {
 PRIMARY, PRIMARY_DARK, TABLE_GRAY, BLACK, BORDER_COLOR, WHITE, LIGHT_GRAY,
} from '@theme_color';
import { getLocalStorage } from '@helper_localstorage';

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidthSeller,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidthSeller,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        border: '0',
        boxShadow: '2px 0px 20px #4D2F821A',
        justifyContent: 'space-between',
        '&.drawer-mobile': {
            width: '100%',
        },
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: miniDrawerWidthSeller,
        },
        border: '0',
        boxShadow: '2px 0px 20px #4D2F821A',
    },
    togleMobile: {
        padding: '0 12px',
        '& button': {
            padding: '0px 8px 4px 8px',
        },
        '& h4': {
            display: 'inline-block',
        },
    },
    togleMenuButton: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: '16px',
        right: '16px',
    },
    togleMenuIcon: {
        fontSize: 30,
    },
    arrowBalance: {
        fontSize: 27,
        color: BLACK,
        transition: '0.3s',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    swiftOmsLogo: {
        padding: 12,
        display: 'block',
        position: 'relative',
        minHeight: 'unset',
        marginBottom: 7,
        '& img': {
            height: 45,
            marginTop: 10,
        },
    },

    divMenu: {
        color: BLACK,
        '& .itemText span': {
            fontSize: 14,
            textTransform: 'capitalize',
        },
        justifyContent: 'center',
        '&.open': {
            '& .MuiListItemIcon-root': {
                minWidth: 0,
                marginRight: 20,
            },
            '& .MuiListItemText-root': {
                flex: 'none',
            },
        },
        '&.close': {
            padding: '0 12px',
        },
    },
    menuList: {
        padding: 0,
        flex: '1 1 auto',
        '&.open': {
            padding: '0 12px',
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: 20,
        },
    },
    menuItem: {
        marginTop: 15,
        borderRadius: 12,
        justifyContent: 'space-between',
        '&.close': {
            paddingLeft: 13,
        },
        '&:hover': {
            background: TABLE_GRAY,
            color: PRIMARY,
            '& .itemIcon img': {
                filter: 'invert(24%) sepia(94%) saturate(2110%) hue-rotate(295deg) brightness(81%) contrast(101%)',
            },
        },
        '&.open .itemText': {
            flex: '1 1 auto',
        },
        '&.active': {
            background: TABLE_GRAY,
            color: PRIMARY,
            '& .itemIcon img': {
                filter: 'invert(24%) sepia(94%) saturate(2110%) hue-rotate(295deg) brightness(81%) contrast(101%)',
            },
            '& .itemText span': {
                fontWeight: 'bold',
            },
            '& .MuiSvgIcon-root': {
                rotate: '-90deg',
            },
        },
        '& .MuiSvgIcon-root': {
            transition: '0.3s',
        },
        '& .itemIcon img': {
            width: 20,
            height: 20,
        },
    },
    menuChildItem: {
        paddingLeft: 70,
        '&.active span': {
            color: PRIMARY,
            fontWeight: 'bold',
        },
        '&:hover span': {
            color: PRIMARY,
        },
        '&:hover': {
            background: 'transparent',
        },
    },
    divMenuBalance: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        border: `1px solid ${BORDER_COLOR}`,
        padding: '10px',
        paddingBottom: '7px',
        color: PRIMARY_DARK,
        borderRadius: 4,
        '& .itemText': {
            fontSize: 14,
            textTransform: 'capitalize',
            display: 'inline-block',
            width: 132,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            marginLeft: 10,
        },
        '& .balance': {
            color: BLACK,
            fontWeight: 'bold',
            marginTop: -5,
            marginLeft: -12,
        },
        '&.close': {
            visibility: 'hidden',
        },
    },
    menuItemBalance: {
        '& .itemIcon': {
            width: 50,
            height: 50,
            border: '1px #ddd solid',
            padding: 2,
            borderRadius: 50,
        },
    },
    divOpenLogo: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        background: WHITE,
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)',
        border: `1px solid ${BORDER_COLOR}`,
        zIndex: 9,
        width: 'calc(100% - 24px)',
        borderRadius: '0 0 4px 4px',
        top: '85%',
        '& span': {
            padding: '10px 20px',
            fontWeight: 'bold',
        },
        '& span:hover': {
            background: LIGHT_GRAY,
        },
    },
    logoBottom: {
        paddingTop: 20,
        '& img': {
            width: 110,
        },
    },
    mobileUser: {
        padding: '0 12px',
        '& .user-list': {
            display: 'flex',
            borderRadius: 4,
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px 15px',
            marginTop: 15,
        },
        '& .user-icon': {
            marginRight: 20,
            display: 'inline-flex',
        },
        '& .item-icon': {
            width: 20,
            height: 20,
        },
        '& .user-text': {
            flex: '1 1 auto',
            '&._red': {
                color: '#F43030',
            }
        },
    },
    languageMobile: {
        display: 'inline-block',
        float: 'right',
        marginTop: 20,
        '& div > button': {
            fontSize: 13,
            padding: '4px 5px',
        },
    },
    subsButton: {
        display: 'inline-block',
        padding: '5px 10px 5px 10px',
        borderRadius: 5,
        marginTop: -2,
        fontSize: 13,
        minWidth: 80,
        background: '#F3F4FA',
        marginLeft: 10,
        fontWeight: 400,
        '& .p1': {
            margin: 0,
            marginTop: -8,
            fontWeight: 600,
            color: PRIMARY,
            fontSize: 10,       
            '& img': {
                width: 10,
                height: 10,
                marginRight: 3,
                position: 'relative',
                top: 0,
            }
        },
        '& .p2': {
            margin: 0,
            marginTop: 3,
            fontSize: 9,
            color: '#424242',
        }
    },
    hr: {
        border: 0,
        height: 1,
        background: BORDER_COLOR,
        marginBottom: 20,
    },
    headerMessage: {
        background: '#fff5db',
        border: '1px #fbd362 solid',
        color: '#000000 !important',
        padding: '4px 10px 6px 10px',
        borderRadius: 5,
        marginTop: 10,
        marginBottom: -20,
    },
}));

const Sidebar = ({
 activeParentMenu, setActiveParentMenu, activeChildMenu, setActiveChildMenu, open, setOpen, menuList, storeLogo,
}) => {
    const router = useRouter();
    const classes = useStyles();
    const { t } = useTranslation('common');
    const handleClickParent = (menu) => {
        if (menu.key === (activeParentMenu && activeParentMenu.key)) {
            setActiveParentMenu(null);
        } else {
            setActiveParentMenu(menu);
            if (menu.url) router.push(menu.url);
        }
        setOpen(true);
    };
    const handleClickChild = (menu) => {
        setActiveChildMenu(menu);
        if (menu.url) router.push(menu.url);
        setOpen(true);
    };

    const aclDetail = getLocalStorage('acl') ? JSON.parse(getLocalStorage('acl')) : {};

    const [openSeller, setOpenSeller] = React.useState(false);
    const refOpenLogo = React.useRef(null);
    const handleClickLogoSeller = () => {
        setOpenSeller(!openSeller);
    };
    const handleOutsideClick = (e) => {
        if (refOpenLogo.current && !refOpenLogo.current.contains(e.target)) {
            setOpenSeller(false);
        }
    };
    React.useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const { data } = gqlSeller.getSeller();
    const endSubscribtion = () => {
        let endDate = data?.getSeller?.subscribtion_plan?.end_date;
        if (endDate) {
            endDate = endDate.split(' ');
            return endDate && endDate[0] ? endDate[0] : null;
        }
        return null;
    };

    const [removeCustomerToken] = loginGqlService.removeToken();
    const handleLogout = () => {
        removeCustomerToken()
            .then(() => {
                removeIsLoginFlagging();
                Cookies.remove(custDataNameCookie);
                router.push('/login');
            })
            .catch(() => {});
    };

    const SidebarContent = () => (
        <>
            <Hidden mdUp>
                <div className={classes.togleMobile}>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={() => setOpen(false)}>
                        <CloseIcon className={classes.togleMenuIcon} />
                    </IconButton>
                    <h4>{t('common:menu_utama')}</h4>
                    <div className={classes.languageMobile}>
                        <LanguageSelect color={PRIMARY_DARK} />
                    </div>
                </div>
            </Hidden>
            <div className={clsx(classes.toolbar, classes.swiftOmsLogo, 'open')} onClick={() => handleClickLogoSeller()} ref={refOpenLogo}>
                <div className={clsx(classes.divMenuBalance, 'open')}>
                    <div className={classes.menuItemBalance}>
                        <img
                            className="itemIcon"
                            alt=""
                            src={data?.getSeller?.logo !== '' ? data?.getSeller?.logo : '/assets/img/swiftoms_logo_collapsed.png'}
                        />
                    </div>
                    <div className="balance">
                        <span className="itemText" style={{ fontSize: 13 }}>{data?.getSeller?.name}</span>
                        <br />
                        { data?.getSeller?.subscribtion_plan?.subscribtion_name && (
                            <a href={data?.getSeller?.subscribtion_plan?.service_information_url || '#'} target={data?.getSeller?.subscribtion_plan?.service_information_url && '_blank'}>
                                <div className={classes.subsButton}>
                                    <p class="p1">
                                        <img src="/assets/img/star.svg" />
                                        { data?.getSeller?.subscribtion_plan?.subscribtion_name }
                                    </p>
                                    {endSubscribtion() && (
                                        <p class="p2">Valid until : { endSubscribtion() }</p>
                                    )}
                                </div>
                            </a>
                        )}
                    </div>                    
                </div>
                {data?.getSeller?.subscribtion_plan?.billing_message && (
                    <Hidden mdUp>
                        <div className={classes.headerMessage}>
                            <span dangerouslySetInnerHTML={{ __html: data?.getSeller?.subscribtion_plan?.billing_message }} />
                        </div>
                    </Hidden>
                )}
            </div>
            <List className={clsx(classes.menuList, open ? 'open' : 'close')}>
                {menuList?.map((menu) => (
                    <div key={menu.key}>
                        {aclDetail && (aclDetail?.acl_code?.includes(menu.aclCode) || menu.notInAcl) && !menu.hide && (
                            <div
                                id={menu.key === 'catalog' ? 'guide-catalog' : menu.key === 'channelseller' ? 'guide-sales' : null}
                                className={clsx(classes.divMenu, open ? 'open' : 'close')}
                                key={menu.key}
                            >
                                <Link href={menu.url || '#'} key={menu.key}>
                                    <a onClick={(e) => e.preventDefault()}>
                                        <ListItem
                                            button
                                            className={clsx(
                                                classes.menuItem,
                                                open ? 'open' : 'close',
                                                menu.key === (activeParentMenu && activeParentMenu.key) && 'active',
                                            )}
                                            onClick={() => handleClickParent(menu)}
                                        >
                                            <ListItemIcon className="itemIcon">
                                                <img alt="" src={`/assets/img/layout/seller/${menu.key}.svg`} />
                                            </ListItemIcon>
                                            <ListItemText className="itemText" primary={menu.label} />
                                            {menu?.children?.length > 0 && <ChevronRightIcon />}
                                        </ListItem>
                                    </a>
                                </Link>
                                {menu && menu.children && menu.children.length && (
                                    <Collapse in={activeParentMenu && activeParentMenu.key === menu.key} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {menu.children.map((menuChild) => (
                                                <div key={menuChild.key}>
                                                    {((aclDetail && aclDetail.acl_code.includes(menuChild.aclCode)) || menuChild.notInAcl)
                                                        && !menuChild.hide && (
                                                            <Link href={menuChild.url} key={menuChild.key}>
                                                                <a>
                                                                    <ListItem
                                                                        button
                                                                        key={menuChild.key}
                                                                        className={clsx(
                                                                            classes.menuChildItem,
                                                                            menuChild.key === (activeChildMenu && activeChildMenu.key) && 'active',
                                                                        )}
                                                                        onClick={() => handleClickChild(menuChild)}
                                                                    >
                                                                        <ListItemText className="itemText" primary={menuChild.label} />
                                                                    </ListItem>
                                                                </a>
                                                            </Link>
                                                        )}
                                                </div>
                                            ))}
                                        </List>
                                    </Collapse>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </List>
            <Hidden smUp>
                <div className={classes.mobileUser}>
                    <hr className={classes.hr} />
                    <div className="user-list">
                        <div className="user-icon">
                            <img className="item-icon" alt="" src="/assets/img/layout/avatar.svg" />
                        </div>
                        <Link href="/seller/account">
                            <div className="user-text">
                                <a className="linkOut">{t('common:Edit_Profile')}</a>
                            </div>
                        </Link>
                    </div>
                    <div className="user-list">
                        <div className="user-icon">
                            <img className="item-icon" alt="" src="/assets/img/logout.svg" />
                        </div>
                        <div className="user-text _red">
                            <a className="linkOut" href="#" onClick={handleLogout}>
                                {t('common:Sign_Out')}
                            </a>
                        </div>
                    </div>
                </div>
            </Hidden>
            <div style={{ padding: '20px 30px', textAlign: 'center' }}>
                <div className={classes.logoBottom}>
                    <img alt="logo oms" src={storeLogo?.logo || '/assets/img/logo-seller.svg'} />
                </div>
            </div>
        </>
    );

    const SidebarMobile = () => (
        <Drawer
            variant="temporary"
            open={open}
            onClose={() => setOpen(false)}
            className={clsx(classes.drawer, 'drawer-mobile', open ? classes.drawerOpen : classes.drawerClose)}
            classes={{
                paper: clsx('drawer-mobile', open ? classes.drawerOpen : classes.drawerClose),
            }}
            ModalProps={{ keepMounted: true }}
        >
            {SidebarContent()}
        </Drawer>
    );

    const SidebarDesktop = () => (
        <Drawer
            variant="permanent"
            open={open}
            className={clsx(classes.drawer, classes.drawerOpen)}
            classes={{
                paper: classes.drawerOpen,
            }}
        >
            {SidebarContent()}
        </Drawer>
    );

    return (
        <>
            <Hidden mdUp>{SidebarMobile()}</Hidden>
            <Hidden smDown>{SidebarDesktop()}</Hidden>
        </>
    );
};

export default Sidebar;
