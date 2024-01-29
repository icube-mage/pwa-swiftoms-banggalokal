/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import gqlService from '@modules/theme/services/graphql';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import Hidden from '@material-ui/core/Hidden';
import RightToolbar from '@modules/theme/layout/components/seller/rightToolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { miniDrawerWidthSeller, drawerWidthSeller } from '@modules/theme/layout/helpers';
import LanguageSelect from '@modules/theme/layout/components/languageSelect';
import SearchHeader from '@modules/theme/layout/components/search/index';
import { PRIMARY_DARK, BORDER_COLOR } from '@theme_color';
import gqlSeller from '@sellermodules/storesetting/services/graphql';

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
        [theme.breakpoints.down('md')]: {
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
        [theme.breakpoints.down('md')]: {
            marginRight: 6,
            transform: 'translate(7px, -2px)',
        },
    },
    togleMenuIcon: {
        fontSize: 27,
        color: PRIMARY_DARK,
        borderRadius: '3px',
        background: '#fff',
    },
    h4Title: {
        paddingRight: 15,
        marginRight: 5,
        borderRight: `1px solid ${BORDER_COLOR}`,
        marginBottom: 26,
        '&.mobile': {
            padding: '0 0 4px 10px',
            border: 0,
            width: '48vw',
            margin: 0,
        },
    },
    h4TitleNav: {
        padding: '0 0 4px 10px',
        border: 0,
        margin: 0,
    },
    searchMobile: {
        padding: '0 12px 12px 12px',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease, padding 0.3s ease',
        '&.show': {
            maxHeight: 450,
        },
        '&.hides': {
            maxHeight: 0,
            paddingBottom: 0,
        },
    },
    headerMessage: {
        background: '#fff5db',
        border: '1px #fbd362 solid',
        color: '#000000 !important',
        padding: 10,
        borderRadius: 5,
        marginLeft: 12,
    },
}));

const Header = ({
    open,
    setOpen,
    notificationRes,
    informationUpdateRes,
    refetch,
    chatAgentCode,
    dataAcl,
    isSeller,
    pageConfig,
    backUrl,
    setLoadLang,
}) => {
    const classes = useStyles();
    const router = useRouter();

    const [openSearch, setOpenSearch] = React.useState(false);

    const { loading, data: chat } = gqlService.getStoreConfig({
        path: 'swiftoms_vendorportal/seller_chat/enable_chat',
    });
    const { data } = gqlSeller.getSeller();

    if (loading) {
        return <div />;
    }

    const dataChat = {
        chat: chat?.getStoreConfig && JSON.parse(chat.getStoreConfig),
        chatAgentCode,
    };

    const HeaderMobile = () => (backUrl
        ? (
            <AppBar position="fixed" className={clsx(classes.appBar)}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => router.push(backUrl)}
                        className={classes.togleMenuButton}
                    >
                        <ArrowBackOutlinedIcon className={classes.togleMenuIcon} />
                    </IconButton>
                    <h4 className={classes.h4TitleNav}>{pageConfig.title}</h4>
                </Toolbar>
            </AppBar>
        )
        : (
            <AppBar position="fixed" className={clsx(classes.appBar)}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => setOpen(!open)}
                        className={clsx(classes.togleMenuButton, 'togle-sidebar')}
                    >
                        <MenuIcon className={classes.togleMenuIcon} />
                    </IconButton>
                    <h4 className={clsx(classes.h4Title, 'mobile')}>{pageConfig.title}</h4>
                    <RightToolbar
                        notificationRes={notificationRes}
                        informationUpdateRes={informationUpdateRes}
                        refetch={refetch}
                        isSeller={isSeller}
                        dataAcl={dataAcl}
                        openSearch={openSearch}
                        setOpenSearch={setOpenSearch}
                        {...dataChat}
                    />
                </Toolbar>
                <div
                    className={clsx(classes.searchMobile, openSearch ? 'show' : 'hides')}
                    onClick={() => setOpenSearch(true)}
                >
                    <SearchHeader isSeller={isSeller} dataAcl={dataAcl} />
                </div>
            </AppBar>
        )

    );

    const HeaderDesktop = () => (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, classes.appBarShift)}
        >
            <Toolbar>
                <h4 className={classes.h4Title}>{pageConfig.title}</h4>
                <LanguageSelect color={PRIMARY_DARK} setLoadLang={setLoadLang} />
                { data?.getSeller?.subscribtion_plan?.billing_message && (
                    <div className={classes.headerMessage}>
                        <span dangerouslySetInnerHTML={{ __html: data?.getSeller?.subscribtion_plan?.billing_message }} />
                    </div>
                )}
                <RightToolbar
                    notificationRes={notificationRes}
                    informationUpdateRes={informationUpdateRes}
                    refetch={refetch}
                    isSeller={isSeller}
                    dataAcl={dataAcl}
                    openSearch={openSearch}
                    setOpenSearch={setOpenSearch}
                    {...dataChat}
                />
            </Toolbar>
        </AppBar>
    );

    return (
        <>
            <Hidden mdUp implementation="css">
                {HeaderMobile()}
            </Hidden>
            <Hidden smDown implementation="css">
                <div className={classes.appBarShiftDesktop} />
                {HeaderDesktop()}
            </Hidden>
        </>
    );
};

export default Header;
