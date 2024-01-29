import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGray = '#B1BCDB';

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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            alignItems: 'start',
        },
    },
    formFieldButton: {
        padding: '24px 29px 30px 22px',
    },
    btn: {
        borderRadius: 20,
    },
    divLabel: {
        width: '15%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            margin: '10px 0',
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
        padding: '10px 29px 12px 22px',
    },
    fieldRoot: {
        width: '35%',
        verticalAlign: 'middle',
        [theme.breakpoints.down('md')]: {
            width: '60%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
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
    autocompleteRoot: {
        width: 'calc(100% - 300px)',
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
    titleSmall: {
        fontFamily: font,
        color: colorGray,
        fontSize: 14,
        margin: 0,
        marginBottom: 18,
        marginTop: 18,
    },
    progressContainer: {
        padding: '0px 29px 0px 22px',
    },
    leftColumn: {
        backgroundColor: colorPurple,
        color: 'white !important',
        fontWeight: 'bold !important',
        maxWidth: 200,
        width: 200,
    },
    rightColumn: {
        '&.capitalize': { textTransform: 'capitalize !important' },
    },
    status: {
        '&.error': {
            color: 'red !important',
        },
        '&.success': {
            color: 'green !important',
        },
        fontWeight: 'bold !important',
        marginBottom: 20,
        fontSize: 18,
    },
}));

export default useStyles;
