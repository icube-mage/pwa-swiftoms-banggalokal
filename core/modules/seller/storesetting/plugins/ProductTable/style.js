import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, TABLE_GRAY, GRAY_LIGHT,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    menuAction: {
        '& .MuiMenuItem-root': {
            fontSize: 13,
            color: PRIMARY_DARK,
        },
        '& .MuiMenu-list': {
            borderRadius: 6,
            background: TABLE_GRAY,
            marginTop: 5,
            border: `1px solid ${GRAY_LIGHT}`,
        },
    },
    arrowDown: {
        transition: 'all .2s linear',
        transform: 'rotate(90deg)',
    },
    arrowUp: {
        transition: 'all .2s linear',
        transform: 'rotate(-90deg)',
    },
}));

export default useStyles;
