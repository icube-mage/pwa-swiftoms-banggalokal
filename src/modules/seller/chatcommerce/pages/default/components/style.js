import makeStyles from '@material-ui/core/styles/makeStyles';
import { PURPLE } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    sellerHomeContainer: {
        paddingBottom: 30,
        [theme.breakpoints.down('xs')]: {
            marginTop: -15,
        },
    },
    sellerBoxDashboard: {
        marginTop: -20,
        [theme.breakpoints.down('xs')]: {
            marginTop: -30,
        },
    },
    boxContainer: {
        marginTop: -25,
        padding: '0 20px',
        [theme.breakpoints.down('xs')]: {
            marginTop: 0,
        },
    },
    box: {
        backgroundColor: 'white',
        position: 'relative',
        padding: '15px 27px 0 27px',
        height: 150,
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& .indicator': {
            display: 'block',
            backgroundColor: PURPLE,
            height: 6,
            width: '80%',
            position: 'absolute',
            bottom: 0,
            borderRadius: '4px 4px 0 0',
            left: '50%',
            transform: 'translateX(-50%)',
        },
        '& .label': {
            fontSize: 13,
            fontWeight: '600',
            opacity: 0.9,
            textAlign: 'center',
        },
        '& img': {
            maxWidth: 100,
            marginBottom: 12,
        },
        [theme.breakpoints.down('md')]: {
            padding: 27,
            minHeight: 200,
        },
    },
    boxBanner: {
        backgroundColor: 'white',
        position: 'relative',
        borderRadius: 6,
        top: 60,
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            top: 0,
        },
        '& img': {
            position: 'absolute',
            top: -40,
            [theme.breakpoints.down('xs')]: {
                width: 200,
                position: 'static',
                margin: '20px 0',
            },
        },
        '& .content': {
            display: 'flex',
            '& span': {
                flex: 0.5,
                [theme.breakpoints.down('xs')]: {
                    display: 'none',
                },
                [theme.breakpoints.down('md')]: {
                    flex: 1,
                },
            },
            '& .content-text': {
                flex: 1,
                [theme.breakpoints.down('xs')]: {
                    padding: '0 20px',
                },
                '& .title': {
                    fontSize: 16,
                    fontWeight: 'bold',
                },
                '& ul li': {
                    fontSize: 13,
                    fontWeight: '400',
                },
                '& ul ': {
                    paddingInlineStart: 20,
                },
            },
        },
    },
}));

export default useStyles;
