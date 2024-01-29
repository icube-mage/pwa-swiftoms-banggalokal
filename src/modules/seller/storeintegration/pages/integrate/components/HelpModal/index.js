import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import TextField from '@common_textfield';
import Button from '@common_button';

import { breakPointsUp } from '@helper_theme';
import useStyles from '@sellermodules/storeintegration/pages/integrate/components/HelpModal/style';

export const isEmpty = (value) => {
    if ([undefined, null, '', false, NaN].includes(value)) return true;
    if (value && value.length <= 0) return true;
    return false;
};

const EditStockContent = (props) => {
    const {
        t, data, setOpenHelp, openHelp, formikHelp,
    } = props;
    const classes = useStyles();
    const isDesktop = breakPointsUp('sm');

    const onClose = () => {
        formikHelp.resetForm();
        setOpenHelp(false);
    };

    return (
        <Dialog
            open={openHelp}
            onClose={onClose}
            classes={{ paper: classes.dialogContainer }}
            className={classes.dialogContainerRoot}
            fullWidth
            maxWidth="md"
            fullScreen={!isDesktop}
            scroll="paper"
        >
            <IconButton classes={{ root: classes.closeButton }} onClick={onClose}>
                <CloseIcon className={classes.closeIcon} />
            </IconButton>
            <DialogTitle classes={{ root: classes.dialogTitleRoot }} disableTypography>
                {t('sellerstock:Integration')}
                {' '}
                {data.marketplace_name}
            </DialogTitle>
            <DialogContent className={classes.content}>
                <div className={classes.gridFormContainer}>
                    <div className="label">{t('sellerstock:Store_Link')}</div>
                    <TextField
                        fullWidth
                        multiple
                        name="url_marketplace"
                        value={formikHelp.values.url_marketplace}
                        onChange={formikHelp.handleChange}
                        onBlur={formikHelp.handleBlur}
                        className={classes.textInput}
                        variant="standard"
                        error={!!(formikHelp.touched.url_marketplace && formikHelp.errors.url_marketplace)}
                        helperText={(formikHelp.touched.url_marketplace && formikHelp.errors.url_marketplace) || ''}
                    />
                </div>
                <div className={classes.gridFormContainer}>
                    <div className="label">{t('sellerstock:Email')}</div>
                    <TextField
                        fullWidth
                        multiple
                        name="email"
                        value={formikHelp.values.email}
                        onChange={formikHelp.handleChange}
                        onBlur={formikHelp.handleBlur}
                        className={classes.textInput}
                        variant="standard"
                        error={!!(formikHelp.touched.email && formikHelp.errors.email)}
                        helperText={(formikHelp.touched.email && formikHelp.errors.email) || ''}
                    />
                </div>
            </DialogContent>
            <DialogActions classes={{ root: classes.actionsRoot }} disableSpacing>
                <Button classes={{ root: classes.buttonRoot }} onClick={formikHelp.handleSubmit} fullWidth>
                    {t('sellerstoreintegration:Submit')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditStockContent;
