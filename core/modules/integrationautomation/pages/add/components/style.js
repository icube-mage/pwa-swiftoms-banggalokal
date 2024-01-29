import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    topSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
    formFieldButton: {
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            justifyContent: 'end',
            paddingRight: 20,
        },
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
        height: 10,
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
    btn: {
        borderRadius: 20,
    },
    container: {
        borderRadius: 16,
        borderTopLeftRadius: 0,
        boxShadow: 'none',
    },
}));

export default useStyles;
