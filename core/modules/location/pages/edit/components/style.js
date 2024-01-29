import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGray = '#B1BCDB';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '16px 0',
        borderRadius: 16,
        margin: '20px 0',
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
    title: {
        fontFamily: font,
        color: colorText,
        fontSize: 14,
        textTransform: 'uppercase',
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '30% 60% 10%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
    },
    formFieldDay: {
        padding: 0,
        paddingBottom: 16,
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '30% 60% 10%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
        '& .MuiFormHelperText-contained': {
            margin: 0,
        },
    },
    formFieldButton: {
        padding: '15px 29px 40px 22px',
    },
    btn: {
        borderRadius: 20,
    },
    divLabel: {
        display: 'block',
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
        padding: '10px 29px 12px 22px',
    },
    contentWithoutBorder: {
        padding: '0px 29px 0px 22px',
    },
    fieldRoot: {
        width: '100%',
        verticalAlign: 'middle',
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            padding: '7px 14px',
        },
    },
    fieldRootDate: {
        verticalAlign: 'middle',
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            padding: '7px 14px',
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: 20,
        height: 36,
    },
    fieldInputDate: {
        border: '1px solid',
        borderColor: colorText,
        height: 36,
    },
    labelNote: {
        verticalAlign: 'top',
        marginTop: 10,
    },
    notes: {
        display: 'inline-block',
        marginTop: 10,
    },
    autocompleteRoot: {
        width: '100%',
        verticalAlign: 'middle',
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            height: 36,
            padding: '0 9px',
        },
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
    boxMap: {
        margin: '20px 0',
    },
    tooltip: {
        display: 'block',
    },
    tooltipWidth: {
        maxWidth: 200,
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
        width: '100%',
    },
    controlLabel: {
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 14,
            [theme.breakpoints.down('sm')]: {
                fontSize: 12,
            },
        },
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: colorPurple,
        },
    },
    rootLabel: {
        marginBottom: '3px !important',
        marginLeft: '2% !important',
    },
}));

export default useStyles;
