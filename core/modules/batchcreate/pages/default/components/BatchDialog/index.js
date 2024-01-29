/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import * as React from 'react';
import clsx from 'clsx';
import { useTranslation } from '@i18n';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from '@modules/batchcreate/pages/default/components/BatchDialog/style';

import Button from '@common_button';

const BatchDialog = (props) => {
    const {
        open, handleClose, title, titleChild, formik, totalSku,
    } = props;
    const { t } = useTranslation(['createpickbybatch']);
    const classes = useStyles();

    const handleMin = () => {
        if (formik.values[`number_of_${titleChild.toLowerCase()}`] > 1) {
            formik.setFieldValue(`number_of_${titleChild.toLowerCase()}`, formik.values[`number_of_${titleChild.toLowerCase()}`] - 1);
        }
    };

    const handlePlus = () => {
        if (titleChild.toLowerCase() === 'sku' && formik.values[`number_of_${titleChild.toLowerCase()}`] < totalSku) {
            formik.setFieldValue(`number_of_${titleChild.toLowerCase()}`, formik.values[`number_of_${titleChild.toLowerCase()}`] + 1);
        }
        if (titleChild.toLowerCase() !== 'sku') {
            formik.setFieldValue(`number_of_${titleChild.toLowerCase()}`, formik.values[`number_of_${titleChild.toLowerCase()}`] + 1);
        }
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth classes={{ paper: classes.paper }}>
                <DialogTitle classes={{ root: classes.textTitle }}>
                    {t('createpickbybatch:Batch_by')}
                    {' '}
                    {title}
                    {(title === 'SKU') ? (
                        <p className={classes.textTitleChild}>
                            {t('createpickbybatch:Maximum_number_of_SKU_per_pick_list')}
                        </p>
                    ) : (
                        <p className={classes.textTitleChild}>
                            {t('createpickbybatch:How_many_picker_per_batch')}
                        </p>
                    )}
                </DialogTitle>
                <DialogContent classes={{ root: clsx(classes.content, classes.contentCounter) }}>
                    <div className={`${classes.counter} ${classes.counterBtn}`} onClick={handleMin}>
                        <img src="/assets/img/minus.svg" alt="min" />
                    </div>
                    <div className={`${classes.counter} ${classes.counterNumber}`}>{formik.values[`number_of_${titleChild.toLowerCase()}`]}</div>
                    <div className={`${classes.counter} ${classes.counterBtn}`} onClick={handlePlus}>
                        <img src="/assets/img/plus.svg" alt="plus" />
                    </div>
                </DialogContent>
                <DialogContent classes={{ root: classes.content }}>
                    <Button
                        variant="contained"
                        buttonType="primary-rounded"
                        onClick={() => {
                            formik.setFieldValue('type', titleChild.toLowerCase());
                            formik.handleSubmit();
                            handleClose();
                        }}
                    >
                        {t('createpickbybatch:Create_Pick_List')}
                    </Button>
                </DialogContent>
                <DialogContent classes={{ root: classes.content }}>
                    <button
                        type="button"
                        className={classes.textFooter}
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        {t('createpickbybatch:Cancel')}
                    </button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BatchDialog;
