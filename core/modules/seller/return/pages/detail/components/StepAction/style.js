import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, GRAY_LIGHT, GRAY_BG,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    actionContainer: {
        paddingTop: 20,
        textAlign: 'center',
    },
    btnAction: {
        background: PRIMARY,
        boxShadow: 'none',
        borderRadius: 6,
        border: '0px',
        padding: 6,
        width: 200,
        height: 42,
        '&:hover': {
            background: PRIMARY_DARK,
            boxShadow: 'none',
        },
        '&.outlined': {
            background: 'transparent',
            border: `1px solid ${PRIMARY}`,
            color: PRIMARY,
            '&:hover': {
                background: 'transparent',
                border: `1px solid ${PRIMARY_DARK}`,
                color: PRIMARY_DARK,
            },
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
    },
    helperText: {
        color: PRIMARY_DARK,
    },
    dialogContainer: {
        padding: '15px 20px',
        borderRadius: 8,
        position: 'relative',
        width: 600,
        overflowX: 'hidden',
    },
    dialogTitleContainer: {
        textAlign: 'center',
        color: PRIMARY_DARK,
        '& .MuiTypography-root': {
            fontWeight: 'bold',
        },
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        color: PRIMARY_DARK,
    },
    content: {
        color: PRIMARY_DARK,
        fontSize: 14,
        paddingRight: 0,
        paddingLeft: 0,
        '&.grid': {
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            alignItems: 'center',
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            },
        },
        '& .title': {
            fontWeight: 600,
        },
        marginBottom: 20,
        '&.button': {
            textAlign: 'center',
        },
        '&.MuiDialogContent-root': {
            overflowY: 'visible',
        },
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

        },
        '& .MuiInput-root.MuiAutocomplete-inputRoot': {
            borderBottom: 'none',
            paddingTop: 10,
            paddingBottom: 10,
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
        '& .MuiChip-root': {
            backgroundColor: 'transparent',
            border: `1px solid ${GRAY_LIGHT}`,
            borderRadius: 8,
        },
        '& .MuiChip-deleteIcon': {
            fill: PRIMARY_DARK,
        },
    },
}));

export default useStyles;
