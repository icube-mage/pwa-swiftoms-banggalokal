import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, TABLE_GRAY, PRIMARY_DARK, GRAY_LIGHT, ERROR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        position: 'relative',
        '& .MuiDialog-paperFullWidth': {
            padding: 30,
            maxWidth: 540,
            width: '100%',
            margin: 10,
        },
    },
    title: {
        '& .MuiTypography-root': {
            color: PRIMARY_DARK,
            fontSize: '1.875rem',
            fontWeight: 'bold',
        },
        textAlign: 'center',
    },
    subtitle: {
        '& .MuiTypography-root': {
            color: PRIMARY,
            fontSize: '1.25rem',
            fontWeight: 'bold',
        },
        textAlign: 'center',
    },
    content: {
        marginTop: 15,
        backgroundColor: TABLE_GRAY,
        borderRadius: 9,
        padding: 20,
        color: PRIMARY_DARK,
        fontSize: 14,
        '&.MuiDialogContent-root': {
            overflowY: 'visible',
        },
    },
    actions: {
        '&.MuiDialogActions-root': {
            padding: 20,
            marginLeft: 20,
            marginRight: 20,
            paddingBottom: 10,
        },
    },
    errors: {
        '&.MuiDialogActions-root': {
            textAlign: 'center',
            color: ERROR,
            display: 'block',
        },
    },
    btn: {
        borderRadius: 6,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
        borderColor: PRIMARY,
        padding: '12px 30px',
        height: 42,
        width: '100%',
        fontSize: 15,
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
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
    closeButton: {
        position: 'absolute',
        right: 5,
        top: 5,
        color: PRIMARY_DARK,
    },
    bankImg: {
        width: 55,
        height: 20,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundOrigin: 'content-box',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        '& .bank-place': {
            width: 24,
            height: 24,
        },
        marginRight: 10,
        border: `1px solid ${TABLE_GRAY}`,
        [theme.breakpoints.down('xs')]: {
            marginRight: 0,
            marginBottom: 5,
        },
    },
}));

export default useStyles;
