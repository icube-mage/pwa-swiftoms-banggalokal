import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY } from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 16,
        paddingTop: 0,
        borderRadius: 16,
        margin: '20px 0',
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
    topPage: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: 10,
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
    buttonSave: {
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            justifyContent: 'end',
        },
    },
    titleTop: {
        fontSize: 24,
        color: PRIMARY,
        fontFamily: font,
        display: 'inline-block',
    },
    button: {
        borderRadius: 20,
    },
    divider: {
        height: 20,
    },
}));

export default useStyles;
