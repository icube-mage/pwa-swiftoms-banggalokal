import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: 50,
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 5,
        marginBottom: 15,
        [theme.breakpoints.down('sm')]: {
            paddingTop: 20,
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: 0,
            paddingLeft: 17,
            paddingRight: 17,
            alignItems: 'baseline',
        },
    },
    header: {
        color: PRIMARY_DARK,
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconButtonRoot: {
        padding: 0,
    },
    radioRoot: {
        padding: 0,
        color: PRIMARY,
    },
    radioCheckedRoot: {
        color: PRIMARY,
    },
    link: {
        color: PRIMARY,
    },
    switch: {
        margin: 0,
    },
}));

export default useStyles;
