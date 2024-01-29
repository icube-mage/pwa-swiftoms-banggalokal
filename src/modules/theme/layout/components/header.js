import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Hidden from '@material-ui/core/Hidden';
import Breadcrumb from '@common_breadcrumb';
import RightToolbar from '@modules/theme/layout/components/rightToolbar';
import SearchHeader from '@modules/theme/layout/components/search/index';
import { makeStyles } from '@material-ui/core/styles';
import { miniDrawerWidth, drawerWidth } from '@modules/theme/layout/helpers';

const useStyles = makeStyles((theme) => ({
    swiftOmsLogo: {
        padding: '12px 24px 12px 0px',
        borderRight: '1px solid #dde1ec',
        '& img': { height: 36, verticalAlign: 'middle' },
    },
    appBarShiftDesktop: {
        backgroundColor: '#fff',
        position: 'fixed',
        width: '100vw',
        height: 64,
    },
    appBar: {
        backgroundImage: 'linear-gradient(184deg, #D49AEB 50%, #F9C8C1 100%)',
        color: '#FFFFFF',
        boxShadow: 'none',
        marginLeft: miniDrawerWidth,
        width: `calc(100% - ${miniDrawerWidth + 1}px)`,
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
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth + 1}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
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
        color: '#bE1f93',
        borderRadius: '3px',
        background: '#fff',
        boxShadow: '0px 3px 6px #DDE1EC',
    },
}));

const Header = ({
    breadcrumbData,
    open,
    setOpen,
    notificationRes,
    storeLogo,
    dataAcl,
    isSeller,
    setLoadLang,
}) => {
    const classes = useStyles();

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
                <RightToolbar notificationRes={notificationRes} setLoadLang={setLoadLang} />
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

                <Breadcrumb data={breadcrumbData} />
                <SearchHeader isSeller={isSeller} dataAcl={dataAcl} />
                <RightToolbar notificationRes={notificationRes} />
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
