/* eslint-disable*/
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@common_button';
import useStyles from '@sellermodules/stock/pages/list/components/EditModal/style';
import Switch from './swicth';
import CloseIcon from '@material-ui/icons/Close';
import SyncIcon from '@material-ui/icons/Sync';

export const isEmpty = (value) => {
    if ([undefined, null, '', false, NaN].includes(value)) return true;
    if (value && value.length <= 0) return true;
    return false;
};

const SyncModal = (props) => {
    const {
        t, openSyncModal, setOpenSyncModal, getSellerChannelList, updateChannelList, saveChannelStockConfig, syncAllStockToChannel
    } = props;
    
    const classes = useStyles();
    const onClose = () => setOpenSyncModal(false);
    const channelList = getSellerChannelList?.getSellerChannelList?.items || [];
    const [tampChannel, setTampChannel] = React.useState([]);
    const [confirmOn, setConfirmOn] = React.useState(false);
    const [confirmSync, setConfirmSync] = React.useState(false);
    const [tampChannelCode, setTampChannelCode] = React.useState('');
    const [tampPushStock, setTampPushStock] = React.useState('');

    const saveStockConfig = async (channel_code, push_stock) => {
        const res = await saveChannelStockConfig({ variables: {
            channel_code: channel_code,
            push_stock: push_stock
        } });

        if (res.data.saveChannelStockConfig) {
            updateChannelList();
        }
    };

    const handleAllSync = () => {
        setOpenSyncModal(false);
        window.backdropLoader(true);
        syncAllStockToChannel({
            variables: { channel_code: tampChannel },
        }).then((res) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: res.data?.syncAllStockToChannel,
                variant: 'success',
            });
        }).catch((e) => {
            window.backdropLoader(false);
            window.toastMessage({
                open: true,
                text: e.message,
                variant: 'error',
            });
        });
    };

    React.useEffect(() => {
        const filteredChannels = channelList
            .filter((e) => e.channel_stock_config.push_stock === true)
            .map((e) => e.channel_code);
        setTampChannel(filteredChannels);
    }, [channelList]);

    return (
            <>
            <Dialog
                open={openSyncModal}
                onClose={onClose}
                classes={{ paper: classes.modalContainer }}
                fullWidth
                maxWidth="xs"
                fullScreen={false}
                scroll="paper"
            >
                <div className={classes.modalHeader}>
                    {t('enable_stock_sync')} 
                    <CloseIcon class="closeModal" onClick={() => setOpenSyncModal(false) } />
                </div>
                <div className={classes.modalContent}>
                    <div className={classes.modalNote}>
                        <p>{t('sync_alert_1')}, {t('sync_alert_2')}</p>
                    </div>
                    { channelList?.map((list) => (<>
                        <div className={classes.modalSyncContainer}>
                            <img src={list?.marketplace?.image_url} />
                            <span>{ list?.channel_name || '-' }</span>
                            <span class="toggle-switch">
                                <Switch
                                    value={list?.channel_stock_config?.channel_code && list?.channel_stock_config?.push_stock }
                                    switchStyle={classes.switchStyle}
                                    classes={classes}
                                    onChange={() => {
                                        let channelCode;
                                        let pushStock;
                                        if (list?.channel_stock_config?.channel_code !== list?.channel_code) {
                                            channelCode = list?.channel_code;
                                            pushStock = false;
                                        } else {
                                            channelCode = list?.channel_stock_config?.channel_code || list?.channel_code;
                                            pushStock = list?.channel_stock_config?.push_stock || false;
                                        }
                                        

                                        if (list?.channel_stock_config?.push_stock) {
                                            pushStock = pushStock === true ? false : true;
                                        } else {
                                            pushStock = true;
                                        }

                                        setTampChannelCode(channelCode);
                                        setTampPushStock(pushStock);
                                        if (pushStock) {
                                            setConfirmOn(true);
                                        } else {
                                            saveStockConfig(channelCode, pushStock);
                                        }
                                    }}
                                />
                            </span>
                        </div>
                    </>)) }
                    <div className={classes.modalRuler} />
                    <Button
                        className={classes.btnAllSync}
                        buttonType="outlined"
                        onClick={() => setConfirmSync(true)}
                        disabled={!tampChannel.length > 0}
                    >
                        <SyncIcon className={classes.btnIcon} />
                        {t('Sync_Stock_Now')}
                    </Button>
                </div>
            </Dialog>
            <Dialog
                open={confirmOn}
                classes={{ paper: classes.modalContainer }}
                fullWidth
                maxWidth="sm"
                fullScreen={false}
                scroll="paper"
            >
                <div className={classes.modalHeader}>
                    {t('Are_you_sure_enable')}
                </div>
                <div className={classes.modalContent}>
                    <div className={classes.modalNote}>
                        <p>{t('All_stock_will_be_sync')}<br />{t('if_there_has_previously_been_a_stock')}</p>
                    </div>
                </div>
                <DialogActions>
                    <Button onClick={() => setConfirmOn(false)} buttonType="outlined" color="primary" autoFocus>
                        {t('common:btn_cancel')}
                    </Button>
                    <Button onClick={() => {
                            saveStockConfig(tampChannelCode, tampPushStock);
                            setConfirmOn(false);
                        }}
                        color="primary">
                        {t('common:continue')}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={confirmSync}
                classes={{ paper: classes.modalContainer }}
                fullWidth
                maxWidth="sm"
                fullScreen={false}
                scroll="paper"
            >
                <div className={classes.modalHeader}>
                    {t('Are_you_sure_enable')}
                </div>
                <div className={classes.modalContent}>
                    <div className={classes.modalNote}>
                        <p>{t('All_stock_will_be_sync')}<br />{t('if_there_has_previously_been_a_stock')}</p>
                    </div>
                </div>
                <DialogActions>
                    <Button onClick={() => setConfirmSync(false)} buttonType="outlined" color="primary" autoFocus>
                        {t('common:btn_cancel')}
                    </Button>
                    <Button onClick={() => {
                            handleAllSync();
                            setConfirmSync(false);
                        }}
                        color="primary">
                        {t('common:continue')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SyncModal;
