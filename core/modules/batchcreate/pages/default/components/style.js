import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const colorText = '#435179';

const useStyles = makeStyles(() => ({
    container: {
        padding: '0 16px',
        borderRadius: 16,
        backgroundColor: 'unset',
        boxShadow: 'none',
    },
    content: {
        padding: '20px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
    progress: {
        color: colorPurple,
    },
    h2: {
        margin: 0,
        color: colorText,
        letterSpacing: 0,
        textAlign: 'center',
        '&.title': {
            fontSize: 22,
            marginBottom: 20,
        },
        '&.total': {
            fontSize: 30,
            color: colorPurple,
        },
        '&.totalDesc': {
            fontSize: 16,
        },
    },
    text: {
        fontSize: 14,
        color: colorText,
        textAlign: 'center',
        margin: '30px 0',
    },
    btn: {
        borderRadius: 27,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        borderColor: colorPurple,
        color: 'white',
        background: colorPurple,
        width: 370,
        height: 77,
        position: 'relative',
        fontSize: 18,
        justifyContent: 'left',
        paddingLeft: 26,
        '@media (max-width: 767px )': {
            width: '100%',
        },
        '&.MuiButton-contained.Mui-disabled': {
            borderColor: 'rgba(0, 0, 0, 0.12)',
        },
    },
    iconImg: {
        width: 32,
        height: 32,
        marginRight: 10,
        '@media (max-width: 767px )': {
            width: 24,
            height: 24,
        },
    },
    icon: {
        width: 37,
        height: 37,
        position: 'absolute',
        right: 5,
    },
    linkBack: {
        display: 'block',
        textDecoration: 'underline',
        color: colorPurple,
        marginTop: 80,
        marginBottom: 10,
    },
}));

export default useStyles;
