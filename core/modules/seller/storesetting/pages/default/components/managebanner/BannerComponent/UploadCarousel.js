/* eslint-disable no-nested-ternary */
import clsx from 'clsx';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import TextField from '@common_textfield';
import Button from '@common_button';

import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, GRAY_LIGHT, BOX_SHADOW, ERROR,
} from '@theme_color';
import { testHyperlink } from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent';
import DropFile from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/DropFile';

const useStyles = makeStyles(() => ({
    contentItem: {
        display: 'flex',
        padding: 10,
        border: `1px solid ${GRAY_LIGHT}`,
        marginTop: 10,
        gap: 10,
        borderRadius: 4,
    },
    uploadContainer: {
        width: '100%',
    },
    imgContainer: {
        border: `1px solid ${GRAY_LIGHT}`,
        cursor: 'pointer',
        backgroundColor: GRAY_LIGHT,
        height: 130,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 260,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    icon: {
        height: 33,
        width: 'auto',
    },
    editContainer: {
        border: `1px solid ${GRAY_LIGHT}`,
        backgroundColor: 'white',
        borderRadius: 4,
        height: 'fit-content',
        right: -75,
        top: 0,
    },
    iconEdit: {
        cursor: 'pointer',
        padding: '0px 5px',
        display: 'flex',
        color: PRIMARY_DARK,
        '&:hover': {
            color: PRIMARY,
            transition: 'all .2s',
        },
        '& .icon': {
            width: 15,
        },
        '&.border': {
            borderBottom: `2px solid ${BOX_SHADOW}`,
        },
    },
    textInput: {
        width: '100%',
        marginTop: 5,
        borderRadius: 4,
        border: `1px solid ${GRAY_LIGHT}`,
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            height: 30,
            backgroundColor: 'white',
            borderRadius: 6,
            padding: '5px 10px',
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
    },
    bottomContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
    },
    btnContainer: {
        marginTop: 10,
        display: 'flex',
        gap: 10,
    },
    btn: {
        boxShadow: 'none',
        background: PRIMARY,
        borderRadius: 6,
        padding: '8px 12px',
        height: 32,
        '&:hover': {
            boxShadow: 'none',
            background: PRIMARY_DARK,
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
    limitText: {
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        fontSize: 14,
    },
    error: {
        fontSize: '.75rem',
        color: ERROR,
    },
}));

const UploadContent = (props) => {
    const {
        t, fields, setFields, indexActive, item, mode,
    } = props;
    const classes = useStyles();

    const arraymove = (fromIndex, toIndex) => {
        const tempFields = [...fields];
        const temp = tempFields[indexActive].banner;
        const element = temp[fromIndex];
        temp.splice(fromIndex, 1);
        temp.splice(toIndex, 0, element);
        setFields(tempFields);
    };

    const handleUp = (index) => {
        if (index) {
            arraymove(index, index - 1);
        }
    };

    const handleDown = (index) => {
        if (index !== fields[indexActive].banner.length - 1) {
            arraymove(index, index + 1);
        }
    };

    const handleUpload = (file, i) => {
        const { baseCode } = file[0];
        const temp = [...fields];
        temp[indexActive].banner[i].binary = baseCode;
        setFields(temp);
    };

    const handleChange = (e, i) => {
        const val = e.target.value;
        const temp = [...fields];
        if (temp[indexActive].banner[i].type === 'video') {
            temp[indexActive].banner[i].url = val;
        }
        temp[indexActive].banner[i].hyperlink = val;
        setFields(temp);
    };

    const handleDelete = (i) => {
        const temp = [...fields];
        temp[indexActive].banner.splice(i, 1);
        setFields(temp);
    };

    const handleAdd = (type) => {
        const tempFields = [...fields];
        const temp = tempFields[indexActive].banner;
        if (type === 'video') {
            temp.push({
                url: '', binary: '', type: 'video', hyperlink: '',
            });
        } else {
            temp.push({
                url: '', binary: '', type: 'image', hyperlink: '',
            });
        }
        setFields(tempFields);
    };

    return (
        <>
            {item.banner?.map((obj, i) => (
                <div className={clsx(classes.contentItem, mode)} key={i}>
                    <div className={classes.uploadContainer}>
                        <DropFile
                            {...props}
                            getBase64={(file) => handleUpload(file, i)}
                            components={(open) => (
                                obj.url || obj.binary
                                    ? (obj.type === 'video'
                                        ? (
                                            <iframe
                                                width="100%"
                                                height="200"
                                                src={testHyperlink(obj.url) && obj.url}
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                                title="Embedded youtube"
                                                className={classes.imgContainer}
                                            />
                                        ) : (
                                            <div
                                                className={classes.imgContainer}
                                                onClick={open}
                                                aria-hidden="true"
                                                style={{ backgroundImage: `url(${obj.binary || obj.url})` }}
                                            />
                                        )

                                    )
                                    : (
                                        <div className={classes.imgContainer} onClick={obj.type === 'video' ? null : open} aria-hidden="true">
                                            <img
                                                className={classes.icon}
                                                src={obj.type === 'video' ? '/assets/img/player-light.svg' : '/assets/img/img_palceholder-white.svg'}
                                                alt="img_palceholder-white"
                                            />
                                        </div>
                                    )
                            )}
                        />
                        <TextField
                            id="link"
                            name="link"
                            placeholder={obj.type === 'video' ? t('storesetting:Add_Video_Url') : t('storesetting:Add_hyperlink_optional')}
                            className={classes.textInput}
                            onChange={(e) => handleChange(e, i)}
                            value={obj.hyperlink}
                        />
                        {obj.hyperlink && !testHyperlink(obj.hyperlink)
                            && (
                                <span className={classes.error}>
                                    {t('storesetting:Hyperlink_must_be_valid_URL')}
                                </span>
                            )}
                    </div>
                    <div className={classes.editContainer}>
                        <div
                            aria-hidden="true"
                            className={classes.iconEdit}
                            onClick={() => handleUp(i)}
                        >
                            <ArrowUpwardIcon className="icon" />
                        </div>
                        <div
                            aria-hidden="true"
                            className={clsx(classes.iconEdit, 'border')}
                            onClick={() => handleDown(i)}
                        >
                            <ArrowDownwardIcon className="icon" />
                        </div>
                        <div
                            aria-hidden="true"
                            className={classes.iconEdit}
                            onClick={() => handleDelete(i)}
                        >
                            <DeleteOutlineIcon className="icon" />
                        </div>
                    </div>
                </div>
            ))}
            <div className={classes.bottomContainer}>
                <div className={classes.btnContainer}>
                    <Button
                        variant="contained"
                        className={clsx(classes.btn, item.banner.length === 3 && 'disabled')}
                        onClick={() => handleAdd()}
                        disabled={item.banner.length === 3}
                    >
                        {t('storesetting:Add_Image')}
                    </Button>
                    <Button
                        variant="contained"
                        className={clsx(classes.btn, item.banner.length === 3 && 'disabled')}
                        onClick={() => handleAdd('video')}
                        disabled={item.banner.length === 3}
                    >
                        {t('storesetting:Add_Video')}
                    </Button>
                </div>
                <div className={classes.limitText}>{`${item.banner.length} / 3`}</div>
            </div>
        </>
    );
};

export default UploadContent;
