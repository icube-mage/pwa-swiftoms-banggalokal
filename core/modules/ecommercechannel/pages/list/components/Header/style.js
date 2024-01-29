import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        paddingBottom: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 17,
            paddingRight: 17,
        },
    },
    title: {
        display: 'inline',
        color: colorPurple,
        fontFamily: font,
        fontSize: 24,
    },
    fieldInput: {
        '& .MuiInputBase-input': {
            padding: '8.5px 14px',
        },
        borderRadius: 20,
        width: '100%',
        minWidth: 400,
        [theme.breakpoints.down('sm')]: {
            width: 'unset',
            minWidth: 'unset',
        },
        '&.MuiInput-underline:before': {
            display: 'none',
        },
        '&.MuiInput-underline:after': {
            display: 'none',
        },
    },
    search: {
        border: '1px solid',
        borderColor: '#B1BCDB',
        borderRadius: 20,
        backgroundColor: 'white',
        width: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        },
        display: 'flex',
        flexDirection: 'row',
        height: 36,
    },
    searchIcon: {
        paddingLeft: 16,
        height: '100%',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1,
        color: colorPurple,
    },
}));

export default useStyles;
