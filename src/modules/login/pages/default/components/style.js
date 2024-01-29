import { makeStyles } from '@material-ui/core/styles';
import {
    TABLE_GRAY, PRIMARY, PRIMARY_DARK, GREEN, GREEN_HIGHLIGHT, WHITE, BLACK, PURPLE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    loginContainer: {
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        height: '100%',
        backgroundColor: TABLE_GRAY,
        minHeight: 850,
    },
    titleContainer: {
        marginTop: 60,
    },
    textTitle: {
        fontSize: 30,
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
            marginTop: 78,
        },
    },
    textTitle2: {
        fontSize: 13,
        fontWeight: 400,
        marginTop: 10,
    },
    textInput: {
        width: '100%',
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            backgroundColor: 'white',
            borderRadius: 6,
            padding: '5px 10px',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 15,
            opacity: 1,
        },
    },
    formField: {
        padding: 0,
        paddingBottom: 25,
        position: 'relative',
    },
    headerLogin: {
        [theme.breakpoints.down('xs')]: {
            margin: '20px 20px 0 20px',
        },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containLeft: {
        width: '48%',
        float: 'left',
        marginTop: 26,
        marginLeft: 21,
        [theme.breakpoints.down('xs')]: {
            marginTop: 10,
            width: '100%',
            marginLeft: 0,
        },
    },
    containRight: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
        width: '49%',
        float: 'right',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    rightImg: {
        width: '100%',
        objectFit: 'cover',
        [theme.breakpoints.up('sm')]: {
            height: '100%',
        },
    },
    loginContentContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: -100,
    },
    loginContent: {
        marginTop: '15vmin',
        maxWidth: '40%',
        [theme.breakpoints.down('md')]: {
            maxWidth: '55%',
        },
        [theme.breakpoints.down('sm')]: {
            maxWidth: 'unset',
            marginLeft: 20,
            marginRight: 20,
        },
        marginBottom: 30,
        '& .center-xs': {
            [theme.breakpoints.down('sm')]: {
                marginLeft: 0,
                marginRight: 0,
            },
        },
    },
    btnLogin: {
        background: PRIMARY,
        borderRadius: 7,
        padding: 6,
        width: '100%',
        height: 52,
        '&:hover': {
            background: PRIMARY_DARK,
        },
    },
    btnLoginSocial: {
        background: WHITE,
        borderRadius: 50,
        padding: 6,
        width: '100%',
        height: 52,
        color: BLACK,
        '&:hover': {
            background: WHITE,
        },
        '&.btn-mobile': {
            width: 'auto',
            height: 64,
            '& img': {
                width: '65%',
            },
        },
    },
    btnLoginSocialHide: {
        display: 'none',
    },
    btnLoginText: {
        fontSize: 15,
        marginLeft: 10,
    },
    btnTextForgot: {
        fontSize: 14,
        color: PRIMARY_DARK,
        marginBottom: 20,
        width: '100%',
        fontWeight: 600,
    },
    btnSignUp: {
        display: 'flex',
        justifyContent: 'left',
        fontSize: 14,
        color: PRIMARY_DARK,
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        '& a': {
            fontWeight: 600,
            color: PURPLE,
        },
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
        },
    },
    recaptcha: {
        display: 'flex',
        justifyContent: 'center',
    },
    divConfirm: {
        width: '100%',
        backgroundColor: GREEN_HIGHLIGHT,
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        gap: 10,
        '& .MuiSvgIcon-root': {
            fill: GREEN,
        },
    },
    showButton: {
        marginRight: -10,
        '&.MuiIconButton-root:hover': {
            backgroundColor: 'transparent',
        },
        '& .MuiSvgIcon-root': {
            width: '.75em',
            height: '.75em',
            fill: PRIMARY,
        },
    },
    colorPurple: {
        color: PURPLE,
    },
    colorPurpleBold: {
        color: PURPLE,
        fontWeight: 600,
        cursor: 'pointer',
    },
    checkboxRemember: {
        display: 'inline-block',
        width: '50%',
        textAlign: 'left',
        fontWeight: 400,
    },
    forgotHyperlink: {
        display: 'inline-block',
        width: '50%',
        textAlign: 'right',
        color: PURPLE,
    },
    changeBtn: {
        color: PURPLE,
        fontSize: 12,
        cursor: 'pointer',
    },
    otpInput: {
        border: '1px #ccc solid',
        width: '25% !important',
        height: 80,
        fontSize: 30,
        margin: 5,
        fontWeight: 600,
        borderRadius: 10,
    },
    clickPurpleBoldDisable: {
        color: '#e4bbd6',
        cursor: 'not-allowed',
        fontWeight: 600,
    },
}));

export default useStyles;
