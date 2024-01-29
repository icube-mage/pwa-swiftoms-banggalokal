/* eslint-disable no-unused-vars */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@common_button';
import propTypes from 'prop-types';
import { useTranslation } from '@i18n';

const ConfirmationDialog = (props) => {
    const { t } = useTranslation('common');
    const {
        open = false,
        onConfirm,
        onCancel,
        onTable = false,
        title,
        message,
        records,
    } = props;
    return (
        <Dialog
            open={open}
            // onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                    {records ? (
                        <>
                            {' '}
                            {`(${records} ${t('common:records')})`}
                        </>
                    ) : null}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {
                    onTable && records === 0 ? <Button onClick={onCancel} color="primary">{t('common:OK')}</Button>
                        : (
                            <>
                                <Button onClick={onConfirm} color="primary">
                                    {t('common:OK')}
                                </Button>
                                <Button onClick={onCancel} buttonType="outlined" color="primary" autoFocus>
                                    {t('common:Cancel')}
                                </Button>
                            </>
                        )
                }
            </DialogActions>
        </Dialog>
    );
};

ConfirmationDialog.propTypes = {
    open: propTypes.bool.isRequired,
    onConfirm: propTypes.func.isRequired,
    onCancel: propTypes.func.isRequired,
    onTable: propTypes.bool.isRequired,
    title: propTypes.string,
    message: propTypes.string,
};

ConfirmationDialog.defaultProps = {
    title: 'Confirmation',
    message: 'Are you sure?',
};

export default ConfirmationDialog;
