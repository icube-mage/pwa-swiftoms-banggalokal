import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, WHITE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    link: {
        color: WHITE,
        cursor: 'pointer',
        backgroundColor: PRIMARY,
        padding: '9px 30px',
        borderRadius: 4,
        [theme.breakpoints.down('xs')]: {
            display: 'inline-block',
        },
    },
}));

export default useStyles;
