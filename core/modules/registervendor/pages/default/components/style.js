import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';

const useStyles = makeStyles((theme) => ({
    loginContainer: {
        [theme.breakpoints.up('sm')]: {
            margin: '0 auto',
            width: '100%',
            height: '100%',
            position: 'relative',
        },
    },
    textTitle: {
        fontSize: 24,
        color: '#536777',
        textAlign: 'center',
        marginBottom: 60,
    },
    textInput: {
        width: '100%',
    },
    formField: {
        padding: 0,
        paddingBottom: 25,
    },
    label: {
        fontSize: 12,
        color: '#B1BCDB',
        marginBottom: 5,
    },
    headerLogin: {
        [theme.breakpoints.down('xs')]: {
            width: 296,
            margin: '20px auto 0',
        },
    },
    containLeft: {
        [theme.breakpoints.up('sm')]: {
            width: '48%',
            float: 'left',
            paddingTop: 26,
            marginLeft: 21,
            height: '115vmin',
            overflow: 'scroll',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
                width: 0,
                background: 'transparent',
            },
        },
        [theme.breakpoints.up('md')]: {
            height: '100vh',
        },
    },
    containRight: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
        [theme.breakpoints.up('sm')]: {
            width: '49%',
            float: 'right',
            height: '100%',
        },
    },
    rightImg: {
        width: '100%',
        objectFit: 'cover',
        [theme.breakpoints.up('sm')]: {
            height: '100%',
        },
    },
    loginContent: {
        maxWidth: 307,
        marginTop: 50,
        [theme.breakpoints.up('sm')]: {
            marginLeft: '5%',
        },
        [theme.breakpoints.up('md')]: {
            marginLeft: '9%',
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: '25%',
        },
        [theme.breakpoints.down('xs')]: {
            margin: '20% auto',
            maxWidth: 280,
        },
    },
    btnLogin: {
        marginTop: 20,
        background: colorPurple,
        borderRadius: 7,
        padding: 6,
        width: '100%',
        '&:hover': {
            background: colorPurple,
        },
    },
    btnLoginText: {
        color: '#FFFFFF',
        padding: '2px 0px',
        letterSpacing: 2,
        fontSize: 20,
    },
    btnTextForgot: {
        display: 'block',
        marginTop: 26,
        textAlign: 'center',
        fontSize: 14,
        color: '#536777',
    },
    fieldPhoneContainer: {
        '& .form-control': {
            backgroundColor: 'transparent',
            width: '100%',
            border: 'none',
            borderBottom: '1px solid rgba(0, 0, 0, 0.54)',
            borderRadius: 0,
            '&:focus': {
                border: 'none',
                borderBottom: '2px solid black',
                boxShadow: 'none',
                '& .special-label': {
                    color: 'black',
                },
            },
        },
    },
    fieldPhoneRoot: {
        width: '100%',
    },
}));

export default useStyles;
