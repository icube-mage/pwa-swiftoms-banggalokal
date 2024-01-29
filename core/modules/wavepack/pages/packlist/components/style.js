import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#435179';
const borderGray = '#E5E9F1';
const colorGreen = '#5EC929';
const colorRed = '#DA1414';
const colorOrange = '#FF962C';

const useStyles = makeStyles((theme) => ({
    red: {
        color: colorRed,
        fontWeight: 600,
    },
    orange: {
        color: colorOrange,
        fontWeight: 600,
    },
    gray: {
        color: colorText,
        fontWeight: 600,
    },
    container: {
        padding: '0 16px 32px 16px',
        borderRadius: 16,
        backgroundColor: 'unset',
        boxShadow: 'none',
    },
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px',
        minWidth: 'unset',
        height: 36,
        width: 36,
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
        color: colorText,
        fontSize: 12,
        margin: 0,
        marginBottom: 5,
        fontWeight: 400,
    },
    headerContent: {
        padding: '0 15px 18px 15px',
    },
    content: {
        padding: '12px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 8,
        '& hr': {
            margin: '12px -15px',
            background: borderGray,
            border: 0,
            height: 1,
        },
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '60% 40%',
    },
    gridList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
    },
    divList: {
        display: 'flex',
        alignItems: 'center',
        '&.start': {
            justifyContent: 'start',
        },
        '&.end': {
            justifyContent: 'end',
        },
    },
    bodyList: {
        fontSize: 13,
        color: colorText,
        margin: 0,
        position: 'relative',
        fontWeight: 400,
        '&.size18': {
            fontSize: 18,
        },
    },
    spanStart: {
        color: colorPurple,
        margin: 0,
        fontWeight: 400,
        fontSize: 13,
        textDecoration: 'underline',
        textAlign: 'right',
        cursor: 'pointer',
        fontFamily: font,
    },
    loading: {
        position: 'absolute',
        right: 0,
        top: '25%',
        height: 20,
        width: 20,
        borderRadius: 50,
        borderStyle: 'dotted',
        borderColor: colorOrange,
    },
    checkmark: {
        position: 'absolute',
        right: 0,
        top: '-10px',
        backgroundColor: colorGreen,
        height: 20,
        width: 20,
        borderRadius: 50,
        '&::after': {
            content: "''",
            position: 'absolute',
            border: 'solid #ffffff',
            borderWidth: '0 3px 3px 0',
            width: 7,
            height: 13,
            top: 2,
            left: 6,
            transform: 'rotate(45deg)',
        },
        cursor: 'pointer',
    },
    loadingFetch: {
        display: 'flex',
        color: '#435179',
        fontWeight: 600,
        justifyContent: 'center',
        padding: '20px 0',
    },
}));

export default useStyles;
