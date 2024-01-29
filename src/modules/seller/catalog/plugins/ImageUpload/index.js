/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
import React from 'react';
import clsx from 'clsx';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import Button from '@common_button';
import useStyles from '@sellermodules/catalog/plugins/ImageUpload/style';
import { breakPointsUp } from '@helper_theme';
import { useDropzone } from 'react-dropzone';
import {
    SortableContainer, SortableHandle, SortableElement, arrayMove,
} from 'react-sortable-hoc';
import classNames from 'classnames';
import TextInfo from '@common_textinfo';

const ImageIcon = () => (
    <svg id="Component_26_1" data-name="Component 26 – 1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <g id="Ellipse_266" data-name="Ellipse 266" fill="#fff" stroke="#839aad" strokeWidth="1.5">
            <circle cx="10" cy="10" r="10" stroke="none" />
            <circle cx="10" cy="10" r="9.25" fill="none" />
        </g>
        <path
            id="Path_3491"
            data-name="Path 3491"
            d="M3929.2-1516.216v8"
            transform="translate(-3919.199 1522.216)"
            fill="none"
            stroke="#839aad"
            strokeLinecap="round"
            strokeWidth="1.5"
        />
        <path
            id="Path_3492"
            data-name="Path 3492"
            d="M3929.2-1516.216v8"
            transform="translate(-1502.216 -3919.199) rotate(90)"
            fill="none"
            stroke="#839aad"
            strokeLinecap="round"
            strokeWidth="1.5"
        />
    </svg>
);

const DropFile = (props) => {
    const {
        t, name = '', formatFile = '.csv', error = false, helperText = '', getBase64, formik, limitSizeConfig, multiple = false,
    } = props;
    const [indexClick, setIndexClick] = React.useState(null);
    const [items, setItems] = React.useState(formik.values[name] || []);
    const isDesktop = breakPointsUp('sm');
    const classes = useStyles();
    const messageError = t('common:Please_check_and_make_sure_your_files_meet_the_requirements');
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
        getBase64(filebase64, indexClick);
        setIndexClick(null);
    };

    const { getInputProps, open } = useDropzone({
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

    const SortContainer = SortableContainer(({ children }) => (
        <div className={classNames(classes.container, 'image-upload-sortableContainer')}>{children}</div>
    ));

    const onSortEnd = ({ oldIndex, newIndex }) => {
        const newItems = arrayMove(items, oldIndex, newIndex);
        setItems(newItems);
        formik.setFieldValue(name, newItems);
    };

    const DragHandle = SortableHandle(({ style }) => (
        <span style={{ ...style }} className={classes.dragHandle} id="button-drag">
            <DragIndicatorIcon />
        </span>
    ));

    const SortableRow = SortableElement(({ row, rowIndex, isMain }) => (
        <div
            id="button-upload-image"
            className={classNames(classes.imgGroup, 'button-upload-image-imgGroup')}
            style={{ display: row.is_deleted ? 'none' : 'unset' }}
            aria-hidden="true"
            onClick={() => {
                open();
                setIndexClick(rowIndex);
            }}
            key={rowIndex}
        >
            <div className={classes.imgMainWrapper} style={{ visibility: isMain ? 'visible' : 'hidden' }}>
                {t('common:Main_Photo')}
                <div className={classes.imgMainInfo}>
                    <TextInfo textHelp={<span dangerouslySetInnerHTML={{ __html: t('common:main_photo_description') }} />} />
                </div>
            </div>

            <div className={classNames(classes.imgContainer, isMain ? classes.imgContainerMain : '', 'button-upload-image-imgContainer')}>
                <DragHandle />
                <img key={row.position} className={classes.img} src={row.id ? row.url : row.binary} alt="media_img" />
                <img
                    id="button-delete"
                    src="/assets/img/trash.svg"
                    alt="delete"
                    className={classes.trashIcon}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (row.id) {
                            formik.setFieldValue(`[${name}][${rowIndex}].is_deleted`, true);
                        } else {
                            const temp = formik.values[name];
                            temp.splice(rowIndex, 1);
                            formik.setFieldValue(name, temp);
                        }
                    }}
                />
            </div>
            <div className={classes.fileName} style={{ visibility: row.name ? 'visible' : 'hidden' }}>
                {row.name}
                <br />
                {row.size}
            </div>
        </div>
    ));

    React.useEffect(() => {
        setItems(formik.values[name] || []);
    }, [formik.values[name]]);

    const mainPhotoIndex = formik.values[name]?.findIndex((itm) => itm.is_deleted === false);

    // this images
    return (
        <div>
            <div>
                <input {...getInputProps()} />
            </div>
            <SortContainer
                onSortEnd={onSortEnd}
                useDragHandle
                lockAxis={isDesktop ? 'x' : 'y'}
                axis={isDesktop ? 'x' : 'y'}
                helperClass="SortableHelper"
            >
                {formik.values[name]?.map((image, idx) => (
                    <SortableRow index={idx} rowIndex={idx} key={idx} row={image} isMain={mainPhotoIndex === idx} />
                ))}
                {formik.values[name].filter((v) => !v.is_deleted)?.length < 5 && (
                    <div className={classNames(classes.imgGroup, 'button-upload-image-imgGroup')}>
                        <div className={classes.imgMainWrapper} style={{ visibility: 'hidden' }}>
                            {t('common:Main_Photo')}
                        </div>
                        <Button id="button-upload" className={clsx(classes.btn, error && 'error')} type="button" onClick={open} fullWidth>
                            <ImageIcon />
                            <div className={classNames(classes.textFile, 'image-upload-textFile')}>
                                {formik.values[name]?.length
                                    ? `${t('common:Photo')} ${formik.values[name].filter((v) => !v.is_deleted)?.length + 1}`
                                    : t('common:Main_Photo')}
                            </div>
                        </Button>
                        {error && <div className={classes.errorText}>{helperText}</div>}
                    </div>
                )}
            </SortContainer>
        </div>
    );
};

export default DropFile;
