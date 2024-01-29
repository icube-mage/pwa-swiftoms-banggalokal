import { makeStyles } from '@material-ui/core/styles';

const colorYellow = '#FFD52C';
const colorOrange = '#FF962C';
const colorGreen = '#5EC929';
const colorAqua = '#29c3c9';
const colorBlue = '#2689ca';
const varPadding = '0 10px';
const iconFont = '#435179';

const useStyles = makeStyles(() => ({
    process: {
        backgroundColor: colorYellow,
        border: '1px solid',
        borderColor: colorYellow,
        borderRadius: 20,
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
        padding: varPadding,
    },
    readyPack: {
        backgroundColor: colorOrange,
        border: '1px solid',
        borderColor: colorOrange,
        borderRadius: 20,
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
        padding: varPadding,
    },
    readyPickup: {
        backgroundColor: colorGreen,
        border: '1px solid',
        borderColor: colorGreen,
        borderRadius: 20,
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
        padding: varPadding,
    },
    customerPicked: {
        backgroundColor: colorBlue,
        border: '1px solid',
        borderColor: colorBlue,
        borderRadius: 20,
        color: '#ffffff',
        textAlign: 'center',
        width: '100%',
        padding: varPadding,
    },
    waiting: {
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
        marginRight: 8,
    },
}));

export default useStyles;
