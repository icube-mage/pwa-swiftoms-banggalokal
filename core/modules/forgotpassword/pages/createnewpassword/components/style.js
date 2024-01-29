import { makeStyles } from '@material-ui/core/styles';
import {
    TABLE_GRAY, PRIMARY, PRIMARY_DARK,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    loginContainer: {
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        height: '100%',
        backgroundColor: TABLE_GRAY,
    },
    titleContainer: {
        marginBottom: 30,
    },
    textTitle: {
        fontSize: 30,
        color: PRIMARY_DARK,
        fontWeight: 'bold',
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
    loginContent: {
        marginTop: 20,
        maxWidth: '20%',
        [theme.breakpoints.up('sm')]: {
            maxWidth: '40%',
            left: '5%',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
        },
        [theme.breakpoints.up('md')]: {
            left: '15%',
            maxWidth: '20%',
        },
        [theme.breakpoints.down('xs')]: {
            marginLeft: '10%',
            maxWidth: '80%',
        },
        marginBottom: 30,
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
        fontSize: 15,
    },
    btnTextForgot: {
        display: 'flex',
        justifyContent: 'right',
        fontSize: 14,
        color: PRIMARY_DARK,
        marginBottom: 20,
        width: '100%',
        fontWeight: 600,
    },
    btnSignUp: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: 14,
        color: PRIMARY_DARK,
        marginBottom: 20,
        width: '100%',
        '& a': {
            fontWeight: 600,
        },
    },
    recaptcha: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

export default useStyles;
