/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import {
    SortableContainer, SortableHandle, SortableElement, arrayMove,
} from 'react-sortable-hoc';

import ImageIcon from '@material-ui/icons/Image';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import Button from '@common_button';

import { breakPointsUp } from '@helper_theme';
import useStyles from '@sellermodules/catalog/plugins/ImageUpload/style';

const DropFile = (props) => {
    const {
        formatFile = '.csv', getBase64, t, error = false, helperText = '', formik, name = '',
    } = props;
    const [indexClick, setIndexClick] = React.useState(null);
    const [items, setItems] = React.useState(formik.values[name] || []);
    const isDesktop = breakPointsUp('sm');

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
        getBase64(filebase64, indexClick);
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

    const SortContainer = SortableContainer(({ children }) => (
        <div className={classes.container}>
            {children}
        </div>
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

    const SortableRow = SortableElement(({ row, rowIndex }) => (
        <div
            id="button-upload-image"
            className={classes.imgGroup}
            style={{ display: row.is_deleted ? 'none' : 'unset' }}
            aria-hidden="true"
            onClick={() => { open(); setIndexClick(rowIndex); }}
            key={rowIndex}
        >
            <div className={classes.imgContainer}>
                <DragHandle />
                <img
                    key={row.position}
                    className={classes.img}
                    src={row.id ? row.url : row.binary}
                    alt="media_img"
                />
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
            {!!row.name
                && (
                    <div className={classes.fileName}>
                        {row.name}
                        <br />
                        {row.size}
                    </div>
                )}
            {/* <div className={classes.typeContainer}>
                {row.types?.map((type, idxIm) => (
                    <div key={idxIm} className={classes.labelType}>{type?.split('_').join(' ')}</div>
                ))}
            </div> */}
        </div>
    ));

    React.useEffect(() => {
        setItems(formik.values[name] || []);
    }, [formik.values[name]]);

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
                    <SortableRow
                        index={idx}
                        rowIndex={idx}
                        key={idx}
                        row={image}
                    />
                ))}
                {formik.values[name].filter((v) => !v.is_deleted)?.length < 5
                    && (
                        <div className={classes.imgGroup}>
                            <Button id="button-upload" className={clsx(classes.btn, error && 'error')} type="button" onClick={open} fullWidth>
                                <ImageIcon className={classes.icon} />
                                <div className={classes.textFile}>
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
