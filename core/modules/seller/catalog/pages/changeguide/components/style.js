import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY_DARK } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .left': {
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
        },
        marginBottom: 20,
    },
    title: {
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 0,
        '&.paper': {
            marginBottom: 30,
        },
    },
    imgDiv: {
        display: 'flex',
        justifyContent: 'center',
    },
    contentWithoutBorder: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        padding: '10px 29px 12px 22px',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    imgImage: {
        width: '100%',
        maxWidth: 800,
    },
    ulChild: {
        listStyleType: 'lower=alpha',
    },
}));

export default useStyles;
