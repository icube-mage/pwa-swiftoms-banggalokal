import { makeStyles } from '@material-ui/core/styles';
import { DISABLED, BORDER_TEXT } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    borderContainer: {
        border: `1px solid ${DISABLED}`,
        marginTop: 10,
        padding: 10,
    },
    button: {
        borderRadius: 20,
    },
    actionContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
        '& .btn': {
            display: 'flex',
            gap: 10,
            alignItems: 'center',
        },
        '& .field': {
            [theme.breakpoints.down('sm')]: {
                marginTop: 10,
            },
            gap: 10,
            display: 'flex',
            alignItems: 'center',
        },
    },
    fieldRoot: {
        width: '40%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        verticalAlign: 'middle',
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            padding: '7px 14px',
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: BORDER_TEXT,
        borderRadius: 20,
        height: 36,
    },
    divider: {
        height: 20,
    },
}));

export default useStyles;
