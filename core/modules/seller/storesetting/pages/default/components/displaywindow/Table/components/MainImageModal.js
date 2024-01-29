import { useState } from 'react';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@common_button';
import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, PRIMARY, TEXT_COLOR, GRAY_LIGHT,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        textAlign: 'center',
        borderRadius: 8,
        position: 'relative',
        '& .MuiDialog-paperScrollPaper': {
            '&::-webkit-overflow-scrolling': 'touch',
            '&::-webkit-scrollbar': {
                height: '.5em',
                width: '.5em',
            },
            '&::-webkit-scrollbar-track': {
                '-webkit-box-shadow': 'inset 0 0 2px rgba(0,0,0,0.00)',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: TEXT_COLOR,
                borderRadius: 5,
            },
        },
    },
    helper: {
        fontSize: 13,
        color: TEXT_COLOR,
    },
    colored: {
        color: PRIMARY,
    },
    title: {
        '& .MuiTypography-root': {
            color: PRIMARY_DARK,
            fontSize: 20,
            fontWeight: 600,
        },
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        color: PRIMARY_DARK,
    },
    subtitle: {
        color: PRIMARY_DARK,
        fontSize: 14,
        fontWeight: 600,
    },
    text: {
        '&.MuiDialogContentText-root': {
            color: PRIMARY_DARK,
            fontSize: 14,
            padding: '0 10em',
            [theme.breakpoints.down('md')]: {
                padding: '0 5em',
            },
            [theme.breakpoints.down('sm')]: {
                padding: '0 2em',
            },
            [theme.breakpoints.down('sm')]: {
                padding: '0',
            },
        },
    },
    btnUpload: {
        fontSize: 12,
        borderRadius: 6,
        backgroundColor: 'transparent',
        textTransform: 'none',
        color: PRIMARY_DARK,
        height: 120,
        boxShadow: 'none',
        border: `1px solid ${GRAY_LIGHT}`,
        borderStyle: 'dashed',
        '&:hover': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
        },
        [theme.breakpoints.down('xs')]: {
            '&.MuiButton-label': {
                fontSize: 12,
            },
            margin: '5px 0px',
        },
        '& .MuiButton-label': {
            display: 'block',
            justifyContent: 'center',
        },
    },
    icon: {
        width: 40,
        height: 'auto',
    },
    contentUpload: {
        [theme.breakpoints.down('xs')]: {
            '&.MuiDialogContent-root': {
                padding: '8px 15px',
            },
        },
        '&.MuiDialogContent-root': {
            overflowY: 'visible',
        },
    },
    contentText: {
        '&.MuiDialogContent-root': {
            overflowY: 'visible',
        },
    },
    imgGroup: {
        margin: 10,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
    },
    imgContainer: {
        position: 'relative',
        border: `1px solid ${GRAY_LIGHT}`,
        borderStyle: 'dashed',
        padding: 0,
        width: '100%',
        height: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    img: {
        maxHeight: 110,
        width: 'auto',
        height: 'auto',
        display: 'block',
    },
    btnContainer: {
        '&.MuiDialogActions-root': {
            padding: 20,
        },
    },
    btn: {
        borderRadius: 6,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        borderColor: PRIMARY,
        padding: '12px 15px',
        height: 42,
        fontSize: 15,
        width: '100%',
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '&.white': {
            background: 'transparent',
            borderColor: PRIMARY,
            color: PRIMARY,
            '&:hover': {
                backgroundColor: 'transparent',
                boxShadow: 'none',
                borderColor: PRIMARY_DARK,
                color: PRIMARY_DARK,
            },
        },
        '&.disabled': {
            background: GRAY_LIGHT,
            color: 'white',
            borderColor: GRAY_LIGHT,
            '&.MuiButton-contained:hover.Mui-disabled': {
                background: GRAY_LIGHT,
                color: 'white',
                borderColor: GRAY_LIGHT,
            },
            '&.MuiButtonBase-root.Mui-disabled': {
                pointerEvents: 'unset',
                cursor: 'not-allowed',
            },
        },
    },
}));

const MainImageDialog = (props) => {
    const {
        open: openModal = false,
        t,
        handleUpload,
        itemSelected,
        setItem,
    } = props;
    const classes = useStyles();
    const [imageUpload, setImageUpload] = useState('');

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
        setImageUpload(filebase64[0].baseCode);
    };
    const {
        getRootProps, getInputProps, open,
    } = useDropzone({
        noClick: true,
        noKeyboard: true,
        onDropAccepted,
        accept: '.jpg, .jpeg, .png',
        multiple: false,
        onDropRejected: (e) => window.toastMessage({
            open: true,
            text: e?.[0]?.errors?.[0]?.message || t('storesetting:Incompatible_file_format'),
            variant: 'error',
        }),
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
            if (file.size > 2000000) {
                return {
                    code: 'small-width',
                    message: t('common:Image_size_must_be_less_than_size', { size: '2MB' }),
                };
            }
            if (file.width < 500) {
                return {
                    code: 'small-width',
                    message: t('common:Image_width_must_be_greater_than_width', { width: '500px' }),
                };
            }
            if (file.height < 500) {
                return {
                    code: 'small-height',
                    message: t('common:Image_height_must_be_greater_than_height', { height: '500px' }),
                };
            }
            return null;
        },
    });

    const onClose = () => {
        setImageUpload('');
        setItem({});
    };

    const isDisabled = !imageUpload && !itemSelected.image;

    return (
        <Dialog
            open={openModal}
            onClose={onClose}
            className={classes.container}
            maxWidth="sm"
        >
            <DialogTitle className={classes.title}>
                <IconButton className={classes.closeButton} onClick={onClose}>
                    <CloseIcon className={classes.closeIcon} />
                </IconButton>
            </DialogTitle>
            <DialogTitle className={classes.title}>{t('storesetting:Upload_Image')}</DialogTitle>
            <DialogContentText className={classes.subtitle}>{t('storesetting:Choose_an_image_with_good_quality')}</DialogContentText>
            <DialogContent className={classes.contentUpload}>
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <div
                        className={classes.imgGroup}
                        aria-hidden="true"
                        onClick={open}
                    >
                        <div className={classes.imgContainer}>
                            <img
                                className={classes.img}
                                src={imageUpload || itemSelected.image}
                                alt="media_img"
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
            <DialogContent className={classes.contentText}>
                <DialogContentText className={classes.text}>
                    <div className={classes.helper}>
                        {t('storesetting:Minimum_photo_size')}
                        {' '}
                        <span className={classes.colored}>500 x 500px</span>
                        <br />
                        {t('storesetting:with_format')}
                        {' '}
                        <span className={classes.colored}>JPG, JPEG,</span>
                        {' '}
                        {t('storesetting:and')}
                        {' '}
                        <span className={classes.colored}>PNG.</span>
                        <br />
                        {t('storesetting:File_size')}
                        {' '}
                        <span className={classes.colored}>{`${t('storesetting:Maximum')} 2,000,000 bytes `}</span>
                        (2 Megabytes).
                    </div>
                </DialogContentText>
            </DialogContent>
            <DialogActions className={classes.btnContainer}>
                <Button className={clsx(classes.btn, 'white')} onClick={onClose} buttonType="outlined" color="primary">
                    {t('storesetting:Cancel')}
                </Button>
                <Button
                    className={clsx(classes.btn, isDisabled && 'disabled')}
                    disabled={isDisabled}
                    onClick={() => (isDisabled ? null : handleUpload(itemSelected, imageUpload, setItem, () => setImageUpload()))}
                    color="primary"
                >
                    {t('storesetting:Submit')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MainImageDialog;
