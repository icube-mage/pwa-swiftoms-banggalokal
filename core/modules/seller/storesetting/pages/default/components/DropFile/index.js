/* eslint-disable react/forbid-prop-types */
import { useDropzone } from 'react-dropzone';
import React from 'react';
import Button from '@common_button';
import useStyles from '@sellermodules/storesetting/pages/default/components/DropFile/style';

const DropFile = (props) => {
    const {
        formatFile = '.jpg, .jpeg, .png', getBase64, t,
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
    const messageError = t('common:Please_check_and_make_sure_your_files_meet_the_requirements');
    const {
        getRootProps, getInputProps, open,
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
        maxSize: 10485760,
        multiple: false,
        getFilesFromEvent: async (event) => {
            const files = event.target.files || event.dataTransfer.files;
            const promises = [];
            for (let index = 0; index < files.length; index += 1) {
                const file = files[index];
                const promise = new Promise((resolve) => {
                    const image = new Image();
                    let url = '';
                    image.onload = () => {
                        file.width = image.width;
                        file.height = image.height;
                        resolve(file);
                    };
                    url = URL.createObjectURL(file);
                    image.src = url;
                });
                promises.push(promise);
            }
            // eslint-disable-next-line no-return-await
            return await Promise.all(promises);
        },
        validator: (file) => {
            // You can access width/height properties
            if (file.width < 500) {
                return {
                    code: 'small-width',
                    message: `Image width must be greater than ${500}px`,
                };
            }
            if (file.height < 500) {
                return {
                    code: 'small-height',
                    message: `Image height must be greater than ${500}px`,
                };
            }
            return null;
        },
    });

    return (
        <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <Button
                variant="contained"
                className={classes.btn}
                onClick={open}
            >
                <span className={classes.btnText}>
                    {t('registerseller:Select_Photo')}
                </span>
            </Button>
        </div>
    );
};

export default DropFile;
