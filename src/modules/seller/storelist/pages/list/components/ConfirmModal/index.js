/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import Button from '@common_button';

import useStyles from '@sellermodules/storelist/pages/list/components/ConfirmModal/style';

const ConfrimDialogContent = (props) => {
    const {
        t, setOpenDialog, openDialog, handleSet, isCancelRequest, handleCancelRequest,
    } = props;
    const classes = useStyles();

    const {
        channel_name, marketplace, brand_id, marketplace_code, marketplace_status, entity_id,
    } = openDialog;

    const onClose = () => {
        setOpenDialog({});
    };

    return (
        <Dialog
            open={isCancelRequest ? !!openDialog?.entity_id : !!openDialog.channel_id}
            onClose={onClose}
            classes={{ paper: classes.dialogContainer }}
            className={classes.dialogContainerRoot}
            fullWidth
            maxWidth="xs"
            scroll="paper"
        >
            <div className={classes.borderMobile}>
                <DialogContent className={classes.content}>
                    <div className="mb10">
                        <div className="bold f16">
                            { !isCancelRequest ? (
                                <>
                                    {t('sellerstorelist:Disconnect_Integration')}
                                    {' '}
                                    ?
                                </>
                            ) : (
                                t('sellerstorelist:Cancel_Request')
                            )}
                        </div>
                        <IconButton classes={{ root: classes.closeButton }} onClick={onClose}>
                            <CloseIcon className={classes.closeIcon} />
                        </IconButton>
                    </div>
                    <div className="mb30">
                        { !isCancelRequest ? (
                            <>
                                {t('sellerstorelist:Product_and_stock_information_for_marketplacechannel_will_be_deleted_from_the_admin_panel_within_310_minutes_depending_on_the_number_of_products_available_Order_information_that_has_been_recorded_can_still_be_accessed_on_the_Orders_page',
                                    {
                                        marketplace: marketplace?.marketplace_name,
                                        channel: channel_name,
                                    })}
                            </>
                        ) : (
                            <>
                                {t('sellerstorelist:Are_you_sure_to_cancel_request')}
                                {' '}
                                <span className={classes.spanUrl}>{openDialog.url_marketplace}</span>
                                {' ?'}
                            </>
                        )}
                    </div>
                    <div className="flex end">
                        <Button buttonType="outlined" className={classes.btn} onClick={onClose}>
                            {t('sellerstock:No')}
                        </Button>
                        <Button
                            className={classes.btn}
                            onClick={() => {
                                !isCancelRequest ? handleSet(brand_id, marketplace_code?.toLowerCase(), marketplace_status)
                                    : handleCancelRequest(entity_id);
                            }}
                        >
                            {t('sellerstock:Agree')}
                        </Button>
                    </div>
                </DialogContent>
            </div>
        </Dialog>
    );
};

export default ConfrimDialogContent;
