/* eslint-disable no-nested-ternary */
import clsx from 'clsx';

import Grid from '@material-ui/core/Grid';
import Button from '@common_button';

import LocationDialog from '@sellermodules/return/pages/detail/components/StepAction/LocationDialog';
import useStyles from '@sellermodules/return/pages/detail/components/StepAction/style';

const PendingAction = (props) => {
    const { t, formik, handleCancel } = props;
    const classes = useStyles();

    return (
        <Grid container spacing={3} justifyContent="center" alignItems="center">
            <Grid item xs={12} sm="auto">
                <Button className={clsx(classes.btnAction, 'outlined')} onClick={handleCancel}>
                    {t('sellerreturn:Reject')}
                </Button>
            </Grid>
            <Grid item xs={12} sm="auto">
                <Button className={classes.btnAction} onClick={formik.handleSubmit}>
                    {t('sellerreturn:Approve')}
                </Button>
            </Grid>
        </Grid>
    );
};

const PackageAction = (props) => {
    const {
        t, handleCancel, formik,
    } = props;
    const classes = useStyles();

    return (
        <>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm="auto">
                    <Button className={clsx(classes.btnAction, 'outlined')} onClick={handleCancel}>
                        {t('sellerreturn:Cancel')}
                    </Button>
                </Grid>
                <Grid item xs={12} sm="auto">
                    <Button className={classes.btnAction} onClick={formik.handleSubmit}>
                        {t('sellerreturn:Package_Receive')}
                    </Button>
                </Grid>
            </Grid>
            <LocationDialog {...props} />
        </>
    );
};

const ProcessingAction = (props) => {
    const {
        t, formik,
    } = props;
    const classes = useStyles();

    return (
        <Button className={classes.btnAction} onClick={formik.handleSubmit}>
            {t('sellerreturn:Complete')}
        </Button>
    );
};

const StepActionComponent = (props) => {
    const { stepActive, t, formik } = props;

    const classes = useStyles();

    const renderComponent = () => {
        switch (stepActive) {
        case 0:
            return <PendingAction {...props} />;
        case 1:
        case 2:
            return <PackageAction {...props} />;
        case 3:
            return <div className={classes.helperText}>{t('sellerreturn:Marketplace_admin_will_create_a_credit_memo')}</div>;
        case 4:
            return formik.values.return_type === 'refund'
                ? <div className={classes.helperText}>{t('sellerreturn:Marketplace_admin_will_issue_a_refund')}</div>
                : <ProcessingAction {...props} />;
        default:
            return <div />;
        }
    };

    return (
        <div className={classes.actionContainer}>
            {renderComponent()}
        </div>
    );
};

export default StepActionComponent;
