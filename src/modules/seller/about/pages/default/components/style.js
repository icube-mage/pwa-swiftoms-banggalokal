import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    BLACK, PRIMARY_DARK,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    divWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 10px',
        color: PRIMARY_DARK,
        borderRadius: 4,
        '& .div-info': {
            color: BLACK,
            fontWeight: 'bold',
            width: '90%',
            flex: '1 1 auto',
        },
        '&:hover': {
            cursor: 'pointer',
        },
        '& .icon': {
            width: 60,
        },
        '& .icon img': {
            width: 42,
            height: 42,
        },
    },
}));

export default useStyles;
