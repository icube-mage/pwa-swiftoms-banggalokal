import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Button from '@common_button';

import useStyles from '@sellermodules/warehouse/pages/list/components/ConfirmModal/style';

const ConfrimDialogContent = (props) => {
    const {
        t, productSelected, setOpenDialog, openDialog, handleAction,
    } = props;
    const classes = useStyles();
    const isChannel = productSelected.channels && productSelected.channels.length > 0;

    const onClose = () => {
        setOpenDialog(false);
    };

    return (
        <Dialog
            open={openDialog}
            onClose={onClose}
            classes={{ paper: classes.dialogContainer }}
            className={classes.dialogContainerRoot}
            fullWidth
            maxWidth="xs"
            scroll="paper"
        >
            <div className={classes.borderMobile}>
                <DialogTitle className={classes.title}>
                    {`${t('sellerwarehouse:Delete_Location')} `}
                    { !isChannel && productSelected.name }
                    <IconButton className={classes.closeButtonDialog} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className={classes.content}>
                    {isChannel && (
                        <div style={{ marginBottom: 15 }}>
                            {t('sellerwarehouse:This_location_is_mapped')}
                            <br />
                            <ul className="channel-name">
                                {productSelected.channels.map((e) => (
                                    <li>
                                        <span>{e.channel_name}</span>
                                    </li>
                                ))}
                            </ul>
                            {t('sellerwarehouse:By_deleting_this_location')}
                        </div>
                    )}
                    {t('sellerwarehouse:Are_you_sure_want_to_delete_this_location')}
                </DialogContent>
                <DialogActions className={classes.btnActions}>
                    <Button onClick={onClose} buttonType="outlined" color="primary">
                        {t('common:No')}
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => {
                            handleAction({ id: productSelected.id }, 'delete');
                            onClose();
                        }}
                    >
                        {t('common:Agree')}
                    </Button>
                </DialogActions>
            </div>
        </Dialog>
    );
};

export default ConfrimDialogContent;
