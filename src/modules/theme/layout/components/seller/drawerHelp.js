/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { useTranslation } from '@i18n';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { setLocalStorage } from '@helper_localstorage';
import { makeStyles } from '@material-ui/core/styles';

import { PRIMARY, BORDER_COLOR } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    drawerHelp: {
        '& .help-main': {
            background: '#FFFFFF',
            height: '100%',
            width: 360,
            [theme.breakpoints.down('xs')]: {
                width: 310,
            },
        },
        '& ._help': {
            padding: 16,
        },
        '& .help-title': {
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            borderBottom: `1px solid ${BORDER_COLOR}`,
            '& svg:hover': {
                cursor: 'pointer',
            },
        },
        '& .help-content': {
            display: 'flex',
            flexDirection: 'column',
            padding: '24px 16px 20px 16px',
            gap: 16,
        },
        '& .help-list': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 16,
            border: `1px solid ${BORDER_COLOR}`,
            borderRadius: 4,
            '&:hover': {
                borderColor: PRIMARY,
                cursor: 'pointer',
            },
            '& img': {
                marginRight: 16,
                width: 22,
                height: 22,
            },
            '& img.invert': {
                filter: 'invert(24%) sepia(94%) saturate(2110%) hue-rotate(295deg) brightness(81%) contrast(101%)',
            },
            '& span': {
                flex: '1 1 auto',
            },
        },
    },
}));

const DrawerHelp = ({ openHelp, setOpenHelp }) => {
    const { t } = useTranslation('common');
    const classes = useStyles();

    return (
        <Drawer
            anchor="right"
            open={openHelp}
            onClose={() => setOpenHelp(false)}
            className={classes.drawerHelp}
            classes={{
                paper: 'drawer-paper',
            }}
        >
            <div className="help-main">
                <div className="_help help-title">
                    <CloseIcon onClick={() => setOpenHelp(false)} />
                    <h4 style={{ margin: 0 }}>{t('common:help_center')}</h4>
                </div>
                <div className="_help help-content">
                    <div
                        onClick={() => {
                            setOpenHelp(false);
                            if (!document.querySelector('.widget-open')) {
                                const widgetChat = document.querySelector('#deskWidgetMain .toggle-trigger');
                                widgetChat.click();
                            }
                        }}
                    >
                        <div className="help-list">
                            <img alt="" src="/assets/img/sellericon/chat.svg" style={{ width: 'auto' }} />
                            <span>{t('common:call_support')}</span>
                            <ChevronRightIcon className={classes.arrowBalance} />
                        </div>
                    </div>
                    <Link href="/seller/dashboard">
                        <div className="help-list" onClick={() => setLocalStorage('GUIDE_HOMEPAGE', true)}>
                            <img alt="" src="/assets/img/sellericon/refresh.svg" />
                            <span>{t('common:demo_fitur')}</span>
                            <ChevronRightIcon className={classes.arrowBalance} />
                        </div>
                    </Link>
                    <Link href="/seller/about">
                        <div className="help-list">
                            <img alt="" src="/assets/img/sellericon/icon_help.svg" />
                            <span>{t('common:about_sirclo')}</span>
                            <ChevronRightIcon className={classes.arrowBalance} />
                        </div>
                    </Link>
                </div>
            </div>
        </Drawer>
    );
};

export default DrawerHelp;
