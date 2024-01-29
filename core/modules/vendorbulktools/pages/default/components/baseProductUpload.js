/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
import React from 'react';
import Button from '@common_button';
import DropFile from '@common_dropfile';
import clsx from 'clsx';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import useStyles from '@modules/vendorbulktools/pages/default/components/style';
import Link from 'next/link';
import { useTranslation } from '@i18n';

const ProductBundle = (props) => {
    const { t } = useTranslation('vendorbulktools');
    const {
        gqlUpload, urlDownload, handleSubmit, toolName, code, isNoTutorial = false,
    } = props;
    const classes = useStyles();
    const [uploader] = gqlUpload();

    const formik = useFormik({
        initialValues: {
            binary: '',
        },
        validationSchema: Yup.object().shape({
            binary: Yup.string().required(t('vendorbulktools:This_is_a_Required_field')),
        }),
        onSubmit: async (values) => {
            const variables = {
                binary: values.binary,
            };
            handleSubmit(variables, uploader, gqlUpload.name);
        },
    });

    const handleDropFile = (files) => {
        const fileName = files[0].file.name;
        const { baseCode } = files[0];

        formik.setFieldValue('filename', fileName);
        formik.setFieldValue('binary', baseCode);
    };

    return (
        <>
            <div className={classes.content}>
                <div className={classes.formField}>
                    <span className={classes.label}>
                        {!!urlDownload
                        && (
                            <a href={urlDownload} className={classes.linkDownload}>
                                {t('vendorbulktools:Download_the_Sample_CSV')}
                            </a>
                        )}
                        {!isNoTutorial && (
                            <>
                                <br />
                                <Link href={`/vendorportal/tutorialupload?code=${code}`}>
                                    <a target="_blank" className={classes.linkDownload}>
                                        {t('vendorbulktools:Tutorial')} {toolName ?? t('vendorbulktools:Upload')}
                                    </a>
                                </Link>
                            </>
                        )}
                    </span>
                </div>
                <div className={clsx(classes.formField, classes.textLeft)}>
                    <DropFile title={t('vendorbulktools:Please_select_the_file__')} error={formik.errors.binary && formik.touched.binary} getBase64={handleDropFile} />
                </div>
            </div>
            <div className={classes.formFieldButton}>
                <Button className={classes.btn} variant="contained" onClick={formik.handleSubmit}>
                    {t('vendorbulktools:Submit')}
                </Button>
            </div>
        </>
    );
};

export default ProductBundle;
