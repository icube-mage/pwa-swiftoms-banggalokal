import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, GRAY_LIGHT, TABLE_GRAY, WHITE, PRIMARY_DARK,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        boxShadow: 'none',
        padding: '15px 20px',
        borderRadius: 8,
        marginTop: 20,
        border: `1px solid ${GRAY_LIGHT}`,
    },
    gridContainer: {
        alignItems: 'center',
        width: '100%',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 13,
        '&.big': {
            fontSize: 15,
        },
    },
    bankImg: {
        width: 102,
        height: 50,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundOrigin: 'content-box',
        backgroundPosition: 'center',
        display: 'flex',
        padding: 12,
        justifyContent: 'center',
        '& .bank-place': {
            width: 24,
            height: 24,
        },
        marginLeft: 10,
        border: `1px solid ${TABLE_GRAY}`,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 20,
        },
    },
    btn: {
        backgroundColor: WHITE,
        color: PRIMARY,
        border: `1px solid ${PRIMARY}`,
        boxShadow: 'none',
        fontWeight: 600,
        fontSize: 13,
        padding: '6px 12px',
        margin: 0,
        marginRight: 5,
        minHeight: 34,
        width: '100%',
        '& .icon': {
            display: 'flex',
            borderRadius: '50%',
            width: 13,
            height: 13,
            backgroundColor: WHITE,
            color: PRIMARY,
            border: `1px solid ${PRIMARY}`,
            marginRight: 5,
            transition: 'background-color 250ms',
        },
        '& .MuiSvgIcon-root': {
            width: 11,
            height: 11,
        },
        '&:hover': {
            backgroundColor: PRIMARY,
            color: WHITE,
            boxShadow: 'none',
            borderColor: PRIMARY,
            '& .icon': {
                backgroundColor: PRIMARY,
                color: WHITE,
                border: `1px solid ${WHITE}`,
            },
        },
        '&.primary': {
            backgroundColor: PRIMARY,
            color: WHITE,
            boxShadow: 'none',
            borderColor: PRIMARY,
            '&:hover': {
                backgroundColor: PRIMARY_DARK,
                color: WHITE,
                boxShadow: 'none',
                borderColor: PRIMARY_DARK,
            },
        },
        '& .MuiButton-label': {
            alignItems: 'baseline',
        },
    },
    buttonDefault: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '10px',
        marginRight: 40,
        '@media (max-width: 1500px)': {
            marginRight: 0,
        },
        '@media (max-width: 1252px)': {
            marginRight: 0,
            flexDirection: 'column',
        },
        '@media (max-width: 1450px)': {
            marginRight: 0,
            flexDirection: 'column',
        },
        '@media (max-width: 1023px)': {
            marginRight: 0,
            flexDirection: 'row',
        },
        '@media (max-width: 374px)': {
            marginRight: 0,
            flexDirection: 'column',
        },
    },
    default: {
        '@media (max-width: 1252px)': {
            display: 'grid',
        },
        '@media (max-width: 1450px)': {
            display: 'grid',
        },
    },
    remove: {
        marginLeft: 20,
        '@media (max-width: 1450px)': {
            marginLeft: 0,
            marginTop: 10,
            display: 'grid',
        },
        '@media (max-width: 1252px)': {
            marginLeft: 0,
            marginTop: 10,
            display: 'grid',
        },
        '@media (max-width: 1023px)': {
            marginLeft: 20,
            marginTop: 0,
        },
        '@media (max-width: 374px)': {
            marginLeft: 0,
            marginTop: 10,
        },
    },
    radio: {
        color: PRIMARY,
        '& .MuiSvgIcon-root': {
            width: 24,
            height: 24,
        },
        '&.MuiRadio-colorSecondary.Mui-checked': {
            color: `${PRIMARY} !important`,
        },
    },
}));

export default useStyles;
