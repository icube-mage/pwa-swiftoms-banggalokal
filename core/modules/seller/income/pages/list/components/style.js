import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, TABLE_GRAY, GRAY_LIGHT, TEXT_COLOR, GRAY_BG,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        boxShadow: '0px 3px 15px #4D2F821A',
        padding: 30,
        paddingBottom: 50,
        borderRadius: 8,
        marginBottom: 20,
        [theme.breakpoints.down('sm')]: {
            paddingBottom: 30,
        },
    },
    title: {
        color: PRIMARY_DARK,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 20,
    },
    subtitle: {
        color: PRIMARY_DARK,
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
    },
    btnAction: {
        borderRadius: 6,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        borderColor: PRIMARY,
        padding: '12px 15px',
        height: 42,
        fontSize: 13,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '&.gray': {
            background: TABLE_GRAY,
            borderColor: TABLE_GRAY,
            color: PRIMARY_DARK,
            '&:hover': {
                backgroundColor: TABLE_GRAY,
                boxShadow: 'none',
                borderColor: TABLE_GRAY,
            },
        },
    },
    menuAction: {
        '& .MuiMenuItem-root': {
            fontSize: 13,
            color: PRIMARY_DARK,
        },
        '& .MuiMenu-list': {
            borderRadius: 6,
            background: TABLE_GRAY,
            marginTop: 5,
            border: `1px solid ${GRAY_LIGHT}`,
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
    wallet: {
        alignItems: 'center',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            marginBottom: 20,
        },
    },
    btn: {
        borderRadius: 6,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        borderColor: PRIMARY,
        padding: '12px 15px',
        height: 34,
        fontSize: 13,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '&.gray': {
            background: TABLE_GRAY,
            borderColor: TABLE_GRAY,
            color: PRIMARY_DARK,
            '&:hover': {
                backgroundColor: TABLE_GRAY,
                boxShadow: 'none',
                borderColor: TABLE_GRAY,
            },
        },
        '&.big': {
            fontSize: 14,
            height: 42,
            width: '100%',
        },
        '&.secondary': {
            background: 'white',
            color: PRIMARY,
            '&:hover': {
                color: PRIMARY_DARK,
                backgroundColor: 'white',
                boxShadow: 'none',
                borderColor: PRIMARY_DARK,
            },
        },
    },
    infoContainer: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: 30,
        paddingRight: '10%',
        '&.bottom': {
            marginBottom: 0,
            [theme.breakpoints.down('sm')]: {
                marginBottom: 30,
            },
        },
        '&.center': {
            alignItems: 'center',
        },
        '& .icon': {
            width: 25,
            height: 'auto',
            borderRight: '1px solid transparent',
        },
    },
    bankContainer: {
        display: 'flex',
        alignItems: 'center',
        '& .icon': {
            width: 25,
            height: 'auto',
            borderRight: '1px solid transparent',
        },
    },
    text: {
        color: TEXT_COLOR,
        paddingLeft: 25,
        fontSize: 13,
        '&.primary': {
            color: PRIMARY,
            paddingLeft: 15,
            fontSize: 18,
            fontWeight: 'bold',
        },
        '&.no-icon': {
            paddingLeft: 0,
        },
    },
    formField: {
        padding: 0,
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: PRIMARY_DARK,
        marginBottom: 5,
        position: 'relative',
        width: 'fit-content',
        fontWeight: 600,
    },
    required: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -9,
            right: -9,
            color: PRIMARY,
            fontSize: 14,
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
    seeDetails: {
        color: PRIMARY,
        textDecoration: 'underline',
        cursor: 'pointer',
        fontWeight: 600,
        '&:hover': {
            color: PRIMARY_DARK,
        },
    },
    dialogContainer: {
        padding: '15px 5px 15px 5px',
        borderRadius: 8,
        position: 'relative',
        width: 500,
    },
    dialogTitleContainer: {
        '& .MuiTypography-root': {
            color: PRIMARY_DARK,
            fontWeight: 'bold',
        },
    },
    dialogContent: {
        '&.MuiDialogContent-root': {
            overflowY: 'visible',
        },
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
        color: PRIMARY_DARK,
    },
    textDialog: {
        color: PRIMARY_DARK,
        fontSize: 14,
        '&.bold': {
            fontWeight: 600,
            marginBottom: 11,
        },
        '&.price': {
            color: PRIMARY,
            fontSize: 20,
            marginBottom: 20,
            fontWeight: 'bold',
        },
        '&.primary': {
            color: PRIMARY,
            fontWeight: 'bold',
        },
        '&.end': {
            textAlign: 'right',
        },
    },
    dialogDivider: {
        borderBottom: `1px solid ${GRAY_LIGHT}`,
        margin: '20px 0 10px 0',
    },
    status: {
        display: 'flex',
        gap: 5,
        textTransform: 'capitalize',
        '& img': {
            width: 14,
            cursor: 'pointer',
        },
    },
    tooltip: {
        fontSize: 11,
        maxWidth: 300,
    },
}));

export default useStyles;
