import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorBlue = '#321fdb';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '16px 0',
        borderRadius: 16,
    },
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px !important',
        minWidth: 'unset !important',
        height: 36,
        width: '36px !important',
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
        width: '50%',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            textAlign: 'left ',
        },
    },
    divLabel: {
        width: 158,
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            width: 140,
        },
    },
    formFieldButton: {
        padding: '24px 29px 30px 22px',
    },
    btn: {
        borderRadius: '20px !important',
    },
    label: {
        color: colorText,
        fontFamily: font,
        position: 'relative',
    },
    content: {
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 29px 12px 22px',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    contentWithoutBorder: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        padding: '10px 29px 12px 22px',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    linkDownload: {
        color: colorBlue,
        fontWeight: 700,
        '&:hover': {
            textDecorationLine: 'underline',
        },
    },
    textAttach: {
        fontWeight: 'bold',
        display: 'block',
        padding: '10px 29px 12px 22px',
    },
    inputCsv: {
        marginLeft: 5,
    },
    textLeft: {
        textAlign: 'left !important',
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
    autocomplete: {
        '& .MuiTextField-root': {
            width: '80%',
        },
        [theme.breakpoints.down('md')]: {
            '& .MuiTextField-root': {
                width: '100%',
            },
            '& .MuiInputBase-root': {
                padding: '0px !important',
            },
            '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
                padding: 10,
            },
        },
    },
    autocompleteRoot: {
        width: 'calc(100% - 158px)',
        verticalAlign: 'middle',
        display: 'inline-flex',
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            height: 36,
            padding: '0 9px',
        },
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 140px)',
        },
    },
}));

export default useStyles;
