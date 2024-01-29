import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, TEXT_COLOR, GRAY_LIGHT, SECONDARY,
    SUCCESS, ERROR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        boxShadow: '0px 3px 15px #4D2F821A',
        padding: 30,
        paddingBottom: 50,
        borderRadius: 8,
        marginBottom: 40,
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        '& .MuiIconButton-root': {
            padding: 0,
            paddingRight: 10,
        },
        '& .MuiSvgIcon-root': {
            fill: PRIMARY_DARK,
            height: 30,
            width: 'auto',
        },
        '& .MuiIconButton-root:hover': {
            background: 'none',
        },
        marginBottom: 20,
        '& .title': {
            color: PRIMARY_DARK,
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 0,
            marginBottom: 0,
        },
    },
    title: {
        color: PRIMARY_DARK,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 20,
    },
    text: {
        marginTop: 20,
        fontSize: 13,
        color: TEXT_COLOR,
        marginBottom: 20,
        '&.primary': {
            marginTop: 0,
            color: PRIMARY,
        },
    },
    boxParent: {
        margin: 0,
        width: '100%',
    },
    box: {
        boxShadow: 'none',
        border: `1px solid ${GRAY_LIGHT}`,
        borderRadius: 8,
        padding: 20,
        height: '100%',
    },
    btn: {
        borderRadius: 8,
        background: 'white',
        boxShadow: 'none',
        textTransform: 'capitalize',
        borderColor: PRIMARY,
        color: PRIMARY,
        padding: '9px 21px',
        height: 42,
        fontSize: 13,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: 'white',
            boxShadow: 'none',
            color: SECONDARY,
            borderColor: SECONDARY,
        },
        [theme.breakpoints.down('md')]: {
            minHeight: 42,
        },
        '&.primary': {
            background: PRIMARY,
            borderColor: 'transparent',
            color: 'white',
            '&:hover': {
                backgroundColor: PRIMARY_DARK,
                boxShadow: 'none',
                color: 'white',
                borderColor: 'transparent',
            },
        },
    },
    centering: {
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 600,
        marginBottom: 20,
        '&.success': {
            color: SUCCESS,
        },
        '&.error': {
            color: ERROR,
        },
        '&.noflex': {
            textAlign: 'center',
            display: 'block',
        },
    },
    btnContainer: {
        textAlign: 'center',
    },
    filename: {
        fontSize: 13,
        color: TEXT_COLOR,
        textAlign: 'center',
    },
    progress: {
        fontWeight: 600,
        color: PRIMARY_DARK,
        fontSize: 12,
    },
}));

export default useStyles;
