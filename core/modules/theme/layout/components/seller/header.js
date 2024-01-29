import React from 'react';
import clsx from 'clsx';
import gqlService from '@modules/theme/services/graphql';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

import RightToolbar from '@modules/theme/layout/components/seller/rightToolbar';
import { miniDrawerWidthSeller, drawerWidthSeller } from '@modules/theme/layout/helpers';
import { PRIMARY_DARK } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    swiftOmsLogo: {
        padding: '12px 24px 12px 0px',
        '& img': { height: 36, verticalAlign: 'middle' },
    },
    appBarShiftDesktop: {
        backgroundColor: '#fff',
        position: 'fixed',
        width: '100vw',
        height: 64,
    },
    appBar: {
        backgroundColor: 'white',
        color: PRIMARY_DARK,
        boxShadow: '2px 0px 20px #4D2F821A',
        marginLeft: miniDrawerWidthSeller,
        width: `calc(100% - ${miniDrawerWidthSeller + 1}px)`,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
            width: '100%',
        },
    },
    appBarShift: {
        marginLeft: drawerWidthSeller,
        width: `calc(100% - ${drawerWidthSeller + 1}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxShadow: '2px 0px 20px #4D2F821A',
    },
    togleMenuButton: {
        marginRight: -6,
        width: 24,
        height: 24,
        transform: 'translateX(-24px)',
        [theme.breakpoints.down('xs')]: {
            marginRight: 0,
            transform: 'translate(0px, -2px)',
        },
    },
    togleMenuIcon: {
        fontSize: 27,
        color: PRIMARY_DARK,
        borderRadius: '3px',
        background: '#fff',
        boxShadow: '0px 3px 6px #DDE1EC',
    },
}));

const Header = ({
    open, setOpen, notificationRes, storeLogo, refetch, chatAgentCode,
}) => {
    const classes = useStyles();

    const { loading, data: chat } = gqlService.getStoreConfig({
        path: 'swiftoms_vendorportal/seller_chat/enable_chat',
    });
    if (loading) {
        return <div />;
    }

    const dataChat = {
        chat: JSON.parse(chat.getStoreConfig),
        chatAgentCode,
    };

    const HeaderMobile = () => (
        <AppBar position="fixed" className={clsx(classes.appBar)}>
            <Toolbar>
                <div className={clsx(classes.swiftOmsLogo, open ? 'open' : 'close')}>
                    <img alt="" src={(storeLogo && storeLogo.favicon) || '/assets/img/swiftoms_logo_collapsed.png'} />
                </div>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => setOpen(!open)}
                    className={clsx(classes.togleMenuButton)}
                >
                    <ChevronRightIcon className={classes.togleMenuIcon} />
                </IconButton>
                <RightToolbar notificationRes={notificationRes} refetch={refetch} {... dataChat} />
            </Toolbar>
        </AppBar>
    );

    const HeaderDesktop = () => (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => setOpen(!open)}
                    className={clsx(classes.togleMenuButton)}
                >
                    {open ? <ChevronLeftIcon className={classes.togleMenuIcon} /> : <ChevronRightIcon className={classes.togleMenuIcon} />}
                </IconButton>
                <RightToolbar notificationRes={notificationRes} refetch={refetch} {... dataChat} />
            </Toolbar>
        </AppBar>
    );

    return (
        <>
            <Hidden smUp implementation="css">
                {HeaderMobile()}
            </Hidden>
            <Hidden xsDown implementation="css">
                <div className={classes.appBarShiftDesktop} />
                {HeaderDesktop()}
            </Hidden>
        </>
    );
};

export default Header;
