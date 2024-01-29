import { makeStyles } from '@material-ui/core/styles';
import {
    GRAY_BG, PRIMARY, PRIMARY_DARK, PURPLE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        height: '100%',
        backgroundColor: GRAY_BG,
    },
    titleContainer: {
        marginTop: 60,
        '& .center': {
            textAlign: 'center',
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: 30,
        },
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
    formField: {
        padding: 0,
        paddingBottom: 25,
    },
    header: {
        [theme.breakpoints.down('xs')]: {
            width: 296,
            margin: '10px auto 0',
        },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containLeft: {
        [theme.breakpoints.up('sm')]: {
            width: '40%',
            float: 'left',
            paddingTop: 26,
            marginLeft: '5%',
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
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginLeft: 0,
            paddingTop: 10,
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
    content: {
        marginTop: 20,
        [theme.breakpoints.up('sm')]: {
            margin: '0 5%',
        },
        [theme.breakpoints.up('md')]: {
            margin: '0 9%',
        },
        [theme.breakpoints.up('lg')]: {
            margin: '0 25%',
        },
        [theme.breakpoints.down('xs')]: {
            margin: '20px auto',
            maxWidth: 280,
        },
    },
    stepper: {
        marginBottom: 20,
        color: PRIMARY_DARK,
        '&.MuiPaper-root': {
            backgroundColor: 'transparent',
        },
        '&.MuiStepper-root': {
            paddingLeft: 0,
        },
        '& .MuiStepLabel-label': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
        '& .MuiStepIcon-root': {
            color: ' white',
        },
        '& .MuiStepIcon-text': {
            fill: PRIMARY_DARK,
        },
        '& .MuiStepIcon-root.MuiStepIcon-active': {
            color: PRIMARY_DARK,
            '& .MuiStepIcon-text': {
                fill: 'white',
            },
        },
        '& .MuiStepIcon-root.MuiStepIcon-completed': {
            color: PRIMARY_DARK,
        },
        '& .MuiStepLabel-iconContainer.MuiStepLabel-alternativeLabel': {
            color: PRIMARY_DARK,
            cursor: 'pointer',
            fill: 'white',
        },
        '& .MuiStepLabel-label.MuiStepLabel-active': {
            color: PRIMARY_DARK,
        },
        '& .MuiStepLabel-label.MuiStepLabel-completed': {
            color: PRIMARY_DARK,
        },
        '&.disabled': {
            '& .MuiStepLabel-iconContainer.MuiStepLabel-alternativeLabel': {
                color: PRIMARY_DARK,
                cursor: 'default',
                fill: 'white',
            },
        },
    },
    btn: {
        background: PRIMARY,
        borderRadius: 7,
        padding: 6,
        width: '100%',
        height: 52,
        '&:hover': {
            background: PRIMARY_DARK,
        },
    },
    btnText: {
        fontSize: 15,
    },
    contentSuccess: {
        maxWidth: 350,
        margin: '100px auto',
    },
    successImg: {
        marginTop: 20,
        marginBottom: 30,
        [theme.breakpoints.down('xs')]: {
            width: '90%',
            height: 'auto',
        },
    },
    btnBack: {
        background: PRIMARY,
        borderRadius: 7,
        padding: 6,
        width: '100%',
        height: 52,
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
    },
    otpInput: {
        border: 'transparent',
        width: '25% !important',
        height: 60,
        fontSize: 30,
        margin: 5,
        fontWeight: 600,
        borderRadius: 10,
        background: '#fff',
    },
    purple: {
        color: PURPLE,
    },
    clickPurple: {
        color: PURPLE,
        cursor: 'pointer',
    },
    clickPurpleBold: {
        color: PURPLE,
        cursor: 'pointer',
        fontWeight: 600,
    },
    clickPurpleBoldDisable: {
        color: '#e4bbd6',
        cursor: 'not-allowed',
        fontWeight: 600,
    },
}));

export default useStyles;
