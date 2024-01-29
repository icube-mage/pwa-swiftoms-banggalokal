import { makeStyles } from '@material-ui/core/styles';

const textColor = '#435179';
const titleFont = 'normal normal bold 30px/37px "Roboto", "Helvetica", "Arial", sans-serif';
const colorPurple = '#BE1F93';
const textFont = 'normal normal normal 14px/17px "Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';

const useStyles = makeStyles((theme) => ({
    paper: {
        borderRadius: 16,
    },
    textTitle: {
        padding: '24px 24px 10px 24px',
        textAlign: 'center',
        '& .MuiTypography-h6': {
            font: titleFont,
            color: textColor,
        },
        [theme.breakpoints.down('xs')]: {
            '& .MuiTypography-h6': {
                fontSize: '24px',
            },
        },
    },
    textTitleChild: {
        font: textFont,
        margin: 0,
        marginTop: 8,
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
    },
    contentCounter: {
        margin: 'auto',
        overflow: 'hidden',
        width: '100%',
        fontSize: '24px',
    },
    counterNumber: {
        fontSize: '24px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]: {
            fontSize: '18px',
        },
    },
    btn: {
        borderRadius: 27,
        boxShadow: 'none',
        border: '1px solid',
        borderColor: colorPurple,
        color: 'white',
        background: colorPurple,
        width: 167,
        height: 36,
        position: 'relative',
        fontSize: 18,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
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
    formField: {
        margin: '7px 0px',
    },
}));

export default useStyles;
