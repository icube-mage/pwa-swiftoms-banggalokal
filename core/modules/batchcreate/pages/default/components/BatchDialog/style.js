import { makeStyles } from '@material-ui/core/styles';

const textColor = '#435179';
const titleFont = 'normal normal bold 30px/37px "Roboto", "Helvetica", "Arial", sans-serif';
const colorPurple = '#BE1F93';
const textFont = 'normal normal normal 14px/17px "Roboto", "Helvetica", "Arial", sans-serif';

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
        margin: 'auto auto 8px auto',
        borderBottom: '1px solid lightgray',
        overflow: 'hidden',
        width: '28%',
        [theme.breakpoints.down('xs')]: {
            width: '40%',
        },
    },
    counter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px 10px',
        font: titleFont,
    },
    counterNumber: {
        color: textColor,
    },
    counterBtn: {
        cursor: 'pointer',
        '&:hover': {
            '& img': {
            },
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
        height: 55,
        position: 'relative',
        fontSize: 18,
        [theme.breakpoints.down('xs')]: {
            width: '65%',
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
}));

export default useStyles;
