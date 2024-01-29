import { makeStyles } from '@material-ui/core/styles';

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
