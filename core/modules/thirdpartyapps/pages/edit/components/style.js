import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY } from '@root/core/theme/colors';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGray = '#B1BCDB';

const bgRed = '#FFDFDF';
const borderRed = '#D80000';
const bgGreen = '#EBFFE2';
const borderGreen = '#51C519';
const bgGray = '#DDE1EC';
const borderGray = '#435179';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '16px 0',
        borderRadius: 16,
        marginBottom: 20,
    },
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px',
        minWidth: 'unset',
        height: 36,
        width: 42,
        marginBottom: 6,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 18,
        },
    },
    titleTop: {
        fontSize: 24,
        [theme.breakpoints.down('xs')]: {
            fontSize: 20,
        },
        color: PRIMARY,
        fontFamily: font,
        display: 'inline-block',
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
    formField: {
        padding: 0,
        paddingBottom: 16,
        display: 'grid',
        gridTemplateColumns: '20% 78% 2%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
        '&.mt10': {
            marginBottom: 10,
        },
    },
    formFieldButton: {
        padding: '24px 29px 14px 22px',
    },
    btn: {
        borderRadius: 20,
        marginRight: 10,
    },
    divLabel: {
        width: 300,
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            width: 140,
        },
    },
    label: {
        color: colorText,
        fontFamily: font,
        position: 'relative',
    },
    labelRequired: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -9,
            right: -9,
            color: PRIMARY,
            fontSize: 20,
        },
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 29px 12px 22px',
    },
    fieldRoot: {
        width: '100%',
        verticalAlign: 'middle',
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: 20,
        height: 36,
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            height: 0,
        },
    },
    autocompleteRoot: {
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            height: 36,
            padding: '0 9px',
        },
    },
    statusContainer: {
        textTransform: 'capitalize',
        border: '1px solid',
        borderRadius: 20,
        textAlign: 'center',
        maxWidth: 200,
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
