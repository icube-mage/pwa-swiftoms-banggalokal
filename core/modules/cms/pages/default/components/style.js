import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    titleCenter: {
        fontSize: 30,
        color: PRIMARY_DARK,
        fontWeight: 'bold',
    },
    cmsContainer: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 20px',
    },
}));

export default useStyles;
