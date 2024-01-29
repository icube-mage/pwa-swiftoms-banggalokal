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
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            textAlign: 'left ',
        },
        '&.textLeft': {
            textAlign: 'left',
            width: '60%',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
        '&.textRight': {
            width: '40%',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
    },
    formFieldButton: {
        padding: '24px 29px 30px 22px',
    },
    btn: {
        borderRadius: 20,
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
        alignItems: 'center',
        borderBottom: '3px solid #F5F7FB',
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
    divLabel: {
        width: 158,
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            width: 140,
        },
    },
    autocompleteRoot: {
        width: '50%',
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
