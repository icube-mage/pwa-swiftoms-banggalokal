import { makeStyles } from '@material-ui/core/styles';

const bgRed = '#FFDFDF';
const borderRed = '#D80000';
const bgYellow = '#FFF9E2';
const borderYellow = '#FFCD04';
const bgGreen = '#EBFFE2';
const borderGreen = '#51C519';
const bgBlack = '#3c3f47';
const borderBlack = '#435179';
const bgBlue = '#e2edff';
const borderBlue = '#2f6bcc';

const useStyles = makeStyles(() => ({
    statusFailed: {
        backgroundColor: bgRed,
        border: '1px solid',
        borderColor: borderRed,
        borderRadius: 20,
        color: borderRed,
        textAlign: 'center',
    },
    statusProcessing: {
        backgroundColor: bgYellow,
        border: '1px solid',
        borderColor: borderYellow,
        borderRadius: 20,
        color: borderYellow,
        textAlign: 'center',
    },
    statusSuccess: {
        backgroundColor: bgGreen,
        border: '1px solid',
        borderColor: borderGreen,
        borderRadius: 20,
        color: borderGreen,
        textAlign: 'center',
    },
    statusClosed: {
        backgroundColor: bgBlack,
        border: '1px solid',
        borderColor: borderBlack,
        borderRadius: 20,
        color: '#ffffff',
        textAlign: 'center',
    },
    statusAllocating: {
        backgroundColor: bgBlue,
        border: '1px solid',
        borderColor: borderBlue,
        borderRadius: 20,
        color: borderBlue,
        textAlign: 'center',
    },
}));

export default useStyles;
