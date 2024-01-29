/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DropFile from '@common_dropfile';
import clsx from 'clsx';
import useStyles from '@modules/orderqueue/pages/import/components/style';

const ProductListImport = (props) => {
    const {
        formik,
        urlDownload,
        handleDropFile,
        tab_status,
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push(`/order/${tab_status}`)}
                variant="contained"
                style={{ marginRight: 16 }}
            >
                <ChevronLeftIcon style={{
                    fontSize: 30,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
                />
            </Button>
            <h2 className={classes.titleTop}>{t('order:Bulk_Order_Reallocation')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <span className={clsx(classes.textAttach, classes.label)}>{t('order:Attach_File')}</span>
                    </div>
                    <div className={classes.grid}>
                        <div className={classes.formField}>
                            <DropFile
                                title={t('order:Attach_File')}
                                error={(
                                    (formik.errors.binary && formik.touched.binary)
                                )}
                                getBase64={handleDropFile}
                            />
                        </div>
                        <div className={classes.formField} style={{ textAlign: 'right' }}>
                            <span className={classes.label}><a href={urlDownload} className={classes.linkDownload}>{t('order:Download_the_Sample_CSV')}</a></span>
                        </div>
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('order:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default ProductListImport;
