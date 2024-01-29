import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, GRAY_LIGHT,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    dialogContainer: {
        padding: 30,
        borderRadius: 8,
        position: 'relative',
    },
    dialogTitleContainer: {
        color: PRIMARY_DARK,
        '& .MuiTypography-root': {
            fontWeight: 'bold',
        },
    },
    infoDiv: {
        border: `1px solid ${GRAY_LIGHT}`,
        borderRadius: 6,
        padding: 10,
    },
    img: {
        height: 50,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundOrigin: 'content-box',
        backgroundPosition: 'center',
        display: 'flex',
    },
    content: {
        color: PRIMARY_DARK,
        fontSize: 14,
        padding: 0,
        '& .title': {
            fontWeight: 600,
            marginBottom: 10,
        },
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '0em',
            height: '.4em',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 2px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: GRAY_LIGHT,
            borderRadius: 5,
        },
        '&.MuiDialogContent-root': {
            overflowY: 'visible',
        },
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        color: PRIMARY_DARK,
    },
    containerBtn: {
        marginTop: 20,
        textAlign: 'end',
    },
    btn: {
        borderRadius: 6,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        borderColor: PRIMARY,
        padding: '12px 30px',
        height: 42,
        fontSize: 15,
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '&.disabled': {
            background: GRAY_LIGHT,
            color: 'white',
            borderColor: GRAY_LIGHT,
            '&.MuiButton-contained:hover.Mui-disabled': {
                background: GRAY_LIGHT,
                color: 'white',
                borderColor: GRAY_LIGHT,
            },
            '&.MuiButtonBase-root.Mui-disabled': {
                pointerEvents: 'unset',
                cursor: 'not-allowed',
            },
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 12,
            marginTop: 10,
            padding: '8px 15px',
            width: '100%',
        },
    },
}));

export default useStyles;
