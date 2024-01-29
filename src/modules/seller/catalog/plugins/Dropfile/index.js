/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-danger */
import React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Button from '@common_button';
import useStyles from '@sellermodules/catalog/plugins/Dropfile/style';
import PublishIcon from '@material-ui/icons/Publish';
import EditIcon from '@material-ui/icons/Edit';
import { useDropzone } from 'react-dropzone';
import { breakPointsUp } from '@helper_theme';

const DropFile = (props) => {
    const {
        title = '', formatFile = '.xlsx', getBase64, t, error = false, helperText = '', formik,
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
        <div key={file.path}>
            <div className={classes.fileName}>
                {file.path}
            </div>
            {desktop ? ' - ' : <br />}
            {file.size}
            {' '}
            bytes
        </div>
    ));

    return (
        <Grid container spacing={3} className={classes.gridMobile}>
            <Grid item sm={12} className={classes.gridMobile}>
                <div className={classes.contentDropFile}>
                    {title}
                    <div {...getRootProps({ className: 'dropzone' })}>
                        <input {...getInputProps()} />
                        <Button className={clsx(classes.btn, error && 'error')} type="button" fullWidth onClick={open}>
                            <img className={classes.icon} src="/assets/img/file.svg" alt="" />
                            {
                                files.length < 1 && (
                                    <div
                                        className={classes.textFile}
                                        dangerouslySetInnerHTML={
                                            { __html: t('common:Drag_and_drop_your_files_here', { interpolation: { escapeValue: false } }) }
                                        }
                                    />
                                )
                            }
                            {
                                files.length > 0 && (
                                    <div className={classes.textFile}>
                                        {files[0]}
                                    </div>
                                )
                            }

                        </Button>
                        {error && <div className={classes.errorText}>{helperText}</div>}
                    </div>
                </div>
            </Grid>
            <Grid item sm={12} className={classes.gridMobile}>
                <Grid container spacing={12}>
                    <Grid className={classes.btnFileContainer} item xs="auto">
                        <Button className={classes.btnFile} buttonType="outlined" onClick={open}>
                            { files.length < 1 ? <PublishIcon className={classes.btnIcon} /> : <EditIcon className={classes.btnIcon} />}
                            &nbsp;
                            { files.length < 1 ? t('sellerstock:Select_File') : t('sellerstock:Change_File') }
                        </Button>
                    </Grid>
                    {
                        files?.length > 0 && (
                            <Grid className={classes.btnFileContainer2} item xs="auto" ml={2}>
                                <Button className={clsx(classes.btnFile, 'primary')} buttonType="outlined" onClick={formik.handleSubmit}>
                                    <PublishIcon className={classes.btnIcon} />
                                    {' '}
                                    {t('sellercatalog:Upload')}
                                </Button>
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DropFile;
