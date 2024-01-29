import { makeStyles } from '@material-ui/core/styles';
import {
    GRAY_BG, PRIMARY_DARK,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        height: '100%',
        backgroundColor: GRAY_BG,
    },
    titleContainer: {
        marginTop: 60,
        '& .center': {
            textAlign: 'center',
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: 30,
        },
    },
    textTitle: {
        fontSize: 30,
        color: PRIMARY_DARK,
        fontWeight: 'bold',
    },
    header: {
        [theme.breakpoints.down('xs')]: {
            width: 296,
            margin: '10px auto 0',
        },
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containLeft: {
        [theme.breakpoints.up('sm')]: {
            width: '40%',
            float: 'left',
            paddingTop: 26,
            marginLeft: '5%',
            height: '115vmin',
            overflow: 'scroll',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
                width: 0,
                background: 'transparent',
            },
        },
        [theme.breakpoints.up('md')]: {
            height: '100vh',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginLeft: 0,
            paddingTop: 10,
        },
    },
    containRight: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
        width: '49%',
        float: 'right',
        height: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    content: {
        marginTop: 20,
        [theme.breakpoints.up('sm')]: {
            margin: '0 5%',
        },
        [theme.breakpoints.up('md')]: {
            margin: '0 9%',
        },
        [theme.breakpoints.up('lg')]: {
            margin: '0 25%',
        },
        [theme.breakpoints.down('xs')]: {
            margin: '20px auto',
            maxWidth: 280,
        },
    },
}));

export default useStyles;
