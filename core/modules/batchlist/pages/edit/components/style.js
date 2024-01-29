import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#435179';
const colorGray = '#B1BCDB';
const colorBold = '#435179';
const borderColor = '#DDE1EC';
const colorGreen = '#5EC929';
const colorRed = '#DA1414';
const colorOrange = '#FF962C';
const colorPink = '#FFDFDF';

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
        padding: '12px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 8,
        '&.pick_uncomplete': {
            border: '1px solid',
            borderColor: colorRed,
            backgroundColor: colorPink,
        },
        '& a:hover': {
            textDecoration: 'none',
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
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
        verticalAlign: 'top',
    },
    th: {
        textAlign: 'left',
        padding: '5px 8px',
        color: colorBold,
    },
    td: {
        padding: '5px 8px',
        fontFamily: font,
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '60% 40%',
    },
    gridList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        cursor: 'pointer',
    },
    titleList: {
        color: colorText,
        fontSize: 12,
        margin: 0,
        textAlign: 'center',
        position: 'relative',
        fontWeight: 500,
        fontFamily: font,
    },
    spanStart: {
        color: colorPurple,
        fontWeight: 400,
        fontSize: 12,
        textDecoration: 'underline',
    },
    loading: {
        position: 'absolute',
        right: 0,
        height: 20,
        width: 20,
        borderRadius: 50,
        borderStyle: 'dotted',
        borderColor: colorOrange,
    },
    checkmark: {
        position: 'absolute',
        right: 0,
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
        right: 0,
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
        width: '100%',
        backgroundColor: colorPurple,
        color: '#ffffff',
        cursor: 'pointer',
        padding: 20,
        border: 0,
    },
    iconCancel: {
        width: 25,
        height: 25,
        color: '#DA1414',
        position: 'absolute',
        top: -3,
        right: 5,
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 17,
            paddingRight: 17,
        },
        [theme.breakpoints.down('390')]: {
            flexDirection: 'column',
            alignItems: 'start',
        },
    },
    titleHeader: {
        display: 'inline',
        color: colorPurple,
        fontFamily: font,
        fontSize: 24,
    },
    btnHeaderAction: {
        display: 'inline',
        float: 'right',
        borderRadius: 20,
        textTransform: 'capitalize',
        [theme.breakpoints.down('xs')]: {
            float: 'left',
        },
        [theme.breakpoints.down('390')]: {
            marginBottom: 10,
        },
    },
    linkBack: {
        display: 'block',
        textDecoration: 'underline',
        color: colorPurple,
    },
}));

export default useStyles;
