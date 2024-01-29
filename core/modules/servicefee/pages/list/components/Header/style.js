import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY } from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        paddingBottom: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            paddingBottom: 0,
            display: 'unset',
        },
    },
    title: {
        color: PRIMARY,
        fontFamily: font,
        fontSize: 24,
        margin: 0,
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 17,
        },
    },
}));

export default useStyles;
