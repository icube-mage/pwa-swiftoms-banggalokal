import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, GRAY_LIGHT, TABLE_GRAY, TEXT_COLOR,
    GRAY_BG,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    dialogContainer: {
        padding: '15px 20px',
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
        overflow: 'unset',
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
        '&.full': {
            borderBottom: '0',
            overflow: 'unset',
        },
    },
    tableToolbar: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'left',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
        '& .top-item': {
            marginRight: '12px',
            [theme.breakpoints.down('md')]: {
                marginTop: 20,
            },
        },
    },
    textInput: {
        width: 430,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            '&.full': {
                width: '100%',
            },
        },
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            backgroundColor: TABLE_GRAY,
            borderRadius: 6,
            padding: '5px 10px',
        },
        '& .MuiAutocomplete-inputRoot': {
            height: 42,
            borderBottom: 'none',
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
    },
    arrowDown: {
        transition: 'all .2s linear',
        transform: 'rotate(90deg)',
    },
    arrowUp: {
        transition: 'all .2s linear',
        transform: 'rotate(-90deg)',
    },
    iconImg: {
        padding: '0 5px 0 10px',
    },
    menuAction: {
        '& .MuiMenuItem-root': {
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
    },
    menuItem: {
        color: `${TEXT_COLOR} !important`,
        fontSize: '13px !important',
        backgroundColor: `${TABLE_GRAY} !important`,
        borderRadius: 6,
    },
    checkboxOption: {
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: TEXT_COLOR,
        },
        '& .MuiCheckbox-root': {
            color: TEXT_COLOR,
            borderRadius: 4,
            padding: 10,
        },
        '& .MuiFormControlLabel-label': {
            fontSize: 13,
            [theme.breakpoints.down('sm')]: {
                fontSize: 12,
            },
        },
        '&.MuiFormControlLabel-root': {
            marginBottom: 0,
            height: 25,
        },
    },
    expandContainer: {
        background: 'white',
        '& .filter-item': {
            border: `1px solid ${GRAY_LIGHT}`,
            color: GRAY_LIGHT,
            fontSize: 13,
            padding: '5px 10px',
            minHeight: 26,
            borderRadius: 4,
            margin: 10,
            marginTop: 0,
            display: 'flex',
            justifyContent: 'space-between',
            minWidth: 87,
            alignItems: 'center',
        },
    },
    expandGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 11fr',
        alignItems: 'baseline',
        [theme.breakpoints.down('md')]: {
            display: 'block',
        },
    },
    btnFilterText: {
        background: 'transparent',
        boxShadow: 'none',
        padding: 0,
        marginRight: 10,
        '&:hover': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderColor: 'transparent',
        },
        '& .MuiButton-label': {
            fontSize: 13,
            color: PRIMARY,
            fontWeight: 'bold',
        },
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        color: PRIMARY_DARK,
    },
    closeIcon: {
        height: 12,
        width: 12,
        color: 'white',
    },

    containerBtn: {
        display: 'flex',
        marginTop: 10,
        justifyContent: 'end',
    },
    btnImg: {
        borderRadius: 6,
        backgroundColor: GRAY_BG,
        textTransform: 'none',
        color: PRIMARY_DARK,
        height: 57,
        width: 57,
        boxShadow: 'none',
        border: `1px solid ${GRAY_LIGHT}`,
        borderStyle: 'dashed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            height: 40,
            width: 40,
        },
    },
    icon: {
        height: 21,
        width: 21,
    },
    group: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    imgGroup: {
        margin: 10,
        textAlign: 'center',
        width: 57,
        height: 57,
        [theme.breakpoints.down('xs')]: {
            height: 40,
            width: 40,
        },
    },
    imgContainer: {
        position: 'relative',
        border: `1px solid ${GRAY_LIGHT}`,
        borderStyle: 'dashed',
        padding: 0,
        width: 57,
        height: 57,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        [theme.breakpoints.down('xs')]: {
            height: 40,
            width: 40,
        },
    },
    imgThumb: {
        maxWidth: 50,
        maxHeight: 50,
        width: 'auto',
        height: 'auto',
        display: 'block',
        [theme.breakpoints.down('xs')]: {
            height: 35,
            width: 35,
        },
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
