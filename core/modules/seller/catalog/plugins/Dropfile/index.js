/* eslint-disable react/forbid-prop-types */
import React from 'react';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';

import Grid from '@material-ui/core/Grid';

import Button from '@common_button';
import { breakPointsUp } from '@helper_theme';

import useStyles from '@sellermodules/catalog/plugins/Dropfile/style';

const DropFile = (props) => {
    const {
        title = '', formatFile = '.csv', getBase64, t, error = false, helperText = '', formik,
    } = props;
    const desktop = breakPointsUp('sm');
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
            {desktop ? ' - ' : <br />}
            {file.size}
            {' '}
            bytes
        </li>
    ));

    return (
        <Grid container spacing={3} className={classes.gridMobile}>
            <Grid item sm={7} className={classes.gridMobile}>
                <div className={classes.contentDropFile}>
                    {title}
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <Button className={clsx(classes.btn, error && 'error')} type="button" fullWidth>
                            <img className={classes.icon} src="/assets/img/file.svg" alt="" />
                            <span className={classes.textFile}>{files.length === 0 ? t('common:Drag_and_drop_your_files_here') : files[0]}</span>
                        </Button>
                        {error && <div className={classes.errorText}>{helperText}</div>}
                    </div>
                </div>
            </Grid>
            <Grid item sm={5} className={classes.gridMobile}>
                <Grid container spacing={3}>
                    <Grid item xs="auto">
                        <Button className={classes.btnFile} buttonType="outlined" onClick={open}>
                            {files.length === 0 ? t('sellerstock:Select_File') : t('sellerstock:Change_File')}
                        </Button>
                    </Grid>
                    {files.length
                        ? (
                            <Grid item xs="auto">
                                <Button className={clsx(classes.btnFile, 'primary')} buttonType="outlined" onClick={formik.handleSubmit}>
                                    {t('sellercatalog:Upload')}
                                </Button>
                            </Grid>
                        )
                        : null }
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DropFile;
