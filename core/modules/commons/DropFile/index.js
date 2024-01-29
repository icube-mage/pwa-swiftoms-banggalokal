/* eslint-disable react/forbid-prop-types */
import { useDropzone } from 'react-dropzone';
import clsx from 'clsx';
import React from 'react';
import useStyles from '@common_dropfile/style';
import Button from '@common_button';
import { useTranslation } from '@i18n';

const DropFile = (props) => {
    const { t } = useTranslation('common');
    const {
        title = '', textButton = t('common:Choose_File'), formatFile = '.csv', getBase64, showFiles = true, multiple = false,
        minSize, maxSize, minWidth, maxWidth, minHeight, maxHeight,
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
        getBase64(filebase64);
    };
    const messageError = t('common:File_uploaded_is_rejected_Accepted_files_are__extension', { extension: formatFile });
    const {
        getRootProps, getInputProps, acceptedFiles, open,
    } = useDropzone({
        noClick: true,
        noKeyboard: true,
        onDropAccepted,
        accept: formatFile,
        onDropRejected: (e) => window.toastMessage({
            open: true,
            text: e?.[0]?.errors?.[0]?.message || messageError,
            variant: 'error',
        }),
        multiple,
        maxSize,
        validator: (file) => {
            // You can access width/height properties
            if (maxSize && file.size > maxSize) {
                return {
                    code: 'small-width',
                    message: t('common:Image_size_must_be_less_than_size', { size: `${maxSize} KB` }),
                };
            }
            if (minSize && file.size > minSize) {
                return {
                    code: 'big-width',
                    message: `Image size must be bigger than ${minSize}`,
                };
            }

            // width
            if (minWidth && file.width < minWidth) {
                return {
                    code: 'small-width',
                    message: `Image width must be greater than ${minWidth}px`,
                };
            }
            if (maxWidth && file.width > maxWidth) {
                return {
                    code: 'big-width',
                    message: `Image width must be less than ${maxWidth}px`,
                };
            }

            // height
            if (minHeight && file.height < minHeight) {
                return {
                    code: 'small-height',
                    message: `Image height must be greater than ${minHeight}px`,
                };
            }
            if (maxHeight && file.height < maxHeight) {
                return {
                    code: 'small-height',
                    message: `Image height must be greater than ${maxHeight}px`,
                };
            }
            return null;
        },
    });

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path}
            {' '}
            -
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
                <Button className={clsx(classes.btn, !showFiles && 'no-margin')} type="button" onClick={open}>
                    {textButton}
                </Button>
                {files.length === 0 && showFiles && <span className={classes.textNoFile}>{t('common:No_file_chosen')}</span>}
            </div>
            {showFiles
                && (
                    <aside>
                        <ul>{multiple ? files : files[0]}</ul>
                    </aside>
                )}
        </div>
    );
};

export default DropFile;
