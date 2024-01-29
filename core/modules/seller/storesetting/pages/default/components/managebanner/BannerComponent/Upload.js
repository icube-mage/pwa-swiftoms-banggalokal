/* eslint-disable no-nested-ternary */
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@common_textfield';
import { testHyperlink } from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent';
import DropFile from '@sellermodules/storesetting/pages/default/components/managebanner/BannerComponent/DropFile';
import {
    PRIMARY_DARK, GRAY_LIGHT, ERROR,
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
        height: 150,
        width: 300,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    icon: {
        height: 33,
        width: 'auto',
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
        t, player = false, fields, setFields, indexActive, item, mode,
    } = props;
    const classes = useStyles();

    const handleUpload = (file) => {
        const { baseCode } = file[0];
        const temp = [...fields];
        temp[indexActive].banner[0].binary = baseCode;
        setFields(temp);
    };

    const handleChange = (e) => {
        const val = e.target.value;
        const temp = [...fields];
        if (player) {
            temp[indexActive].banner[0].url = val;
        }
        temp[indexActive].banner[0].hyperlink = val;
        setFields(temp);
    };

    return (
        <div className={clsx(classes.contentItem, mode)}>
            <div className={classes.uploadContainer}>
                <DropFile
                    {...props}
                    getBase64={handleUpload}
                    components={(open) => (
                        item.banner[0].url || item.banner[0].binary
                            ? (
                                player ? (
                                    <iframe
                                        width="300"
                                        height="150"
                                        src={testHyperlink(item.banner[0].url) && item.banner[0].url}
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
                                        style={{ backgroundImage: `url(${item.banner[0].binary || item.banner[0].url})` }}
                                    />
                                )
                            )
                            : (
                                <div className={classes.imgContainer} onClick={player ? null : open} aria-hidden="true">
                                    <img
                                        className={classes.icon}
                                        src={(player ? '/assets/img/player-light.svg' : '/assets/img/img_palceholder-white.svg')}
                                        alt="img_palceholder-white"
                                    />
                                </div>
                            )
                    )}
                />
                <TextField
                    id="link"
                    name="link"
                    placeholder={player ? t('storesetting:Add_Video_Url') : t('storesetting:Add_hyperlink_optional')}
                    className={classes.textInput}
                    onChange={handleChange}
                    value={item.banner[0].hyperlink}
                />
                {item.banner[0].hyperlink && !testHyperlink(item.banner[0].hyperlink)
                && (
                    <span className={classes.error}>
                        {t('storesetting:Hyperlink_must_be_valid_URL')}
                    </span>
                )}
            </div>
        </div>
    );
};

export default UploadContent;
