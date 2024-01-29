import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const borderColor = '#DDE1EC';

const useStyles = makeStyles((theme) => ({
    body: {
        padding: '25px 29px 12px 22px',
    },
    container: {
        padding: '16px 0',
        borderRadius: 16,
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
        width: 42,
        marginBottom: 6,
    },
    titleTop: {
        fontSize: 24,
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
    },
    title: {
        fontFamily: font,
        color: colorText,
        fontSize: 14,
        textTransform: 'uppercase',
        margin: 0,
        padding: '17px 0',
        position: 'relative',
        display: 'inline-block',
    },
    labelRequired: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: 9,
            right: -9,
            color: colorPurple,
            fontSize: 20,
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
        marginTop: 15,
        '&.btn-package': {
            fontSize: 13,
            margin: 0,
        },
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 29px 12px 22px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 8,
    },
    orderLabel: {
        fontFamily: font,
        display: 'block',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 35%)',
        rowGap: 10,
        '& span': {
            borderBottom: '1px solid',
            borderColor,
            paddingBottom: 10,
        },
    },
    contentLeft: {
        display: 'inline-block',
        width: '50%',
        verticalAlign: 'top',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    contentRight: {
        display: 'inline-block',
        width: '50%',
        verticalAlign: 'top',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
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
        padding: 8,
        background: '#d3d3d3',
        verticalAlign: 'middle',
    },
    td: {
        padding: 8,
        fontFamily: font,
        verticalAlign: 'top',
        '& aside': {
            display: 'inline-block',
        },
    },
    center: {
        textAlign: 'center',
    },
    fieldRoot: {
        maxWidth: 200,
        verticalAlign: 'middle',
        marginBottom: 10,
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 140px)',
        },
        '&.fieldNotes': {
            maxWidth: 'unset',
            width: '100%',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
    },
    spanDetails: {
        marginBottom: 10,
        display: 'block',
    },
    aLink: {
        color: '#007bdb',
        textDecoration: 'underline',
    },
    messageText: {
        marginBottom: 5,
        '&.admin': {
            textAlign: 'right',
        },
    },
    dropFile: {
        margin: '50px 0 20px -18px',
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
        },
    },
    tableTop: {
        width: '80%',
        borderSpacing: 0,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    tdTop: {
        borderBottom: '2px solid',
        borderBottomColor: borderColor,
        verticalAlign: 'top',
        padding: '8px 8px 8px 0',
    },
    imgThumbContainer: {
        height: 50,
        width: 50,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    },
}));

export default useStyles;
