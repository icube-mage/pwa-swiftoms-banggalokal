import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, GRAY_BG, GRAY_LIGHT, ERROR,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    root: {
        padding: 20,
        border: '1px solid',
        borderColor: GRAY_LIGHT,
        borderRadius: '8px !important',
        boxShadow: 'none !important',
        '&.errors': {
            borderColor: ERROR,
        },
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 !important',
        marginBottom: 9,
        '& .MuiCardContent-root': {
            padding: 0,
        },
    },
    contentAction: {
        display: 'block',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    imgBack: {
        width: 80,
        height: 80,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    },
    childContent: {
        '&.MuiCardContent-root:last-child': {
            paddingBottom: 0,
        },
    },
    error: {
        color: ERROR,
        fontSize: '0.75rem',
        marginTop: 10,
    },
    textInput: {
        width: '100%',
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            backgroundColor: GRAY_BG,
            borderRadius: 6,
            padding: '5px 10px',
            height: 30,

        },
        '& .MuiInputBase-root.Mui-disabled': {
            backgroundColor: '#c4cfed',
        },
        '& .MuiInputBase-input.Mui-disabled': {
            cursor: 'not-allowed',
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
        '&.adorn': {
            '& .MuiInput-root': {
                padding: 0,
            },
        },
    },
    adornment: {
        backgroundColor: GRAY_LIGHT,
        padding: '15px 10px',
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        '& .MuiTypography-root': {
            color: PRIMARY_DARK,
            fontSize: 13,
            fontWeight: 'bold',
        },
    },
}));

export default useStyles;
