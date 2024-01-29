/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/forbid-prop-types */
import { useDropzone } from 'react-dropzone';
import React from 'react';
import useStyles from '@modules/configurationshipment/pages/default/components/style';
import Button from '@common_button';
import clsx from 'clsx';

const InputFile = (props) => {
    const {
        name,
        formik,
        title = '',
        textButton = 'Choose File',
        comment,
        value,
        t,
    } = props;
    
    const classes = useStyles();
    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
    const onDropAccepted = async (files) => {
        let filebase64 = [];
        for (let ind = 0; ind < files.length; ind += 1) {
            // eslint-disable-next-line no-await-in-loop
            const baseCode = await toBase64(files[ind]);
            if (baseCode) {
                filebase64 = [
                    ...filebase64,
                    {
                        baseCode,
                        file: files[ind],
                    },
                ];
            }
        }
        formik.setFieldValue(`${name}.value`, filebase64[0].baseCode);
    };

    const {
        getRootProps, getInputProps, acceptedFiles, open,
    } = useDropzone({
        multiple: false,
        noClick: true,
        noKeyboard: true,
        onDropAccepted,
    });

    return (
        <div className={classes.formField} style={{ margin: '16px 0 12px 0' }}>
            <div className={classes.divLabel}>
                <span className={classes.label} style={{ marginTop: '-8px' }}>{title}</span>
            </div>
            <div className={classes.divField}>
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <Button className={classes.btn} type="button" onClick={open}>
                        {textButton}
                    </Button>
                    {acceptedFiles.length === 0 && <span className={classes.textNoFile}>{t('shipmentconfiguration:No_file_chosen')}</span>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '18px' }}>
                    {
                        (formik.values[name].value && acceptedFiles.length > 0) && (
                            <span className={clsx(classes.label, classes.comment)} style={{ marginTop: '0' }} key={acceptedFiles[0].path}>
                                {t('shipmentconfiguration:New_file')} {acceptedFiles[0].path}
                                &nbsp; | &nbsp;
                                <span 
                                    className='link-button'
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => formik.setFieldValue(`${name}.value`, null)}
                                >
                                    {t('shipmentconfiguration:Delete')}
                                </span>
                            </span>
                        )
                    }
                    {
                        (formik.values[name].value && acceptedFiles.length === 0 && value) && (
                            <span className={clsx(classes.label, classes.comment)} style={{ marginTop: '0' }}>
                                {t('shipmentconfiguration:Old_file')} {value}
                                &nbsp; | &nbsp;
                                <span 
                                    className='link-button'
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => formik.setFieldValue(`${name}.value`, null)}
                                >
                                    {t('shipmentconfiguration:Delete')}
                                </span>
                            </span>
                        )
                    }
                </div>
                {comment && (<span className={clsx(classes.label, classes.comment)} style={{ marginTop: '8px' }}>{comment}</span>)}
            </div>
        </div>
    );
};

export default InputFile;
