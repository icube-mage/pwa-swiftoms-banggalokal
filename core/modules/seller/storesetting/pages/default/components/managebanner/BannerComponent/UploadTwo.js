import clsx from 'clsx';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { makeStyles } from '@material-ui/core/styles';

import DropFile from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/DropFile';
import TextField from '@common_textfield';

import { testHyperlink } from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent';
import {
    PRIMARY, PRIMARY_DARK, GRAY_LIGHT, BOX_SHADOW, ERROR,
} from '@theme_color';

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
        height: 110,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 220,
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
        width: 220,
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
        '& .MuiInputBase-input:-webkit-autofill': {
            height: 15,
        },
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
        if (index !== item.banner.length - 1) {
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
        temp[indexActive].banner[i].hyperlink = val;
        setFields(temp);
    };

    return (
        <>
            {item.banner.map((obj, i) => (
                <div className={clsx(classes.contentItem, mode)} key={i}>
                    <div className={classes.uploadContainer}>
                        <DropFile
                            {...props}
                            getBase64={(file) => handleUpload(file, i)}
                            components={(open) => (
                                obj.binary || obj.url
                                    ? (
                                        <div
                                            className={classes.imgContainer}
                                            onClick={open}
                                            aria-hidden="true"
                                            style={{ backgroundImage: `url(${obj.binary || obj.url})` }}
                                        />
                                    )
                                    : (
                                        <div className={classes.imgContainer} onClick={open} aria-hidden="true">
                                            <img
                                                className={classes.icon}
                                                src="/assets/img/img_palceholder-white.svg"
                                                alt="img_palceholder-white"
                                            />
                                        </div>
                                    )
                            )}
                        />
                        <TextField
                            id="link"
                            name="link"
                            placeholder={t('storesetting:Add_hyperlink_optional')}
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
                    </div>
                </div>
            ))}
        </>
    );
};

export default UploadContent;
