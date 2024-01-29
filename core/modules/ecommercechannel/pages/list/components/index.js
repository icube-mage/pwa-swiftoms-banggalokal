/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable object-curly-newline */
import React from 'react';
import Header from '@modules/ecommercechannel/pages/list/components/Header';
import useStyles from '@modules/ecommercechannel/pages/list/components/style';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import ConfirmDialog from 'core/modules/commons/ConfirmDialog';
import Link from 'next/link';

import MaterialButton from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import CircularProgress from '@material-ui/core/CircularProgress';

const ChannelListContent = (props) => {
    const { data, getChannelList, deleteChannel, disconnectMarketplaceChannel, reconnectMarketplaceChannel,
        firstLoad, setFirstLoad, loading, updateConnectedMarketplaceRes, t } = props;
    const classes = useStyles();
    const router = useRouter();

    const channelList = data?.getChannelList?.items || [];
    const marketplaceUpdated = updateConnectedMarketplaceRes?.data?.updateConnectedMarketplace?.channel_code || [];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [active, setActive] = React.useState(null);
    const [search, setSearch] = React.useState('');
    const [confirmDelete, setConfirmDelete] = React.useState('');
    const [confirmDisconnect, setConfirmDisconnect] = React.useState('');

    const handleUpdateMp = (item) => {
        if (item) {
            const { marketplace_status, channel_code } = item;
            if (updateConnectedMarketplaceRes.called && !updateConnectedMarketplaceRes.loading && !updateConnectedMarketplaceRes.error) {
                if (marketplaceUpdated.length && marketplaceUpdated.includes(channel_code)) {
                    return 1;
                }
                return null;
            }
            return marketplace_status;
        }
        return null;
    };

    const handleClick = (event, item) => {
        setActive(item);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        if (active && active.channel_id) {
            setConfirmDelete(false);
            window.backdropLoader(true);
            deleteChannel({ variables: { id: active.channel_id } });
        }
    };

    const handleDisconnect = () => {
        if (active && active.brand_id && active.marketplace_code) {
            setConfirmDisconnect(false);
            window.backdropLoader(true);
            disconnectMarketplaceChannel({
                variables: {
                    input: {
                        brand_id: active.brand_id,
                        marketplace_code: active.marketplace_code,
                    },
                },
            });
        }
    };

    const handleReconnect = () => {
        if (active && active.brand_id && active.marketplace_code) {
            window.backdropLoader(true);
            reconnectMarketplaceChannel({
                variables: {
                    input: {
                        brand_id: active.brand_id,
                        marketplace_code: active.marketplace_code,
                        callback_url: `${window.origin}${router.pathname}?`,
                    },
                },
            });
        }
    };

    // eslint-disable-next-line consistent-return
    React.useEffect(() => {
        if (!firstLoad) {
            const onChangeTimeOut = setTimeout(() => {
                getChannelList({
                    variables: {
                        search,
                    },
                });
                return null;
            }, 500);

            return () => clearTimeout(onChangeTimeOut);
        }
        if (firstLoad) {
            setFirstLoad(false);
        }
    }, [search]);

    return (
        <div className={classes.contentContainer}>
            <Header search={search} setSearch={setSearch} t={t} />
            {loading ? (
                <div className={classes.centerDiv}>
                    <CircularProgress className={classes.progress} />
                </div>
            )
                : channelList.length
                    ? channelList.map((item, idx) => (
                        <div className={clsx(classes.listContainer, item.framework === 'Marketplace' && 'mp')} key={idx}>
                            <div className={classes.centerDiv}>
                                <img
                                    src={item.image_url}
                                    alt=""
                                    className={classes.icon}
                                    onError={(event) => event.target.style.display = 'none'}
                                />
                            </div>
                            <div style={{ paddingLeft: 20 }}>
                                <span className={classes.channelName}>
                                    {item.channel_name}
                                </span>
                                {item.framework === 'Marketplace'
                                    ? (
                                        <div style={{ margin: '10px 0' }}>
                                            <span className={clsx(classes.status, handleUpdateMp(item) && 'green')}>
                                                {handleUpdateMp(item) ? t('ecommercechannel:Connected') : t('ecommercechannel:Disconnected')}
                                            </span>
                                        </div>
                                    ) : <br />}
                                <span className={classes.channelCode}>
                                    {`${t('ecommercechannel:Channel_Code')}:`}
                                    <br />
                                    {item.channel_code}
                                </span>
                            </div>
                            {item.framework === 'Marketplace'
                                && (
                                    <div className={classes.baselineDiv}>
                                        <span className={classes.channelCode}>
                                            {t('ecommercechannel:Brand_Name')}
                                            <br />
                                            {item.brand_name || '-'}
                                        </span>
                                    </div>
                                )}
                            <div className={classes.centerDiv}>
                                <MaterialButton
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    onClick={(e) => handleClick(e, item)}
                                >
                                    <SettingsIcon style={{ fontSize: 36 }} />
                                </MaterialButton>
                            </div>
                        </div>
                    )) : (
                        <div className={classes.centerDiv}>
                            <span className={classes.noRecords}>{t('ecommercechannel:No_records_found')}</span>
                        </div>
                    )}
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >

                <MenuItem
                    classes={{
                        root: clsx(classes.menuItem, 'purple'),
                    }}
                >
                    <Link href={active?.channel_id ? `/oms/channel/edit/${active.channel_id}_ecommercechannel` : '/'}>
                        <a>{t('ecommercechannel:Edit')}</a>
                    </Link>
                </MenuItem>
                {handleUpdateMp(active) && active?.framework === 'Marketplace'
                    ? (
                        <MenuItem
                            onClick={() => {
                                handleClose();
                                setConfirmDisconnect(true);
                            }}
                            classes={{
                                root: classes.menuItem,
                            }}
                        >
                            {t('ecommercechannel:Disconnect')}
                        </MenuItem>
                    ) : null}
                {!handleUpdateMp(active) && active?.framework === 'Marketplace'
                    ? (
                        <MenuItem
                            onClick={() => {
                                handleClose();
                                handleReconnect();
                            }}
                            classes={{
                                root: classes.menuItem,
                            }}
                        >
                            {t('ecommercechannel:Reconnect')}
                        </MenuItem>
                    ) : null}
                <MenuItem
                    onClick={() => {
                        handleClose();
                        setConfirmDelete(true);
                    }}
                    classes={{
                        root: classes.menuItem,
                    }}
                >
                    {t('ecommercechannel:Delete')}
                </MenuItem>
            </Menu>
            <ConfirmDialog
                open={confirmDelete}
                onCancel={() => setConfirmDelete(false)}
                onConfirm={handleDelete}
                title={t('ecommercechannel:Delete_Channel')}
                message={t('ecommercechannel:Are_you_sure_want_to_delete_this_channel')}
            />
            <ConfirmDialog
                open={confirmDisconnect}
                onCancel={() => setConfirmDisconnect(false)}
                onConfirm={handleDisconnect}
                title={t('ecommercechannel:Disconnect_Channel')}
                message={t('ecommercechannel:Are_you_sure_want_to_disconnect_this_channel')}
            />
        </div>
    );
};

export default ChannelListContent;
