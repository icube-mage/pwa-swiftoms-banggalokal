import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, GRAY_LIGHT, GRAY_BG, TEXT_COLOR,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    link: {
        color: PRIMARY,
        fontSize: 14,
        fontWeight: 600,
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    dialogContainerRoot: {
        overflowX: 'hidden',
        '& .MuiDialog-paperScrollPaper': {
            '&::-webkit-overflow-scrolling': 'touch',
            '&::-webkit-scrollbar': {
                height: '.5em',
                width: '.5em',
            },
            '&::-webkit-scrollbar-track': {
                '-webkit-box-shadow': 'inset 0 0 2px rgba(0,0,0,0.00)',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: TEXT_COLOR,
                borderRadius: 5,
            },
        },
    },
    dialogContainer: {
        padding: '15px 20px',
        borderRadius: 8,
        position: 'relative',
        width: 500,
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
        '& .title': {
            fontWeight: 600,
            marginBottom: 10,
        },
        borderBottom: `1px solid ${GRAY_LIGHT}`,
        marginBottom: 20,
        '&.last': {
            borderBottom: '0px',
        },
        '&.button': {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            borderBottom: '0px',
        },
        '& .required': {
            '&::after': {
                content: "'*'",
                display: 'block',
                position: 'absolute',
                top: -3,
                right: -8,
                color: PRIMARY,
                fontSize: 14,
            },
        },
        '&.MuiDialogContent-root': {
            overflowY: 'visible',
        },
    },
    textInput: {
        width: '100%',
        '& .MuiInput-underline:before': {
            borderColor: GRAY_LIGHT,
        },
    },
    btn: {
        borderRadius: 6,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        padding: '12px 15px',
        height: 42,
        fontSize: 13,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '&.outlined': {
            background: 'white',
            borderColor: PRIMARY,
            color: PRIMARY,
            '&:hover': {
                backgroundColor: 'white',
                boxShadow: 'none',
                borderColor: PRIMARY_DARK,
                color: PRIMARY_DARK,
            },
        },
    },
    contentDownload: {
        color: PRIMARY_DARK,
        fontSize: 14,
        paddingRight: 0,
        paddingLeft: 0,
        '&.grid': {
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            alignItems: 'center',
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
    textInputDownload: {
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
