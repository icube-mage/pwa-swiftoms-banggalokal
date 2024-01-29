import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGray = '#B1BCDB';
const borderColor = '#DDE1EC';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 16px',
        borderRadius: 16,
        backgroundColor: 'unset',
        paddingBottom: 20,
        boxShadow: 'none',
        '& .title-information': {
            [theme.breakpoints.down('xs')]: {
                height: 75,
            },
            [theme.breakpoints.up('sm')]: {
                height: 75,
            },
            [theme.breakpoints.up('md')]: {
                height: 'auto',
            },
        },
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
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
        borderBottom: '1px solid',
        paddingBottom: 10,
        borderColor: colorGray,
        fontFamily: font,
        color: colorGray,
        fontSize: 14,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 8,
    },
    needMapping: {
        borderBottom: '1px solid',
        paddingBottom: 10,
        borderColor: colorGray,
        fontFamily: font,
        color: colorGray,
        margin: 0,
        marginBottom: 8,
    },
    formField: {
        padding: 0,
        paddingLeft: 10,
        display: 'grid',
        gridTemplateColumns: '30% 70%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
        marginBottom: 15,
    },
    formFieldButton: {
        padding: '16px 0 30px 0px',
    },
    btn: {
        borderRadius: 20,
    },
    divLabel: {
        width: 300,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            width: 140,
        },

    },
    label: {
        color: colorText,
        fontFamily: font,
        position: 'relative',
    },
    fieldRoot: {
        width: 'calc(100% - 300px)',
        verticalAlign: 'middle',
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
    fieldInputDisabled: {
        border: '1px solid',
        borderColor,
        borderRadius: 20,
        height: 40,
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            height: 0,
        },
    },
    selectControl: {
        margin: '8px 0px',
    },
    autocompleteRoot: {
        verticalAlign: 'middle',
        display: 'inline-flex',
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            minHeight: 36,
            padding: '0 9px',
        },
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 115px)',
        },
    },
    selectFirst: {
        height: 36,
        fontStyle: 'italic',
        display: 'flex',
        alignItems: 'center',
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
    },
    tr: {
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
        verticalAlign: 'top',
    },
    th: {
        textAlign: 'left',
        padding: '5px 0',
    },
    td: {
        padding: '5px 0',
        fontFamily: font,
    },
    redWarn: {
        color: 'red',
    },
}));

export default useStyles;
