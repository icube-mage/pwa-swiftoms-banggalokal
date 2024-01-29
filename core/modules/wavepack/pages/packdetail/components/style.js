import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#435179';
const borderGray = '#E5E9F1';
const colorGreen = '#5EC929';
const colorRed = '#DA1414';
const colorOrange = '#FF962C';
const colorGray = '#B1BCDB';
const borderColor = '#DDE1EC';

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
        marginBottom: 20,
        '& hr': {
            margin: '12px -15px',
            background: borderGray,
            border: 0,
            height: 1,
        },
    },
    gridList: {
        display: 'grid',
        gridTemplateColumns: '1fr 2.5fr 1fr .5fr',
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
    imgList: {
        width: 65,
        height: 65,
    },
    titleList: {
        color: colorGray,
        fontSize: 10,
        fontWeight: 400,
        marginTop: 0,
        marginBottom: 5,
    },
    bodyList: {
        fontSize: 13,
        color: colorText,
        margin: 0,
        position: 'relative',
        fontWeight: 400,
        '&.bold': {
            fontWeight: 600,
        },
        '&.red': {
            color: colorRed,
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
        right: 5,
        top: 22,
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
    exclamation: {
        position: 'absolute',
        right: 5,
        top: 22,
        backgroundColor: colorRed,
        height: 20,
        width: 20,
        borderRadius: 50,
        '&::before': {
            content: "''",
            position: 'absolute',
            top: '15%',
            left: '49%',
            height: 9,
            width: 3,
            border: 'solid #ffffff',
            borderWidth: '0 3px 0 0',
            transform: 'translateX(-50%)',
        },
        '&::after': {
            content: "''",
            position: 'absolute',
            top: '70%',
            left: '49%',
            height: 3,
            width: 3,
            border: 'solid #ffffff',
            borderWidth: '0 3px 0 0',
            transform: 'translateX(-50%)',
        },
    },
    loadingFetch: {
        display: 'flex',
        color: '#435179',
        fontWeight: 600,
        justifyContent: 'center',
        padding: '20px 0',
    },
    footer: {
        background: '#ffffff',
        position: 'sticky',
        bottom: 0,
        left: 0,
        width: '100%',
        '& h2': {
            margin: 0,
            display: 'inline-block',
            color: colorPurple,
            verticalAlign: 'middle',
        },
        '& span': {
            marginLeft: 5,
        },
    },
    btnFooter: {
        width: '50%',
        backgroundColor: colorPurple,
        color: '#FFFFFF',
        cursor: 'pointer',
        padding: 20,
        border: 0,
        fontSize: 18,
        fontWeight: 600,
    },
    btnFooterDisabled: {
        width: '50%',
        backgroundColor: borderColor,
        color: colorPurple,
        cursor: 'pointer',
        padding: 20,
        border: 0,
        fontSize: 18,
        fontWeight: 600,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: 16,
        width: 374,
        '@media (max-width: 767px )': {
            width: '90%',
        },
        textAlign: 'center',
    },
    checkmarkModal: {
        position: 'absolute',
        backgroundColor: colorGreen,
        height: 50,
        width: 50,
        borderRadius: 50,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, 10%)',
        '&::after': {
            content: "''",
            position: 'absolute',
            border: 'solid #ffffff',
            borderWidth: '0 6px 6px 0',
            width: 17,
            height: 32,
            top: 5,
            left: 16,
            transform: 'rotate(45deg)',
        },
        cursor: 'pointer',
    },
    btnModal: {
        width: 225,
        backgroundColor: colorPurple,
        color: '#FFFFFF',
        cursor: 'pointer',
        padding: '15px 25px',
        border: 0,
        borderRadius: 27,
        fontSize: 18,
    },
    spanBack: {
        color: colorPurple,
        margin: 0,
        fontWeight: 400,
        fontSize: 14,
        textDecoration: 'underline',
        cursor: 'pointer',
    },
}));

export default useStyles;
