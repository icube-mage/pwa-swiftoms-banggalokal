import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    BORDER_COLOR, WHITE, BLACK, PRIMARY_DARK, TEXT_COLOR, PRIMARY, PURPLE,
} from '@theme_color';

const fontFamily = '"Plus Jakarta Sans", sans-serif';
const useStyles = makeStyles((theme) => ({
    btnFilter: {
        background: WHITE,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        borderColor: BORDER_COLOR,
        color: BLACK,
        height: 42,
        fontSize: 13,
        fontWeight: 600,
        '&:hover': {
            color: BLACK,
            backgroundColor: WHITE,
            boxShadow: 'none',
            borderColor: BORDER_COLOR,
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
    menuContainer: {
        padding: 15,
        [theme.breakpoints.down('xs')]: {
            paddingTop: 15,
            padding: 0,
        },
        '& .bold': {
            fontWeight: 'bold',
            margin: '15px 0 10px 0',
            fontSize: 13,
        },
        '& .divider': {
            margin: '10px 0 15px 0',
        },
        '& .center': {
            textAlign: 'center',
        },
        '& .gray': {
            color: TEXT_COLOR,
        },
    },
    menuAction: {
        '& .MuiMenuItem-root': {
            fontSize: 13,
            color: PRIMARY_DARK,
        },
        '& .MuiMenu-list': {
            borderRadius: 6,
            background: WHITE,
        },
        '& .MuiListItem-button:hover': {
            background: WHITE,
        },
        '& .MuiMenu-paper': {
            marginTop: 5,
        },
    },
    menuItemContainer: {
        maxHeight: 200,
        overflow: 'scroll',
    },
    menuItem: {
        color: `${TEXT_COLOR} !important`,
        fontSize: '13px !important',
        backgroundColor: `${WHITE} !important`,
        borderRadius: 6,
        '&.MuiListItem-gutters': {
            paddingLeft: 0,
        },
    },
    checkboxOption: {
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: BORDER_COLOR,
        },
        '& .MuiCheckbox-root': {
            color: BORDER_COLOR,
            borderRadius: 4,
            padding: 0,
            paddingLeft: 10,
        },
        '& .MuiFormControlLabel-label': {
            fontSize: 13,
            paddingLeft: 8,
            fontFamily,
        },
        '&.MuiFormControlLabel-root': {
            minWidth: '100%',
            marginBottom: 0,
            height: 25,
        },
        '&.checked': {
            '& .MuiCheckbox-colorSecondary.Mui-checked': {
                color: PRIMARY,
            },
            '& .MuiCheckbox-root': {
                color: PRIMARY,
            },
        },
    },
    textInput: {
        width: 200,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
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
            backgroundColor: WHITE,
            borderRadius: 6,
            padding: '5px 10px',
            paddingLeft: 0,
            border: `1px solid ${BORDER_COLOR}`,
            height: 32,
            [theme.breakpoints.down('xs')]: {
                height: 40,
            },
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: TEXT_COLOR,
            fontSize: 11,
        },
    },
    iconImg: {
        padding: '0 5px 0 10px',
    },
    buttonTextDiv: {
        display: 'flex',
        marginTop: 10,
        gap: 20,
        '& .btn-icon-div': {
            display: 'flex',
            gap: 5,
        },
        '& .icon': {
            width: 16,
            height: 16,
        },
    },
    buttonText: {
        textDecoration: 'none',
        justifyContent: 'start',
        fontSize: 13,
        padding: 0,
        '& .MuiButton-startIcon': {
            marginLeft: 0,
            marginRight: 4,
        },
    },
    buttonBottomDiv: {
        display: 'flex',
        gap: 10,
    },
    buttonBottom: {
        fontSize: 12,
        height: 30,
    },
    btnPurple: {
        backgroundColor: PURPLE,
        color: WHITE,
        padding: 7,
        marginRight: 10,
        '&:hover': {
            color: PURPLE,
        },
    },
}));

export default useStyles;
