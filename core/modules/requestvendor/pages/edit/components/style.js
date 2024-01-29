import { makeStyles } from '@material-ui/core/styles';
import { GRAY_BG, TEXT_COLOR } from '@theme_color';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '16px 0',
        borderRadius: 16,
    },
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px',
        minWidth: 'unset',
        height: 36,
        width: 42,
        marginBottom: 6,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 18,
        },
    },
    titleTop: {
        fontSize: 24,
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            fontSize: 20,
        },
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
    },
    formFieldButton: {
        padding: '24px 29px 30px 22px',
    },
    btn: {
        borderRadius: 20,
        boxShadow: 'none',
        border: '1px solid',
        borderColor: colorPurple,
        letterSpacing: 0,
        textTransform: 'capitalize',
        padding: '5px 25px',
        marginTop: 15,
        marginRight: 10,
        '&.Mui-disabled': {
            borderColor: 'transparent',
        },
        '&.btn-not': {
            background: '#FFFFFF',
            color: colorPurple,
        },
        '&.btn-not.Mui-disabled': {
            background: 'rgba(0, 0, 0, 0.12)',
            color: 'rgba(0, 0, 0, 0.26)',
        },
    },
    divLabel: {
        marginBottom: 10,
    },
    label: {
        color: colorText,
        fontFamily: font,
        position: 'relative',
        '&.attach': {
            color: TEXT_COLOR,
        },
    },
    labelRequired: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -9,
            right: -9,
            color: colorPurple,
            fontSize: 20,
        },
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 29px 12px 22px',
    },
    fieldRoot: {
        verticalAlign: 'middle',
        width: '90%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: 20,
        height: 36,
    },
    fieldPhoneContainer: {
        display: 'initial',
        '& .flag-dropdown': {
            left: 0,
        },
        '& .form-control': {
            width: '100%',
            height: 40,
            border: '1px solid',
            borderColor: colorText,
            borderRadius: 20,
        },
    },
    fieldPhoneRoot: {
        width: '90%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    attachDiv: {
        backgroundColor: GRAY_BG,
        padding: 20,
        borderRadius: 6,
        width: '90%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    attachment: {
        width: 144,
        height: 144,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
}));

export default useStyles;
