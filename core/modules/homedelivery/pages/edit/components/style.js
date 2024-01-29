import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGray = '#B1BCDB';
const colorBold = '#435179';
const borderColor = '#DDE1EC';
const borderGray = '#E5E9F1';

const useStyles = makeStyles((theme) => ({
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
        margin: 0,
        [theme.breakpoints.down('sm')]: {
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
    titleDialog: {
        fontFamily: font,
        color: colorGray,
        fontSize: 16,
        textTransform: 'uppercase',
        margin: 0,
        paddingLeft: 15,
        fontWeight: 600,
    },
    formFieldButton: {
        margin: '0px 0 10px 0',
        '& .btnFormDialog': {
            borderRadius: 20,
            boxShadow: 'none',
            border: '1px solid',
            borderColor: colorPurple,
            background: '#FFFFFF',
            color: colorPurple,
            letterSpacing: 0,
            textTransform: 'capitalize',
            padding: '5px 25px',
            marginTop: 15,
            marginRight: 10,
        },
    },
    formFieldButton2: {
        margin: 0,
        '& button': {
            marginTop: 0,
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
        '&.print': {
            background: '#FFFFFF',
            color: colorPurple,
        },
        '&.Mui-disabled': {
            borderColor: 'rgba(0, 0, 0, 0.12)',
        },
    },
    contentHeader: {
        padding: '18px 15px',
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
        '& .spanHeader': {
            color: colorBold,
        },
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '18px 15px',
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
    contentPopUp: {
        padding: '0 15px 18px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 18,
        '& .content-history': {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            margin: '0 0 20px',
            '& p': {
                color: colorGray,
                margin: 0,
            },
            [theme.breakpoints.down('xs')]: {
                gridTemplateColumns: 'repeat(1, 1fr)',
            },
        },
        '& .description': {
            position: 'relative',
            width: 250,
        },
        '& .content-history:first-child .description::before': {
            backgroundColor: colorPurple,
            boxShadow: '0 0 0 4px #D49AEB',
        },
        '& .description::before': {
            content: "''",
            position: 'absolute',
            width: 9,
            height: 9,
            borderRadius: '50%',
            backgroundColor: colorGray,
            left: -30,
            top: 3,
            boxShadow: '0 0 0 4px #E5E7E9',
            zIndex: 2,
            [theme.breakpoints.down('xs')]: {
                top: -8,
            },
        },
        '& .description::after': {
            content: "''",
            position: 'absolute',
            left: -26,
            bottom: -20,
            width: 1,
            height: 'calc(100% + 5px)',
            borderLeft: 'thin dashed #D49AEB',
            zIndex: 1,
            [theme.breakpoints.down('xs')]: {
                bottom: -30,
                height: 'calc(100% + 28px)',
            },
        },
        '& .content-history:last-child .description::after': {
            display: 'none',
        },
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
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
        '&.status': {
            textTransform: 'capitalize',
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
            width: '65%',
            height: 3,
            top: '40%',
            right: 0,
            transform: 'translate(-27%, -50%)',
            [theme.breakpoints.down('sm')]: {
                top: '35%',
            },
            [theme.breakpoints.down('xs')]: {
                top: '45%',
            },
        },
        '&.progressBar-booked': {
            gridTemplateColumns: 'repeat(6, auto)',
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
                    width: 48,
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
    printProgress: {
        textAlign: 'center',
    },
    fieldRoot: {
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
        '& .MuiInputLabel-outlined': {
            transform: 'translate(10px, 10px)',
        },
        '& .MuiInputLabel-shrink': {
            transform: 'translate(14px, -6px) scale(0.75)',
        },
        '&.fieldNotes': {
            maxWidth: 'unset',
            width: '100%',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
        '&.newLine': {
            maxWidth: 'unset',
            width: '100%',
            display: 'block',
        },
    },
    fieldInput: {
        height: 36,
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colorText,
        },
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
    progressTitle: {
        color: colorBold,
        fontSize: 16,
        paddingTop: 10,
        [theme.breakpoints.down('xs')]: {
            fontSize: 14,
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
    progress: {
        color: `${colorPurple} !important`,
        position: 'absolute',
        left: '50%',
        marginLeft: -20,
        top: '50%',
        marginTop: -20,
    },
    courierLogo: {
        height: 'auto',
        width: 100,
        marginBottom: 10,
    },
}));

export default useStyles;
