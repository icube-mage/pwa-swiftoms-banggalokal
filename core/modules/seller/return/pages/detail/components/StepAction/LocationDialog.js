/* eslint-disable eqeqeq */
/* eslint-disable no-useless-escape */
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import Button from '@common_button';
import useStyles from '@sellermodules/return/pages/detail/components/StepAction/style';

const LocationDialog = (props) => {
    const {
        t, dataLocations, open, setOpen, formik,
    } = props;
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            classes={{ paper: classes.dialogContainer }}
            fullWidth
        >
            <DialogTitle className={classes.dialogTitleContainer}>
                { t('sellerreturn:Choose_a_Location_that_Receives_Packages')}
                <IconButton className={classes.closeButton} onClick={() => setOpen(false)}>
                    <CloseIcon className={classes.closeIcon} />
                </IconButton>
            </DialogTitle>
            <DialogContent className={clsx(classes.content, 'grid')}>
                <div className="title">{t('sellerreturn:Select_Location')}</div>
                <Autocomplete
                    id="package_received_by_loc"
                    name="package_received_by_loc"
                    options={dataLocations}
                    getOptionLabel={(option) => option.name}
                    value={dataLocations.find(({ code }) => code == formik.values.package_received_by_loc)}
                    onChange={(e) => formik.setFieldValue('package_received_by_loc', e?.code)}
                    primaryKey="code"
                    labelKey="name"
                    renderInput={(params) => (
                        <TextField
                            className={classes.textInput}
                            {...params}
                        />
                    )}
                    disableClearable
                />
            </DialogContent>
            <DialogContent className={clsx(classes.content, 'button')}>
                <Button disabled={!formik.values.package_received_by_loc} className={classes.btnAction} onClick={formik.handleSubmit}>
                    {t('sellerreturn:Package_Receive')}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default LocationDialog;
