import clsx from 'clsx';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';

import CloseIcon from '@material-ui/icons/Close';

import Autocomplete from '@common_autocomplete';
import TextField from '@common_textfield';
import Button from '@common_button';

import useStyles from '@sellermodules/onlinestore/pages/default/components/ModalForm/style';

const ModalForm = (props) => {
    const {
        t, open, onClose, formik,
    } = props;
    const classes = useStyles();

    const templateOptions = [
        { name: 'Template 1', id: 1 },
        { name: 'Template 2', id: 2 },
        { name: 'Template 3', id: 3 },
        { name: 'Template 4', id: 4 },
        { name: 'Template 5', id: 5 },
        { name: 'Template 6', id: 6 },
    ];
    return (
        <Dialog
            open={open}
            onClose={onClose}
            classes={{ paperWidthSm: classes.paperWidthSm }}
            className={classes.wrapperDialog}
        >
            <DialogTitle>
                <IconButton className={classes.closeButtonDialog} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <div className={classes.contentDialogForm}>
                    <div className={classes.label}>
                        {t('selleronlinestore:Store_Code')}
                    </div>
                    <Grid container spacing={0} alignItems="center">
                        <Grid item xs={9}>
                            <TextField
                                name="store_code"
                                value={formik.values.store_code}
                                onChange={formik.handleChange}
                                className={classes.textInput}
                                fullWidth
                                error={!!(formik.touched.store_code && formik.errors.store_code)}
                                helperText={(formik.touched.store_code && formik.errors.store_code) || ''}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            .swift.com
                        </Grid>
                    </Grid>
                    <div className={clsx(classes.note, formik.touched.store_code && formik.errors.store_code ? 'marginTop' : undefined)}>
                        {t('selleronlinestore:Store_Code_specifies_the_store_url_address')}
                        {' '}
                        {t('selleronlinestore:Example')}
                        :
                        {' '}
                        tokosaya.swift.com
                    </div>
                </div>
                <div className={classes.contentDialogForm}>
                    <div className={classes.label}>
                        {t('selleronlinestore:Choose_Template')}
                    </div>
                    <Grid container spacing={0} alignItems="center">
                        <Grid item xs={9}>
                            <Autocomplete
                                name="template"
                                value={templateOptions.find(({ id }) => id === formik.values.template)}
                                className={classes.textInput}
                                options={templateOptions}
                                onChange={(e) => formik.setFieldValue('template', e?.id)}
                            />
                        </Grid>
                    </Grid>
                    {!!formik.values.template
                    && (
                        <div className={classes.templateImageContainer}>
                            <div
                                className={classes.templateImage}
                                style={{ backgroundImage: "url('/assets/img/placeholder_image.jpg')" }}
                            />
                        </div>
                    )}
                </div>
                <div className={classes.contentDialogButton}>
                    <Button
                        classes={{ root: classes.buttonRootOutlined }}
                        onClick={onClose}
                    >
                        {t('selleronlinestore:Close')}
                    </Button>
                    <Button
                        classes={{ root: classes.buttonRoot }}
                        onClick={formik.handleSubmit}
                    >
                        {t('selleronlinestore:Continue')}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ModalForm;
