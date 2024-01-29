import { makeStyles } from '@material-ui/core/styles';

const iconFont = '#435179';

const useStyles = makeStyles(() => ({
    fieldInput: {
        '& .MuiInputBase-input': {
            padding: '8.5px 14px',
        },
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
    },
    loading: {
        display: 'flex',
        color: iconFont,
        fontWeight: 600,
        justifyContent: 'center',
        paddingTop: 20,
    },
}));

export default useStyles;
