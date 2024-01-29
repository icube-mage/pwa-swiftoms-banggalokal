import { makeStyles } from '@material-ui/core/styles';

const titleFont = 'normal normal bold 22px/22px "Roboto", "Helvetica", "Arial", sans-serif';
const colorPurple = '#BE1F93';
const textFont = 'normal normal normal 14px/17px "Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorBlue = '#321fdb';

const useStyles = makeStyles((theme) => ({
    paper: {
        borderRadius: 16,
    },
    textTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        color: colorPurple,
        textAlign: 'center',
        font: titleFont,
    },
    textTitleChild: {
        font: textFont,
        margin: 0,
        marginTop: 8,
    },
    contentCounter: {
        margin: '20px auto',
        overflow: 'hidden',
        width: '100%',
        fontSize: '18px',
    },
    counterNumber: {
        fontSize: '18px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]: {
            fontSize: '18px',
        },
    },
    btn: {
        borderRadius: 20,
        boxShadow: 'none',
        border: '1px solid',
        borderColor: colorPurple,
        letterSpacing: 0,
        textTransform: 'capitalize',
        padding: '5px 25px',
        '&.print': {
            background: '#FFFFFF',
            color: colorPurple,
        },
        '&.Mui-disabled': {
            borderColor: 'rgba(0, 0, 0, 0.12)',
        },
        '&.noMargin': {
            marginTop: 0,
        },
    },
    textFooter: {
        font: textFont,
        textDecoration: 'underline',
        color: colorPurple,
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        margin: 12,
    },
    fieldRoot: {
        width: '100%',
        verticalAlign: 'middle',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: 20,
        height: 36,
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    autocompleteRoot: {
        width: '80%',
        verticalAlign: 'middle',
        display: 'inline-flex',
        '&.popup': {
            display: 'block',
            maxWidth: 'unset',
        },
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            border: '1px solid',
            height: 36,
            padding: '0 9px',
            borderRadius: 20,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            margin: '10px auto',
        },
    },
    btnClear: {
        cursor: 'pointer',
        outline: 'none',
        background: 'none',
        border: 'none',
        font: titleFont,
    },
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
        fontSize: 26,
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
    },
    formField: {
        margin: '7px 0px',
        padding: 0,
        paddingBottom: 16,
        width: '100%',
        textAlign: 'left',
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
    label: {
        color: colorText,
        fontFamily: font,
        position: 'relative',
    },
    content: {
        fontSize: '18px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0px 30px 20px 30px',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            fontSize: '14px',
            padding: '0px 20px 12px 20px',
        },
    },
    linkDownload: {
        color: colorBlue,
        fontWeight: 700,
        fontSize: '16px',
        '&:hover': {
            textDecorationLine: 'underline',
        },
    },
    linkDownloadContainer: {
        width: '25%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
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
    uploadContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
            fontSize: '14px',
        },
    },
    dropZone: {
        display: 'flex',
        width: '75%',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
}));

export default useStyles;
