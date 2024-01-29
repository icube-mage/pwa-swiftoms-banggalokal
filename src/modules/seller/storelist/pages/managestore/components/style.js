import { makeStyles } from '@material-ui/core/styles';
import { BORDER_COLOR } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('xs')]: {
            padding: 10,
        },
        marginBottom: 50,
    },
    tabsContainer: {
        border: `1px solid ${BORDER_COLOR}`,
        marginBottom: 20,
        borderRadius: 6,

    },
    rootPaper: {
        padding: 30,
        [theme.breakpoints.down('xs')]: {
            padding: 20,
        },
        boxShadow: 'none',
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: 6,
    },
}));

export default useStyles;
