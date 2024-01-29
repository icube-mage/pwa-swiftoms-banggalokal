import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGrey = '#B1BCDB';
const colorGray = '#e1e1e1';
const borderColor = '#DDE1EC';
const colorBorder = '#d8dbe0';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '16px 0',
        borderRadius: 16,
        '& .MuiAccordionDetails-root': {
            display: 'block',
        },
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 29px 12px 22px',
    },
    contentChild: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 15px 12px 15px',
        [theme.breakpoints.down('sm')]: {
            overflow: 'scroll',
        },
    },
    titleTop: {
        fontSize: 24,
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
        paddingLeft: '2%',
        [theme.breakpoints.down('sm')]: {
            fontSize: 18,
        },
    },
    title: {
        fontFamily: font,
        color: colorText,
        fontSize: 14,
        textTransform: 'uppercase',
    },
    titleSmall: {
        paddingBottom: 10,
        borderColor: colorGrey,
        fontFamily: font,
        color: colorGrey,
        fontSize: 14,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 8,
    },
    accordion: {
        '&.Mui-expanded': {
            background: colorGray,
            '& h2': {
                fontWeight: 800,
            },
        },
        '& .MuiAccordionSummary-content': {
            margin: 0,
        },
        '& .MuiAccordionSummary-content.Mui-expanded': {
            margin: 0,
        },
    },
    accordionDetailRoot: {
        display: 'block !important',
    },
    accordionChild: {
        boxShadow: 'none !important',
    },
    formField: {
        display: 'grid',
        gridTemplateColumns: '30% 40% 30%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
        padding: 0,
        alignItems: 'baseline',
    },
    formFieldMobile: {
        display: 'grid',
        gridTemplateColumns: '40% 60%',
    },
    formFieldButton: {
        padding: '24px 29px 30px 22px',
    },
    btn: {
        borderRadius: 20,
    },
    divLabel: {
        display: 'flex',
        justifyContent: 'end',
        textAlign: 'end',
        [theme.breakpoints.down('sm')]: {
            paddingRight: 10,
            paddingLeft: 0,
            justifyContent: 'start',
            textAlign: 'start',
        },
        paddingRight: 30,
    },
    label: {
        color: colorText,
        fontFamily: font,
        position: 'relative',
    },
    comment: {
        fontSize: '12px',
        marginTop: -12,
    },
    labelRequired: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -9,
            right: -9,
            color: colorPurple,
            fontSize: 20,
        },
    },
    divField: {
        display: 'flex',
        flex: '0 0 100%',
        flexDirection: 'column',
    },
    fieldRoot: {
        '&.fieldRoot': {
            margin: '8px 0',
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: '20px !important',
        height: 35,
        margin: '7px 0px',
        '&.disabled': {
            borderColor,
        },
        '& .MuiOutlinedInput-input': {
            padding: '7px 14px',
        },
    },
    selectControl: {
        margin: '8px 0px',
    },
    controlLabel: {
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 14,
            [theme.breakpoints.down('sm')]: {
                fontSize: 12,
            },
        },
    },
    rootLabel: {
        marginBottom: '3px !important',
        marginLeft: '2% !important',
    },
    table: {
        width: '100%',
        maxWidth: '100%',
        border: '1px solid',
        borderColor: colorBorder,
        backgroundColor: colorGray,
        borderCollapse: 'collapse',
        '& th': {
            maxWidth: '100%',
            padding: '11px 10px',
            whiteSpace: 'normal',
            textAlign: 'left',
            verticalAlign: 'bottom',
        },
        '& td': {
            maxWidth: '100%',
            padding: '11px 10px',
            whiteSpace: 'nowrap',
            verticalAlign: 'middle',
        },
    },
    tableInput: {
        '& input': {
            backgroundColor: '#ffffff',
            padding: 10,
        },
    },
    textNoFile: {
        padding: '0 10px',
    },
}));

export default useStyles;
