import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#435179';
const colorGray = '#B1BCDB';
const borderColor = '#DDE1EC';
const borderGray = '#E5E9F1';
const colorGreen = '#5EC929';
const colorRed = '#DA1414';
const colorOrange = '#FF962C';

const useStyles = makeStyles((theme) => ({
    green: {
        color: colorGreen,
        fontWeight: 500,
    },
    orange: {
        color: colorOrange,
        fontWeight: 500,
    },
    red: {
        color: colorRed,
        fontWeight: 500,
    },
    gray: {
        color: colorGray,
        fontWeight: 500,
    },
    container: {
        padding: '0 16px',
        borderRadius: 16,
        backgroundColor: 'unset',
        boxShadow: 'none',
        position: 'relative',
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
    titleTopSmall: {
        fontSize: 12,
        color: colorText,
        position: 'absolute',
        right: 18,
        top: '50%',
        transform: 'translateY(-50%)',
        margin: 0,
    },
    titleSmall: {
        color: colorText,
        fontSize: 12,
        margin: 0,
        marginBottom: 5,
        fontWeight: 400,
    },
    formFieldButton: {
        margin: '20px 0 10px 0',
    },
    btn: {
        borderRadius: 20,
        boxShadow: 'none',
        border: '1px solid',
        borderColor: colorPurple,
        letterSpacing: 0,
        textTransform: 'capitalize',
        padding: '5px 25px',
        marginTop: 15,
        '&.print': {
            background: '#FFFFFF',
            color: colorPurple,
            marginTop: 0,
        },
        '&.Mui-disabled': {
            borderColor: 'rgba(0, 0, 0, 0.12)',
        },
    },
    headerContent: {
        padding: '0 15px 18px 15px',
    },
    content: {
        padding: '8px 15px',
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
    orderLabel: {
        fontFamily: font,
        display: 'block',
        '& .imgIcon': {
            width: 18,
            verticalAlign: 'top',
            marginRight: 5,
        },
    },
    contentLeft: {
        display: 'inline-block',
        width: '50%',
        verticalAlign: 'top',
    },
    contentRight: {
        width: '100%',
        '& tr td:nth-child(3)': {
            [theme.breakpoints.up('sm')]: {
                width: '10%',
            },
            [theme.breakpoints.up('md')]: {
                width: '17%',
            },
        },
        '& tr td:first-child, tr td:nth-child(4)': {
            paddingRight: 8,
        },
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
    },
    tr: {
        verticalAlign: 'top',
        position: 'relative',
    },
    th: {
        textAlign: 'left',
        padding: '0 8px',
        color: colorGray,
        fontSize: 10,
    },
    td: {
        padding: '0 8px',
        color: colorText,
        fontSize: 13,
        fontWeight: 400,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '60% 40%',
    },
    gridList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
    },
    titleList: {
        color: colorText,
        fontSize: 12,
        margin: 0,
        textAlign: 'center',
        position: 'relative',
    },
    spanStart: {
        color: colorPurple,
        fontWeight: 400,
        fontSize: 9,
        textDecoration: 'underline',
    },
    loading: {
        position: 'absolute',
        right: 2,
        top: 8,
        height: 20,
        width: 20,
        borderRadius: 50,
        borderStyle: 'dotted',
        borderColor: colorOrange,
    },
    checkmark: {
        position: 'absolute',
        right: 2,
        top: 8,
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
    },
    exclamation: {
        position: 'absolute',
        right: 2,
        top: 8,
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
    iconBarcode: {
        marginTop: 6,
    },
    footer: {
        background: '#ffffff',
        position: 'sticky',
        bottom: 0,
        left: 0,
        width: '100%',
        // [theme.breakpoints.down('xs')]: {
        //     position: 'fixed',
        // },
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
        width: '40%',
        backgroundColor: colorPurple,
        color: '#FFFFFF',
        cursor: 'pointer',
        padding: 20,
        border: 0,
    },
    btnFooterDisabled: {
        width: '40%',
        backgroundColor: borderColor,
        color: colorGray,
        cursor: 'not-allowed',
        padding: 20,
        border: 0,
    },
}));

export default useStyles;
