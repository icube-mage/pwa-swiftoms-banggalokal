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
    container: {
        borderRadius: 8,
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        color: PRIMARY_DARK,
    },
    title: {
        '& .MuiTypography-root': {
            color: PRIMARY_DARK,
            fontSize: 20,
            fontWeight: 600,
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
    dialogContent: {
        '&.MuiDialogContent-root': {
            overflowY: 'visible',
        },
    },
}));

const ConfirmationDialog = (props) => {
    const {
        open,
        itemSelected = {},
        t,
        setItem,
        handleDelete,
    } = props;
    const classes = useStyles();

    const onClose = () => {
        setItem({});
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            className={classes.container}
            fullWidth
            maxWidth="xs"
        >
            <DialogTitle className={classes.title}>
                <IconButton className={classes.closeButton} onClick={onClose}>
                    <CloseIcon className={classes.closeIcon} />
                </IconButton>
            </DialogTitle>
            <DialogTitle className={classes.title}>{t('storesetting:Delete_Display_Window')}</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText className={classes.text}>
                    {t('storesetting:Are_you_sure_want_to_delete_sku_', { sku: itemSelected?.name_origin })}
                </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.btn}>
                <Button onClick={() => handleDelete(itemSelected, setItem)} color="primary">
                    {t('storesetting:OK')}
                </Button>
                <Button onClick={onClose} buttonType="outlined" color="primary" autoFocus>
                    {t('storesetting:Cancel')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
