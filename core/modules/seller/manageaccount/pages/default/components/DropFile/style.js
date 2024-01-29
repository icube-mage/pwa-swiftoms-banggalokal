import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, PRIMARY,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    btn: {
        background: PRIMARY,
        borderRadius: 7,
        padding: 6,
        width: '100%',
        height: 42,
        '&:hover': {
            background: PRIMARY_DARK,
        },
    },
    btnText: {
        fontSize: 15,
    },
}));

export default useStyles;
