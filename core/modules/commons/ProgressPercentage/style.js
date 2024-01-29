import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY_DARK } from '@theme_color';

const useStyles = makeStyles(() => ({
    progress: {
        fontWeight: 600,
        color: PRIMARY_DARK,
        fontSize: 12,
    },
}));

export default useStyles;
