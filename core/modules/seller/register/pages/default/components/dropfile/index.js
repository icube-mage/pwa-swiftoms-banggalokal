/* eslint-disable react/forbid-prop-types */
import { useDropzone } from 'react-dropzone';
import React from 'react';
import useStyles from '@sellermodules/register/pages/default/components/dropfile/style';
import Button from '@common_button';
import clsx from 'clsx';

const DropFile = (props) => {
    const {
        title = '', formatFile = '.csv', getBase64, t, error = false, helperText = '',
    } = props;
    const classes = useStyles();
    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (e) => reject(e);
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
        getBase64(filebase64);
    };
    const messageError = t('registerseller:File_rejected_Accepted_format_file__valuesformat', { values: { format: formatFile } });
    const {
        getRootProps, getInputProps, acceptedFiles, open,
    } = useDropzone({
        noClick: true,
        noKeyboard: true,
        onDropAccepted,
        accept: formatFile,
        onDropRejected: () => window.toastMessage({
            open: true,
            text: messageError,
            variant: 'error',
        }),
        multiple: false,
    });
    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            <span className={classes.fileName}>
                {file.path}
            </span>
            {' '}
            -
            {' '}
            {file.size}
            {' '}
            bytes
        </li>
    ));

    return (
        <div className={classes.contentDropFile}>
            {title}
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <Button className={clsx(classes.btn, error && 'error')} type="button" onClick={open} fullWidth>
                    <img src="/assets/img/file.svg" alt="" />
                    <span className={classes.textFile}>{files.length === 0 ? t('common:Please_select_file') : files[0]}</span>
                </Button>
                {error && <div className={classes.errorText}>{helperText}</div>}
            </div>
        </div>
    );
};

export default DropFile;
