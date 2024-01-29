/* eslint-disable indent */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from '@i18n';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Hidden from '@material-ui/core/Hidden';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { miniDrawerWidthSeller, drawerWidthSeller } from '@modules/theme/layout/helpers';
import { PRIMARY, PRIMARY_DARK, TABLE_GRAY } from '@theme_color';
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
    togleMenuButton: {
        width: 24,
        height: 24,
        position: 'absolute',
        top: '16px',
        right: '16px',
    },
    togleMenuIcon: {
        fontSize: 27,
        color: PRIMARY,
        borderRadius: '3px',
        background: '#fff',
        boxShadow: '0px 3px 6px #DDE1EC',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    swiftOmsLogo: {
        cursor: 'pointer',
        padding: 12,
        justifyContent: 'center',
        '& img': {
            height: 45,
            marginTop: 10,
        },
    },

    divMenu: {
        color: '#B1BCDB',
        '& .itemText span': {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: 'bold',
            fontSize: 15,
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
        '&.open': {
            padding: '0 30px',
        },
    },
    menuItem: {
        marginTop: 30,
        paddingLeft: '12%',
        borderRadius: 12,
        '&.close': {
            paddingLeft: 13,
        },
        '&:hover': {
            background: TABLE_GRAY,
            color: PRIMARY,
            '& .itemIcon img': {
                filter: 'invert(19%) sepia(7%) saturate(5640%) hue-rotate(63deg) brightness(67%) contrast(94%)',
            },
        },
        '&.active': {
            background: TABLE_GRAY,
            color: PRIMARY,
            '& .itemIcon img': {
                filter: 'invert(19%) sepia(7%) saturate(5640%) hue-rotate(63deg) brightness(67%) contrast(94%)',
            },
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
            fontWeight: 'bold',
        },
        '&:hover': {
            background: 'transparent',
        },
    },
    divMenuBalance: {
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid #9E90BD',
        borderBottom: '1px solid #9E90BD',
        padding: '15px 0',
        color: PRIMARY_DARK,
        '& .itemText': {
            fontSize: 14,
            textTransform: 'capitalize',
        },
        '& .balance': {
            color: PRIMARY,
            fontWeight: 'bold',
        },
        '&.close': {
            visibility: 'hidden',
        },
    },
    menuItemBalance: {
        '& .itemIcon': {
            filter: 'invert(19%) sepia(7%) saturate(5640%) hue-rotate(63deg) brightness(67%) contrast(94%)',
            width: 12,
            height: 12,
            marginRight: 10,
        },
    },
}));

const Sidebar = ({
    activeParentMenu,
    setActiveParentMenu,
    activeChildMenu,
    setActiveChildMenu,
    open,
    setOpen,
    menuList,
    storeLogo,
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
    const balance = getLocalStorage('seller_balance');

    const SidebarContent = () => (
        <>
            <div
                className={clsx(classes.toolbar, classes.swiftOmsLogo, open ? 'open' : 'close')}
                onClick={() => router.push('/seller/order')}
                onKeyDown={() => router.push('/seller/order')}
            >
                <img
                    alt=""
                    src={open ? storeLogo?.logo || '/assets/img/swiftoms_logo_expanded.png'
                        : storeLogo?.favicon || '/assets/img/swiftoms_logo_collapsed.png'}
                />
            </div>
            <Hidden smUp>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => setOpen(false)}
                    className={clsx(classes.togleMenuButton)}
                >
                    <ChevronLeftIcon className={classes.togleMenuIcon} />
                </IconButton>
            </Hidden>
            <List className={clsx(classes.menuList, open ? 'open' : 'close')}>
                <div className={clsx(classes.divMenuBalance, open ? 'open' : 'close')}>
                    <div className={classes.menuItemBalance}>
                        <img className="itemIcon" alt="" src="/assets/img/layout/seller/income.svg" />
                        <span className="itemText">{t('common:Balance')}</span>
                    </div>
                    <div className="balance">
                        {balance}
                    </div>
                </div>
                {menuList?.map((menu) => (
                    <div key={menu.key}>
                        {aclDetail && (aclDetail?.acl_code?.includes(menu.aclCode) || menu.notInAcl) && !menu.hide && (
                            <div className={clsx(classes.divMenu, open ? 'open' : 'close')} key={menu.key}>
                                <Link href={menu.url} key={menu.key}>
                                    <a>
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
                                        </ListItem>
                                    </a>
                                </Link>
                                {menu && menu.children && menu.children.length && (
                                    <Collapse in={activeParentMenu && activeParentMenu.key === menu.key} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {menu.children.map((menuChild) => (
                                                <div key={menuChild.key}>
                                                    {((aclDetail && aclDetail?.acl_code?.includes(menuChild.aclCode))
                                                        || menuChild.notInAcl) && !menuChild.hide && (
                                                        <Link href={menuChild.url} key={menuChild.key}>
                                                            <a>
                                                                <ListItem
                                                                    button
                                                                    key={menuChild.key}
                                                                    className={clsx(
                                                                        classes.menuChildItem,
                                                                        menuChild.key === (activeChildMenu && activeChildMenu.key)
                                                                        && 'active',
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
        </>
    );

    const SidebarMobile = () => (
        <Drawer
            variant="temporary"
            open={open}
            onClose={() => setOpen(false)}
            className={clsx(classes.drawer, open ? classes.drawerOpen : classes.drawerClose)}
            classes={{
                paper: clsx(open ? classes.drawerOpen : classes.drawerClose),
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
            className={clsx(classes.drawer, open ? classes.drawerOpen : classes.drawerClose)}
            classes={{
                paper: clsx(open ? classes.drawerOpen : classes.drawerClose),
            }}
        >
            {SidebarContent()}
        </Drawer>
    );

    return (
        <>
            <Hidden smUp>{SidebarMobile()}</Hidden>
            <Hidden xsDown>{SidebarDesktop()}</Hidden>
        </>
    );
};

export default Sidebar;
