import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, GRAY_BG, TEXT_COLOR, TABLE_GRAY, GRAY_LIGHT, ERROR,
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
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .left': {
            display: 'flex',
            alignItems: 'center',
            '& .MuiIconButton-root': {
                padding: 0,
                paddingRight: 10,
            },
            '& .MuiSvgIcon-root': {
                fill: PRIMARY_DARK,
                height: 30,
                width: 'auto',
            },
            '& .MuiIconButton-root:hover': {
                background: 'none',
            },
        },
        marginBottom: 20,
        '& .title': {
            color: PRIMARY_DARK,
            fontWeight: 'bold',
            marginTop: 0,
            marginBottom: 0,
            fontSize: 18,
        },
    },
    title: {
        color: PRIMARY_DARK,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 20,
    },
    space: {
        marginTop: 30,
        marginBottom: 30,
        border: `2px solid ${GRAY_LIGHT}`,
    },
    flexContainer: {
        display: 'flex',
        '&.between': {
            justifyContent: 'space-between',
        },
        '&.border': {
            marginBottom: 20,
            paddingBottom: 20,
            borderBottom: `1px inset ${TABLE_GRAY}`,
        },
    },
    subtitle: {
        color: PRIMARY_DARK,
        fontSize: 18,
        fontWeight: 'bold',
        '&.primary': {
            color: PRIMARY,
        },
    },
    bankAccountContainer: {
        margin: '20px 0',
    },
    bankFormContainer: {
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
        fontSize: 13,
        '&.tnc': {
            marginTop: 10,
            marginBottom: 30,
            '& li': {
                marginBottom: 10,
            },
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
        '&.adorn': {
            '& .MuiInput-root': {
                padding: 0,
            },
        },
        '& .MuiFormHelperText-root': {
            fontSize: 12,
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
    btn: {
        borderRadius: 6,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
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
            border: '1px solid',
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
            border: '1px solid',
            transition: '.3s all',
            '&:hover': {
                transition: '.3s all',
                color: PRIMARY_DARK,
                backgroundColor: 'white',
                boxShadow: 'none',
                borderColor: PRIMARY_DARK,
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
    addIcon: {
        fontSize: '1.5em',
        position: 'relative',
        backgroundColor: TEXT_COLOR,
        width: 20,
        height: 20,
        borderRadius: '50%',
        marginRight: 15,
        '& span': {
            position: 'absolute',
            transition: '300ms',
            background: 'white',
            borderRadius: 2,
        },
        '& span:first-child': {
            top: '25%',
            bottom: '25%',
            width: '10%',
            left: '45%',
        },
        '& span:last-child': {
            left: '25%',
            right: '25%',
            height: '10%',
            top: '45%',
        },
        '&.expand': {
            backgroundColor: TEXT_COLOR,
            '& span': {
                transform: 'rotate(90deg)',
            },
            '& span:last-child': {
                left: '50%',
                right: '50%',
            },
        },
    },
    formControl: {
        display: 'block',
    },
    errorText: {
        color: ERROR,
        fontSize: '0.75rem',
        marginTop: 10,
    },
    link: {
        color: PRIMARY,
    },
}));

export default useStyles;
