import React from 'react';
import useStyles from '@modules/withdrawapproval/pages/list/components/balancemodal/style';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';

const BalanceModalContent = (props) => {
    const {
        data,
        loading,
        error,
        open,
        handleClose,
        t,
    } = props;
    const classes = useStyles();

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth="true" classes={{ paper: classes.paper }}>
            <DialogTitle classes={{ root: classes.titleTop }}>
                <div>{t('withdrawapproval:Balance')}</div>
                <div>
                    <CloseIcon className={classes.close} onClick={handleClose} />
                </div>
            </DialogTitle>
            <DialogContent classes={{ root: classes.content }}>
                {loading && <CircularProgress className={classes.progress} size={30} />}
                {error && error?.message ? <div className={classes.error}>{error?.message || 'Error'}</div> : null}
                {!loading && !error && data && data.getAccountIrisBalance
                    ? <div className={classes.balanceData}>{data.getAccountIrisBalance}</div>
                    : null}
            </DialogContent>
        </Dialog>
    );
};

export default BalanceModalContent;
