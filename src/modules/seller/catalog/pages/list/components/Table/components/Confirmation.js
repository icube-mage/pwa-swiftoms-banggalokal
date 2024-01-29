import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@common_button';
import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY_DARK } from '@theme_color';

const useStyles = makeStyles(() => ({
    title: {
        '& .MuiTypography-root': {
            color: PRIMARY_DARK,
            fontSize: 16,
            fontWeight: 600,
        },
    },
    closeButtonDialog: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: PRIMARY_DARK,
        '& svg': {
            width: 20,
            height: 20,
        },
    },
    text: {
        '&.MuiDialogContentText-root': {
            color: PRIMARY_DARK,
            fontSize: 14,
        },
    },
    btn: {
        '&.MuiDialogActions-root': {
            padding: 20,
        },
    },
}));

const ConfirmationDialog = (props) => {
    const {
        open = false,
        onConfirm,
        onCancel,
        productSelected = {},
        t,
        multiple = false,
        messageTitle,
        messageContent,
        maxWidth = 'xs',
    } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            className={classes.container}
            maxWidth={maxWidth}
        >
            <DialogTitle className={classes.title}>
                {
                    messageTitle || (multiple
                        ? t('categories:Delete_all_selected_products')
                        : `${t('categories:Delete_Product')} ${productSelected?.name || ''} ?`)
                }
                <IconButton className={classes.closeButtonDialog} onClick={onCancel}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText className={classes.text}>
                    { messageContent || t('categories:section_info_delete_product') }
                </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.btn}>
                <Button onClick={onCancel} buttonType="outlined" color="primary" autoFocus>
                    {t('common:No')}
                </Button>
                <Button onClick={onConfirm} color="primary">
                    {t('common:Agree')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
