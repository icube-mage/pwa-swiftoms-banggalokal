import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, TABLE_GRAY,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    imgContainer: {
        border: `1px solid ${TABLE_GRAY}`,
        marginBottom: 10,
        wordBreak: 'break-word',
        minWidth: 200,
    },
    img: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: 60,
    },
    price: {
        textDecoration: 'line-through',
    },
    discount: {
        color: PRIMARY,
        fontWeight: 'bold',
        fontSize: 15,
    },
    discPrice: {
        width: 'max-content',
    },
}));

export default useStyles;
