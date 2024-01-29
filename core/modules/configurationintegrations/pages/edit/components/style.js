import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY } from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    topSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
    container: {
        padding: '16px 0',
        borderRadius: 16,
        borderTopLeftRadius: 0,
        boxShadow: 'none',
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
        color: PRIMARY,
        fontFamily: font,
        display: 'inline-block',
    },
    formFieldButton: {
        padding: '5px 5px 13px 22px',
        gap: 10,
        display: 'flex',
        justifyContent: 'right',
    },
    btn: {
        borderRadius: 20,
    },
    tabs: {
        '& .MuiTab-root': {
            width: 'fit-content',
            backgroundColor: 'white',
            borderRadius: '8px 8px 0 0',
            marginRight: '1%',
            marginLeft: 0,
        },
    },
    divider: {
        height: 30,
    },
}));

export default useStyles;
