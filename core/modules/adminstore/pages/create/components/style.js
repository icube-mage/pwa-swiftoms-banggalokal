import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const borderColor = '#DDE1EC';

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
    },
    divLabel: {
        width: 300,
        display: 'inline-block',
        [theme.breakpoints.down('sm')]: {
            width: 200,
        },
        [theme.breakpoints.down('xs')]: {
            width: 140,
        },
    },
    label: {
        color: colorText,
        fontFamily: font,
        position: 'relative',
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
        padding: '10px 29px 12px 22px',
    },
    fieldRoot: {
        width: 'calc(100% - 300px)',
        verticalAlign: 'middle',
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100% - 200px)',
        },
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 140px)',
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: 20,
        height: 40,
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            height: 0,
        },
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
        width: 'calc(100% - 300px)',
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100% - 200px)',
        },
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 140px)',
        },
    },
    autocompleteRoot: {
        width: 'calc(100% - 300px)',
        display: 'inline-flex',
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            minHeight: 36,
            padding: '0 9px',
        },
        '& .MuiFormHelperText-root': {
            fontStyle: 'italic',
            letterSpacing: 0,
            marginTop: 0,
        },
        '& .MuiFormHelperText-root.Mui-error': {
            fontStyle: 'normal',
        },
        [theme.breakpoints.down('sm')]: {
            width: 'calc(100% - 200px)',
        },
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 115px)',
        },
    },
    accordion: {
        '&.Mui-expanded': {
            '& h5': {
                fontWeight: 800,
            },
        },
        '& .MuiAccordionSummary-content': {
            margin: 0,
        },
        '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: 0,
        },
    },
    accordionDetailRoot: {
        display: 'block !important',
    },
    contentAccordion: {
        margin: '20px 0px',
        padding: '18px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 18,
        '& hr': {
            margin: '12px -15px',
            background: borderColor,
            border: 0,
            height: 1,
        },
    },
    title: {
        fontFamily: font,
        color: colorText,
        fontSize: 14,
        textTransform: 'uppercase',
    },
}));

export default useStyles;
