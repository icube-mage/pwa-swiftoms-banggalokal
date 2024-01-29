import { makeStyles } from '@material-ui/core/styles';

const bgRed = '#FFDFDF';
const borderRed = '#D80000';
const bgYellow = '#FFF9E2';
const borderYellow = '#FFCD04';
const bgGreen = '#EBFFE2';
const borderGreen = '#51C519';
const bgBlack = '#000';
const borderBlack = '#435179';
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
        padding: 5,
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('xs')]: {
            padding: '2px 10px',
            width: 'fit-content',
        },
    },
    statusProcessing: {
        backgroundColor: bgYellow,
        border: '1px solid',
        borderColor: borderYellow,
        borderRadius: 20,
        color: borderYellow,
        textAlign: 'center',
        padding: 5,
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('xs')]: {
            padding: '2px 10px',
            width: 'fit-content',
        },
    },
    statusSuccess: {
        backgroundColor: bgGreen,
        border: '1px solid',
        borderColor: borderGreen,
        borderRadius: 20,
        color: borderGreen,
        textAlign: 'center',
        padding: 5,
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('xs')]: {
            padding: '2px 10px',
            width: 'fit-content',
        },
    },
    statusClosed: {
        backgroundColor: bgBlack,
        border: '1px solid',
        borderColor: borderBlack,
        borderRadius: 20,
        color: '#ffffff',
        textAlign: 'center',
        padding: 5,
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('xs')]: {
            padding: '2px 10px',
            width: 'fit-content',
        },
    },
    statusAllocating: {
        backgroundColor: bgBlue,
        border: '1px solid',
        borderColor: borderBlue,
        borderRadius: 20,
        color: borderBlue,
        textAlign: 'center',
        padding: 5,
        whiteSpace: 'nowrap',
        [theme.breakpoints.down('xs')]: {
            padding: '2px 10px',
            width: 'fit-content',
        },
    },
    fieldInputFilter: {
        '& .MuiInputBase-input': {
            padding: '8.5px 14px',
        },
    },
}));

export default useStyles;
