/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DropFile from '@common_dropfile';
import clsx from 'clsx';
import useStyles from '@modules/productcategory/pages/import/components/style';

const ProductCategoryImport = (props) => {
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
                onClick={() => router.push('/marketplace/productcategory')}
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
            <h2 className={classes.titleTop}>{t('productcategory:Update_Categories_Status')}</h2>
            <Paper className={classes.container}>
                <span className={clsx(classes.textAttach, classes.label)}>{`${t('productcategory:Attach_File')} `}</span>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <span className={classes.label}>
                            <a href={urlDownload} className={classes.linkDownload}>{t('productcategory:Download_the_Sample_CSV')}</a>
                        </span>
                    </div>
                    <div className={classes.formField}>
                        <DropFile
                            title={`${t('productcategory:Please_select_the_file')} : `}
                            error={(
                                (formik.errors.binary && formik.touched.binary)
                            )}
                            getBase64={handleDropFile}
                        />
                    </div>
                </div>
                <div className={classes.formFieldButton}>
                    <Button
                        className={classes.btn}
                        onClick={formik.handleSubmit}
                        variant="contained"
                    >
                        {t('productcategory:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default ProductCategoryImport;
