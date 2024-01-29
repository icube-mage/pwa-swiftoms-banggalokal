import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY_DARK, WHITE, BOX_SHADOW,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    error: {
        color: '#000',
        height: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    wrapper: {
        background: WHITE,
        padding: 30,
        textAlign: 'center',
        borderRadius: 8,
        boxShadow: `0px 3px 15px ${BOX_SHADOW}`,
    },
    h2: {
        color: PRIMARY_DARK,
    },
}));

export default useStyles;
