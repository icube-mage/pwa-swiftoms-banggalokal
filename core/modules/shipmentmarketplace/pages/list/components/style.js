import { makeStyles } from '@material-ui/core/styles';

const colorYellow = '#FFD52C';
const colorOrange = '#FF962C';
const colorGreen = '#5EC929';
const colorAqua = '#29c3c9';
const colorBlue = '#2689ca';
const colorRed = '#d6676a';
const varPadding = '5px 10px';
const iconFont = '#435179';

const useStyles = makeStyles((theme) => ({
    statusYellow: {
        backgroundColor: colorYellow,
        border: '1px solid',
        borderColor: colorYellow,
        borderRadius: 20,
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
        padding: varPadding,
    },
    statusOrange: {
        backgroundColor: colorOrange,
        border: '1px solid',
        borderColor: colorOrange,
        borderRadius: 20,
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
        padding: varPadding,
    },
    statusGreen: {
        backgroundColor: colorGreen,
        border: '1px solid',
        borderColor: colorGreen,
        borderRadius: 20,
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
        padding: varPadding,
    },
    statusBlue: {
        backgroundColor: colorBlue,
        border: '1px solid',
        borderColor: colorBlue,
        borderRadius: 20,
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
        padding: varPadding,
    },
    statusRed: {
        backgroundColor: colorRed,
        border: '1px solid',
        borderColor: colorRed,
        borderRadius: 20,
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
        padding: varPadding,
    },
    statusAqua: {
        backgroundColor: colorAqua,
        border: '1px solid',
        borderColor: colorAqua,
        borderRadius: 20,
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
        padding: varPadding,
    },
    statusRow: {
        display: 'flex',
        color: iconFont,
        fontWeight: 600,
        alignItems: 'center',
        '&.unbold': {
            fontWeight: 'unset',
        },
    },
    statusIcon: {
        width: 36,
        height: 'auto',
        marginRight: 12,
        [theme.breakpoints.down('xs')]: {
            width: 30,
            marginRight: 5,
        },
    },
    loading: {
        display: 'flex',
        color: iconFont,
        fontWeight: 600,
        justifyContent: 'center',
        paddingTop: 20,
    },
    input: {
        paddingTop: '8.5px',
        paddingBottom: '8.5px',
        textTransform: 'capitalize',
    },
    fieldInput: {
        '& .MuiInputBase-input': {
            padding: '8.5px 14px',
        },
    },
}));

export default useStyles;
