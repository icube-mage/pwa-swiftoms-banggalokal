/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DropFile from '@common_dropfile';
import clsx from 'clsx';
import useStyles from '@modules/productprice/pages/import/components/style';

const ProductListImport = (props) => {
    const {
        formik,
        urlDownload,
        handleDropFile,
        t,
    } = props;
    const classes = useStyles();
    const router = useRouter();

    return (
        <>
            <Button
                className={classes.btnBack}
                onClick={() => router.push('/marketplace/productprice')}
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
            <h2 className={classes.titleTop}>{t('productprice:Marketplace_Product_Price_Import')}</h2>
            <Paper className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <span className={clsx(classes.textAttach, classes.label)}>{`${t('productprice:Attach_File')} `}</span>
                    </div>
                    <div className={classes.grid}>
                        <div className={classes.formField}>
                            <DropFile
                                title={`${t('productprice:Please_select_the_file')} : `}
                                error={(
                                    (formik.errors.binary && formik.touched.binary)
                                )}
                                getBase64={handleDropFile}
                            />
                        </div>
                        <div className={classes.formField} style={{ textAlign: 'right' }}>
                            <span className={classes.label}>
                                <a href={urlDownload} className={classes.linkDownload}>{t('productprice:Download_the_Sample_CSV')}</a>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('productprice:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default ProductListImport;
