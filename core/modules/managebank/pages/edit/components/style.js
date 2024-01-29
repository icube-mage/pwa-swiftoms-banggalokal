import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGray = '#B1BCDB';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 16px',
        borderRadius: 16,
        backgroundColor: 'unset',
        boxShadow: 'none',
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
    titleSmall: {
        fontFamily: font,
        color: colorGray,
        fontSize: 12,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 8,
        marginTop: 18,
    },
    formField: {
        display: 'grid',
        gridTemplateColumns: '40% 60%',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
        padding: '0 10px',
        paddingBottom: 16,
    },
    formFieldButton: {
        padding: '0px 29px 30px 22px',
    },
    btn: {
        borderRadius: 20,
        marginRight: 10,
    },
    divLabel: {
        width: 300,
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            width: 140,
        },
        '&.top': {
            verticalAlign: 'top',
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
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 18,
    },
    fieldRoot: {
        width: '100%',
        verticalAlign: 'middle',
    },
    fieldRootDesc: {
        [theme.breakpoints.down('xs')]: {
            verticalAlign: 'top',
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: 20,
        height: 36,
    },
    notes: {
        display: 'inline-block',
        marginTop: 10,
    },
    autocompleteRoot: {
        width: '100%',
        verticalAlign: 'middle',
        display: 'inline-flex',
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            minHeight: 36,
            padding: '0 9px',
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
    radioGroup: {
        '& .MuiRadio-colorSecondary.Mui-checked': {
            color: colorPurple,
        },
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 13,
        },
    },
    logo: {
        maxWidth: 200,
        maxHeight: 200,
    },
}));

export default useStyles;
