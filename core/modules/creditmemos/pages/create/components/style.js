import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGray = '#B1BCDB';
const colorBold = '#435179';
const borderColor = '#DDE1EC';
const borderGray = '#E5E9F1';

const bgRed = '#FFDFDF';
const borderRed = '#D80000';
const bgYellow = '#FFF9E2';
const borderYellow = '#FFCD04';
const bgGreen = '#EBFFE2';
const borderGreen = '#51C519';
const bgBlack = '#000';
const bgBlue = '#e2edff';
const borderBlue = '#2f6bcc';

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
    statusProcessing: {
        backgroundColor: bgYellow,
        border: '1px solid',
        borderColor: borderYellow,
        borderRadius: 20,
        color: borderYellow,
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
    statusClosed: {
        backgroundColor: bgBlack,
        border: '1px solid',
        borderColor: colorBold,
        borderRadius: 20,
        color: '#ffffff',
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
    headerImg: {
        position: 'absolute',
        right: 0,
        top: 0,
        transform: 'translateY(-100%)',
        [theme.breakpoints.down('xs')]: {
            top: -10,
            transform: 'unset',
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
    title: {
        fontFamily: font,
        color: colorText,
        fontSize: 14,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 18,
        textAlign: 'center',
        '&.jarak': {
            marginBottom: 0,
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
    formFieldButton: {
        marginTop: 10,
        paddingBottom: 30,
        '& .btnFormDialog': {
            borderRadius: 20,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: colorPurple,
            letterSpacing: 0,
            textTransform: 'capitalize',
            padding: '5px 25px',
            marginTop: 15,
        },
    },
    fieldRootNote: {
        maxWidth: 200,
        verticalAlign: 'middle',
        marginBottom: 10,
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 140px)',
        },
        '&.fieldCenter': {
            marginLeft: 10,
            marginRight: 10,
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 20,
        },
        '& .MuiInputLabel-outlined': {
            transform: 'translate(10px, 10px)',
        },
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
        },
        '&.marginTop': {
            marginTop: '20px !important',
        },
        '&.full': {
            maxWidth: '100%',
            width: '100%',
        },
    },
    formgroup: {
        marginBottom: 20,
    },
    controlLabel: {
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 14,
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
        '&.reverse': {
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
    contentHeader: {
        padding: '18px 15px',
        [theme.breakpoints.down('xs')]: {
            paddingTop: 10,
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
        [theme.breakpoints.down('xs')]: {
            overflow: 'scroll',
        },
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
        gridTemplateColumns: '1fr 1fr',
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
        verticalAlign: 'top',
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
    progressBarContainer: {
        position: 'relative',
    },
    progressBar: {
        '&::before': {
            content: "''",
            position: 'absolute',
            background: borderColor,
            borderRadius: 10,
            width: '75%',
            height: 3,
            top: '40%',
            right: 0,
            transform: 'translate(-17%, -50%)',
            [theme.breakpoints.down('xs')]: {
                top: '30%',
            },
        },
        display: 'grid',
        gridTemplateColumns: 'repeat(5, auto)',
        maxWidth: '90%',
        margin: '0 auto',
        '& .step': {
            textAlign: 'center',
            position: 'relative',
            '& .imgIcon': {
                width: 98,
                padding: 10,
                backgroundColor: 'white',
                [theme.breakpoints.down('sm')]: {
                    width: 76,
                    padding: 5,
                },
                [theme.breakpoints.down('xs')]: {
                    width: 54,
                    padding: 2,
                },
            },
        },
        '& .step span': {
            color: colorBold,
            fontWeight: 700,
        },
        '& span': {
            width: '75%',
            display: 'block',
            margin: '0 auto',
        },
    },
    progressBarFail: {
        maxWidth: '90%',
        margin: '0 auto',
        '& .step': {
            textAlign: 'center',
            position: 'relative',
            '& .imgIcon': {
                width: 66,
            },
        },
        '& .step span': {
            color: colorBold,
            fontWeight: 700,
        },
        '& span': {
            width: '75%',
            display: 'block',
            margin: '0 auto',
        },
    },
    statusLabelActive: {
        color: colorBold,
        fontWeight: 600,
        alignItems: 'center',
    },
    statusLabelInactive: {
        color: borderColor,
        fontWeight: 600,
        alignItems: 'center',
    },
    printProgress: {
        textAlign: 'center',
    },
    fieldRoot: {
        verticalAlign: 'middle',
        height: 25,
        width: '100%',
        borderRadius: 20,
    },
    fieldInput: {
        height: 25,
        fontSize: 14,
        textAlign: 'right',
    },
    fieldRootPrice: {
        verticalAlign: 'middle',
        height: 25,
        width: '90%',
        borderRadius: 20,
    },
    fieldInputPrice: {
        height: 25,
        fontSize: 14,
        textAlign: 'right',
    },
    spanText: {
        display: 'block',
        margin: '20px 0 10px 0',
    },
    spanLabel: {
        display: 'inline-block',
        margin: '0 0 10px 0',
        position: 'relative',
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
    wrapperDialog: {
        '& .MuiDialog-paperWidthSm': {
            minWidth: 500,
        },
    },
    autocompleteRoot: {
        maxWidth: 200,
        width: '100%',
        verticalAlign: 'middle',
        marginBottom: 10,
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
        },
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 140px)',
        },
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
    dataSmallBlack: {
        fontFamily: font,
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        paddingLeft: 10,
    },
}));

export default useStyles;
