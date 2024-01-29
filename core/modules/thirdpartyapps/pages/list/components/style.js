import { makeStyles } from '@material-ui/core/styles';

const bgRed = '#FFDFDF';
const borderRed = '#D80000';
const bgGreen = '#EBFFE2';
const borderGreen = '#51C519';
const bgGray = '#DDE1EC';
const borderGray = '#435179';

const useStyles = makeStyles(() => ({
    fieldInputFilter: {
        '& .MuiInputBase-input': {
            padding: '8.5px 14px',
        },
    },
    statusContainer: {
        textTransform: 'capitalize',
        border: '1px solid',
        borderRadius: 20,
        textAlign: 'center',
        padding: '2px 10px',
        '&.green': {
            backgroundColor: bgGreen,
            borderColor: borderGreen,
            color: borderGreen,
        },
        '&.gray': {
            backgroundColor: bgGray,
            borderColor: borderGray,
            color: borderGray,
        },
        '&.red': {
            backgroundColor: bgRed,
            borderColor: borderRed,
            color: borderRed,
        },
    },
}));

export default useStyles;
