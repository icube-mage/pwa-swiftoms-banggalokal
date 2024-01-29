import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY } from '@theme_color';

const useStyles = makeStyles(() => ({
    link: {
        color: PRIMARY,
        fontSize: 14,
        fontWeight: 600,
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    trash: {
        padding: 0,
    },
}));

export default useStyles;
