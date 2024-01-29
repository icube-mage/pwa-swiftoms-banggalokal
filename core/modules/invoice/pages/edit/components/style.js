import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorGray = '#B1BCDB';
const colorBold = '#435179';
const borderColor = '#DDE1EC';
const borderGray = '#E5E9F1';

const bgRed = '#FFDFDF';
const borderRed = '#D80000';
const bgGreen = '#EBFFE2';
const borderGreen = '#51C519';
const bgBlue = '#e2edff';
const borderBlue = '#b1bbdc';

const useStyles = makeStyles((theme) => ({
    statusFailed: {
        backgroundColor: bgRed,
        border: '1px solid',
        borderColor: borderRed,
        borderRadius: 20,
        color: borderRed,
        textAlign: 'center',
        textTransform: 'capitalize',
        padding: '6px 15px',
    },
    statusSuccess: {
        backgroundColor: bgGreen,
        border: '1px solid',
        borderColor: borderGreen,
        borderRadius: 20,
        color: borderGreen,
        textAlign: 'center',
        textTransform: 'capitalize',
        padding: '6px 15px',
    },
    statusAllocating: {
        backgroundColor: bgBlue,
        border: '1px solid',
        borderColor: borderBlue,
        borderRadius: 20,
        color: borderBlue,
        textAlign: 'center',
        textTransform: 'capitalize',
        padding: '6px 15px',
    },

    container: {
        padding: '0 16px',
        paddingBottom: 5,
        borderRadius: 16,
        backgroundColor: 'unset',
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
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px',
        minWidth: 'unset',
        height: 36,
        width: 36,
        marginBottom: 6,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 18,
            height: 30,
            width: 30,
        },
    },
    titleTop: {
        fontSize: 24,
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
        marginTop: 0,
        [theme.breakpoints.down('xs')]: {
            fontSize: 16,
        },
    },
    titleSmall: {
        fontFamily: font,
        color: colorGray,
        fontSize: 12,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 8,
        marginTop: 18,
    },
    contentHeader: {
        padding: '18px 15px',
        [theme.breakpoints.down('xs')]: {
            paddingTop: 9,
        },
        borderRadius: 16,
        '& .divHeader': {
            display: 'inline-block',
            marginRight: 20,
            marginBottom: 10,
            verticalAlign: 'top',
        },
        '& .titleHeader': {
            color: colorGray,
            fontSize: 12,
            textTransform: 'uppercase',
            margin: 0,
        },
        '& .titleHeaderWithIcon': {
            color: colorBold,
            fontSize: 14,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
        },
        '& .iconHeader': {
            height: 36,
            width: 36,
            marginRight: 10,
        },
        '& .spanHeader': {
            color: colorBold,
        },
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 18,
        '& hr': {
            margin: '12px -15px',
            background: borderGray,
            border: 0,
            height: 1,
        },
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
    gridTotal: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        '& .grid-child': {
            gridColumn: 3,
        },
        [theme.breakpoints.down('xs')]: {
            display: 'block',
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
    table: {
        borderCollapse: 'collapse',
        width: '100%',
        [theme.breakpoints.down('md')]: {
            width: '1500px',
        },
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
        '&.status': {
            textTransform: 'capitalize',
        },
        '&.check': {
            color: colorPurple,
            textDecoration: 'underline',
            cursor: 'pointer',
        },
    },
    grandTotal: {
        fontFamily: font,
        fontWeight: 'bold',
    },
    titleSmallBlack: {
        textAlign: 'left',
        color: colorBold,
        fontFamily: font,
        fontSize: 14,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 8,
        marginTop: 8,
    },
    orderTotalContainer: {
        display: 'flex',
        padding: '3px 0px',
    },
    orderTotalItem: {
        width: '50%',
        padding: '5px 10px',
    },
}));

export default useStyles;
