import { makeStyles } from '@material-ui/core/styles';
import { WHITE, PRIMARY, GRAY_LIGHT } from '@theme_color';
import { Centering } from '@theme_mixins';

const useStyles = makeStyles((theme) => ({
    caraousel: {
        display: 'block',
        position: 'relative',
        [theme.breakpoints.up('sm')]: {
            height: 'auto',
        },
        '@media (max-width: 768px )': {
            padding: 10,
        },
    },
    dots: {
        zIndex: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        left: '0',
        '@media (max-width: 768px )': {
            left: '10px',
        },
    },
    dotsItem: {
        width: 7,
        height: 7,
        borderRadius: 100,
        backgroundColor: GRAY_LIGHT,
        margin: 3,
        cursor: 'pointer',
    },
    dotActive: {
        backgroundColor: PRIMARY,
    },
    hide: {
        display: 'none',
    },
    imageSlider: {
        display: 'flex',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            height: 'auto',
        },
    },
    imageSliderAuto: {
        [theme.breakpoints.up('sm')]: {
            width: 'auto !important',
        },
    },
    thumborContainer: {
        backgroundColor: '#eee',
        width: '100%',
        position: 'relative',
        paddingTop: '116%',
        [theme.breakpoints.up('sm')]: {
            height: 'auto',
            paddingTop: 0,
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: WHITE,
        },
    },
    thumborImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        [theme.breakpoints.up('sm')]: {
            height: 'auto',
            position: 'unset',
        },
    },

    arrow: {
        fontSize: '1rem',
        backgroundColor: GRAY_LIGHT,
        position: 'absolute',
        color: 'white',
        ...Centering,
        display: 'flex',
        textAlign: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10,
        borderRadius: '50%',
        paddingLeft: 9,
        top: 'calc(50% - 15px)',
        width: 30,
        height: 30,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: PRIMARY,
            color: WHITE,
            transition: 'all .2s',
        },
        '@media (max-width: 768px )': {
            display: 'none',
        },
    },
    leftArrow: {
        left: '20px',
    },

    rightArrow: {
        right: '20px',
    },
}));

export default useStyles;
