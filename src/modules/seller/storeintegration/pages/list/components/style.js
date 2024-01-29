import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY_DARK, PURPLE } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: 20,
        [theme.breakpoints.down('xs')]: {
            marginBottom: 80,
        },
        '& .MuiAlert-root': {
            [theme.breakpoints.down('xs')]: {
                marginLeft: 10,
                marginRight: 10,
            },
        },
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        columnGap: 10,
        [theme.breakpoints.down('sm')]: {
            paddingTop: 20,
        },
        [theme.breakpoints.down('xs')]: {
            paddingTop: 15,
            paddingLeft: 10,
            paddingRight: 10,
        },
    },
    header: {
        color: PRIMARY_DARK,
        fontSize: 16,
        fontWeight: 'bold',
    },
    noText: {
        display: 'flex',
        color: PRIMARY_DARK,
        fontWeight: 600,
        justifyContent: 'center',
        padding: '20px 0',
        marginTop: 150,
    },
    tabsContainer: {
        marginBottom: 20,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 10,
            marginRight: 10,
        },
    },
    inputField: {
        border: '1px #d2d2d2 solid',
        padding: 10,
        borderRadius: 5,
    },
    iconDomain: {
        width: 20,
        marginRight: 10,
        position: 'relative',
        top: 5,
    },
    btnGrey: {
        color: PURPLE,
        background: '#f5f5f5',
        padding: 5,
        borderRadius: 5,
        fontWeight: 600,
        marginLeft: 10,
        fontSize: 15,
        border: 'transparent',
        cursor: 'Pointer',
        marginTop: 10,
    },
    inputUrl: {
        border: 'transparent',
        borderBottom: '1px #d2d2d2 solid',
        padding: 5,
        fontSize: 15,
        margin: 5,
        maxWidth: 120,
        minWidth: 90,
        fontWeight: 600,
    },
    link: {
        color: PURPLE,
    },
    errorAlert: {
        color: '#e32525',
        fontSize: 13,
        background: '#fff9f9',
        padding: 10,
        borderRadius: 5,
    },
    icon: {
        width: 32,
        height: 32,
        position: 'relative',
        top: 9,
        border: '1px #ddd solid',
        padding: 5,
        borderRadius: 20,
    },
    selectParent: {
        cursor: 'pointer',
        paddingBottom: 15,
        '&:hover': {
            fontWeight: 600,
        },
    },
}));

export default useStyles;
