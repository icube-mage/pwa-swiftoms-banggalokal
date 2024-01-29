import { makeStyles } from '@material-ui/core/styles';
import { GRAY_LIGHT } from '@theme_color';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
    },
    img: {
        width: 24,
        height: 24,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundOrigin: 'content-box',
        backgroundPosition: 'center',
        '&.radius': {
            borderRadius: 6,
            border: `1px solid ${GRAY_LIGHT}`,
        },
    },
    imgIcon: {
        width: 20,
        height: 20,
    },
}));

export default useStyles;
