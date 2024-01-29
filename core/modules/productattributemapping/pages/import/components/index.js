/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React from 'react';
import Button from '@common_button';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DropFile from '@common_dropfile';
import clsx from 'clsx';
import useStyles from '@modules/productattributemapping/pages/import/components/style';

const ProductMappingImport = (props) => {
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
                onClick={() => router.push('/marketplace/productattributemapping')}
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
            <h2 className={classes.titleTop}>{t('productattributemapping:Import_Mapping')}</h2>
            <Paper className={classes.container}>
                <span className={clsx(classes.textAttach, classes.label)}>{`${t('productattributemapping:Attach_File')} `}</span>
                <div className={classes.content}>
                    <div className={classes.formField}>
                        <span className={classes.label}>
                            <a href={urlDownload} className={classes.linkDownload}>
                                {t('productattributemapping:Download_the_Sample_CSV')}
                            </a>
                        </span>
                    </div>
                    <div className={clsx(classes.formField, classes.textLeft)}>
                        <DropFile
                            title={`${t('productattributemapping:Please_select_the_file')} : `}
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
                        {t('productattributemapping:Submit')}
                    </Button>
                </div>
            </Paper>
        </>
    );
};

export default ProductMappingImport;
