import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, TEXT_COLOR, TEXT_COLOR2, GRAY_LIGHT2,
    SUCCESS, ERROR, WHITE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    catalogBulkContainer: {
        paddingBottom: 10,
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 20,
            paddingRight: 20,
        },
    },
    boxParent: {
        margin: 0,
        width: '100%',
    },
    box: {
        boxShadow: 'none',
        border: `1px solid ${GRAY_LIGHT2}`,
        borderRadius: 8,
        padding: '30px 30px 40px 30px',
        height: '100%',
    },
    title: {
        color: PRIMARY_DARK,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 20,
    },
    text: {
        marginTop: 20,
        fontSize: 12,
        color: TEXT_COLOR2,
        marginBottom: 20,
        '&.primary': {
            marginTop: 0,
            color: PRIMARY,
        },
    },
    btn: {
        borderRadius: 5,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
        borderColor: PRIMARY,
        color: WHITE,
        padding: '9px 21px',
        height: 32,
        paddingLeft: 30,
        paddingRight: 35,
        fontSize: 13,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: PRIMARY,
            boxShadow: 'none',
            color: WHITE,
            borderColor: PRIMARY,
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
