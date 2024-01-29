import { makeStyles } from '@material-ui/core/styles';
import { PURPLE } from '@theme_color';
import { FONT_ADMIN } from '@theme_typography';

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        paddingBottom: '32px',
        [theme.breakpoints.down('xs')]: {
            padding: 17,
            paddingBottom: 0,
        },
    },
    title: {
        ...FONT_ADMIN,
        display: 'inline',
        color: PURPLE,
        fontSize: 24,
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            margin: 0,
        },
    },
    buttonAdd: {
        display: 'inline',
        float: 'right',
        borderRadius: 20,
        textTransform: 'capitalize',
        [theme.breakpoints.down('xs')]: {
            float: 'left',
            marginTop: 7,
        },
    },
}));

export default useStyles;
