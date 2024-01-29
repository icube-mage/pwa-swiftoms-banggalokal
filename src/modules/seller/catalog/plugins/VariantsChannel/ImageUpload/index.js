/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';

import Button from '@common_button';
import ImageIcon from '@material-ui/icons/Image';

import useStyles from '@sellermodules/catalog/plugins/Variants/ImageUpload/style';

const DropFile = (props) => {
    const {
        formatFile = '.jpg, .jpeg, .png, .gif', t, error = false, formik, limitSizeConfig,
    } = props;
    const [indexClick, setIndexClick] = React.useState(null);
    const name = (idx) => `variants[0].attribute_choosen[${idx}].image`;
    const classes = useStyles();

    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (e) => reject(e);
    });

    const onDropAccepted = async (files) => {
        let filebase64 = [];
        for (let ind = 0; ind < files?.length; ind += 1) {
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
        const { baseCode } = filebase64[0];
        formik.setFieldValue(name(indexClick), baseCode);
        setIndexClick(null);
    };
    const messageError = t('common:Please_check_and_make_sure_your_files_meet_the_requirements');
    const {
        getInputProps, open,
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
        multiple: false,
        getFilesFromEvent: async (event) => {
            const files = event.target.files || event.dataTransfer.files;
            const promises = [];
            for (let index = 0; index < files?.length; index += 1) {
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
            const { limit_size_image, product_image_min_width, product_image_min_height } = limitSizeConfig;
            // You can access width/height properties
            if (file.size > (limit_size_image || 3) * 1048576) {
                return {
                    code: 'big-size',
                    message: t('common:Image_size_must_be_less_than_size', { size: `${limit_size_image} Megabytes` }),
                };
            }
            if (file.width < product_image_min_width) {
                return {
                    code: 'small-width',
                    message: t('common:Image_width_must_be_greater_than_width', { width: `${product_image_min_width}px` }),
                };
            }
            if (file.height < product_image_min_height) {
                return {
                    code: 'small-height',
                    message: t('common:Image_height_must_be_greater_than_height', { height: `${product_image_min_height}px` }),
                };
            }
            return null;
        },
    });

    return (
        <div>
            <div>
                <input {...getInputProps()} />
            </div>
            <div className={classes.container}>
                {formik.values.variants?.[0]?.attribute_choosen?.map((type, idx) => (
                    <div
                        className={classes.imgGroup}
                        aria-hidden="true"
                        onClick={() => {
                            if (formik.values.sku) {
                                if (type.image) {
                                    open();
                                }
                                setIndexClick(idx);
                            }
                        }}
                        key={idx}
                    >
                        {type.image
                            ? (
                                <>
                                    <div className={classes.imgContainer}>
                                        <img
                                            key={type.position}
                                            className={classes.img}
                                            src={type.image}
                                            alt="media_img"
                                        />
                                    </div>
                                    <div className={classes.textFile} style={{ marginTop: 5 }}>
                                        {(type.inputValue || type.label)?.slice(0, 20)}
                                        {(type.inputValue || type.label)?.length > 20 && '...'}
                                    </div>
                                </>
                            )
                            : (
                                <Button
                                    className={clsx(classes.btn, error && 'error', !formik.values.sku && 'disabled')}
                                    type="button"
                                    onClick={open}
                                    fullWidth
                                    disabled={!formik.values.sku}
                                >
                                    <ImageIcon className={classes.icon} />
                                    <div className={classes.textFile}>
                                        {(type.inputValue || type.label)?.slice(0, 20)}
                                        {(type.inputValue || type.label)?.length > 20 && '...'}
                                    </div>
                                </Button>
                            )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DropFile;
