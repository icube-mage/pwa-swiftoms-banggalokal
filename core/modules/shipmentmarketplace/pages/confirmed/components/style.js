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
        width: '50%',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            textAlign: 'left ',
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
