import makeStyles from '@material-ui/core/styles/makeStyles';
import { FONT_DEFAULT } from '@theme_typography';
import {
    DISABLED,
    PRIMARY, PRIMARY_SOFT, TEXT_GRAY, WHITE,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    primary: {
        borderRadius: 4,
        background: PRIMARY,
        color: '#FFFFFF',
        '&:hover': {
            background: PRIMARY,
        },
        padding: '5px 16px',
        fontWeight: 400,
        textTransform: 'capitalize',
        boxShadow: 'none',
    },
    outlined: {
        borderRadius: 4,
        background: 'transparent',
        border: `1px solid ${PRIMARY}`,
        padding: '5px 16px',
        color: PRIMARY,
        fontWeight: 400,
        boxShadow: 'none',
        '&:hover': {
            background: 'transparent',
        },
        textTransform: 'capitalize',
    },
    rounded: {
        borderRadius: 20,
        fontWeight: 400,
        textTransform: 'capitalize',
    },
    buttonText: {
        background: 'none',
        color: PRIMARY,
        fontWeight: 600,
        textTransform: 'unset',
        letterSpacing: 0,
        boxShadow: 'none',
        textDecoration: 'underline',
        '&:hover': {
            background: 'none',
            boxShadow: 'none',
            color: PRIMARY,
            textDecoration: 'underline',
        },
    },
    link: {
        background: 'none',
        color: '#536777',
        fontWeight: 400,
        textTransform: 'unset',
        letterSpacing: 0,
        boxShadow: 'none',
        '&:hover': {
            background: 'none',
            boxShadow: 'none',
            color: 'rgba(0, 0, 0, 0.87)',
        },
    },
    disabled: {
        borderColor: 'unset',
    },
    classicButton: {
        ...FONT_DEFAULT,
        display: 'flex',
        border: 0,
        backgroundColor: PRIMARY_SOFT,
        color: WHITE,
        padding: '6px 20px',
        alignItems: 'center',
        borderRadius: 4,
        cursor: 'pointer',
        '& img': {
            marginRight: 10,
        },
        '&.classicDisabled': {
            backgroundColor: `${DISABLED } !important`,
            color: `${TEXT_GRAY } !important`,
        },
        '&.classicDisabledBgTransparent': {
            backgroundColor: 'transparent !important',
            color: `${TEXT_GRAY } !important`,
        },
    },
}));

export default useStyles;
