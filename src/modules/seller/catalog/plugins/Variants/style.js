import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, GRAY_BG, GRAY_LIGHT, TABLE_GRAY, TEXT_COLOR, PRIMARY, ERROR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    formFieldsGrid: {
        marginTop: 30,
        display: 'grid',
        gridTemplateColumns: '20% 80%',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
        marginBottom: 20,
        alignItems: 'center',
        '&.start': {
            alignItems: 'flex-start',
        },
        '&.grid': {
            marginBottom: 30,
        },
        '&.nomargin': {
            margin: 0,
        },
        '& .MuiGrid-root > .MuiGrid-item': {
            [theme.breakpoints.up('md')]: {
                maxWidth: '50%',
            },
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
        '& .MuiAutocomplete-inputRoot': {
            minHeight: 42,
            borderBottom: 'none',
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
        '& .MuiChip-root': {
            backgroundColor: 'white',
            border: `1px solid ${GRAY_LIGHT}`,
            borderRadius: 8,
            marginTop: 0,
            marginBottom: 0,
        },
        '& .MuiChip-deleteIcon': {
            fill: PRIMARY_DARK,
        },
    },
    textInputCreate: {
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
            backgroundColor: 'white',
            borderRadius: 6,
            padding: '0 10px',
            border: `1px solid ${GRAY_LIGHT}`,

        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
    },
    adornment: {
        backgroundColor: GRAY_LIGHT,
        padding: '20px 14px',
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        '& .MuiTypography-root': {
            color: PRIMARY_DARK,
            fontSize: 13,
            fontWeight: 'bold',
        },
    },
    label: {
        '&.MuiFormLabel-root': {
            fontSize: 14,
            color: PRIMARY_DARK,
            fontWeight: 600,
            marginBottom: 10,
        },
        position: 'relative',
        width: 'fit-content',
    },
    arrowDown: {
        transition: 'all .2s linear',
        transform: 'rotate(90deg)',
    },
    arrowUp: {
        transition: 'all .2s linear',
        transform: 'rotate(-90deg)',
    },
    btn: {
        width: 'max-content',
        borderRadius: 6,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        borderColor: PRIMARY,
        padding: '12px 14px',
        height: 42,
        fontSize: 15,
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '&.outlined': {
            background: 'transparent',
            color: PRIMARY,
            '&:hover': {
                background: 'transparent',
                boxShadow: 'none',
                color: PRIMARY_DARK,
                borderColor: PRIMARY_DARK,
            },
            '&.disabled': {
                background: GRAY_LIGHT,
                color: 'white',
                borderColor: GRAY_LIGHT,
            },
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
            padding: '8px 15px',
        },
    },
    btnGray: {
        borderRadius: 6,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        padding: '12px 15px',
        height: 42,
        fontSize: 13,
        background: TABLE_GRAY,
        borderColor: TABLE_GRAY,
        color: GRAY_LIGHT,
        width: '100%',
        justifyContent: 'space-between',
        '&:hover': {
            backgroundColor: TABLE_GRAY,
            boxShadow: 'none',
            borderColor: TABLE_GRAY,
        },
        '&.dark': {
            color: PRIMARY_DARK,
            fontWeight: 600,
        },
        '&.disabled': {
            background: GRAY_LIGHT,
            color: 'white',
            borderColor: GRAY_LIGHT,
        },
    },
    labelBtn: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textTransform: 'none',
    },
    menuAction: {
        '& .MuiMenuItem-root': {
            minWidth: 200,
            fontSize: 13,
            color: PRIMARY_DARK,
        },
        '& .MuiMenu-list': {
            borderRadius: 6,
            background: TABLE_GRAY,
        },
        '& .MuiListItem-button:hover': {
            background: TABLE_GRAY,
        },
        '& .MuiMenu-paper': {
            marginTop: 5,
        },
        '& .divider': {
            margin: '5px 16px',
            borderTop: `1px solid ${GRAY_LIGHT}`,
        },
        '& .helper': {
            display: 'flex',
            justifyContent: 'space-between',
            margin: '5px 0',
            fontSize: 11,
        },
        '& .helper-error': {
            margin: '5px 0',
            fontSize: 11,
            color: ERROR,
        },
    },
    menuItem: {
        color: `${TEXT_COLOR} !important`,
        fontSize: '13px !important',
        backgroundColor: `${TABLE_GRAY} !important`,
        borderRadius: 6,
    },
    centering: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        height: '100%',
        paddingTop: 12,
    },
    trash: {
        height: 18,
        width: 'auto',
        cursor: 'pointer',
    },
    divider: {
        borderTop: `1px solid ${GRAY_LIGHT}`,
    },
    menuDiv: {
        maxHeight: 180,
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '.6em',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 2px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: GRAY_LIGHT,
            borderRadius: 5,
        },
    },
    helperText: {
        fontSize: '0.75rem',
        color: ERROR,
        marginTop: 5,
    },
}));

export default useStyles;
