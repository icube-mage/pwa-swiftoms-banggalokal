import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, GRAY_BG, PRIMARY, TEXT_COLOR, ERROR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        boxShadow: '0px 3px 15px #4D2F821A !important',
        padding: 30,
        borderRadius: '8px !important',
    },
    gridMainContainer: {
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column-reverse',
            '& >div': {
                marginBottom: 40,
            },
        },
    },
    title: {
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 20,
    },
    required: {
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
    textInput: {
        width: '100%',
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
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
    fieldPhoneContainer: {
        '& .form-control': {
            backgroundColor: GRAY_BG,
            borderRadius: 6,
            width: '100%',
            border: 'none',
            borderBottom: 'none',
            height: 42,
            '&:focus': {
                border: 'none',
                borderBottom: `2px solid ${PRIMARY}`,
                boxShadow: 'none',
                '& .special-label': {
                    color: 'black',
                },
            },
        },
    },
    fieldPhoneRoot: {
        width: '100%',
    },
    label: {
        position: 'relative',
        '&.MuiFormLabel-root': {
            fontSize: 14,
            color: PRIMARY_DARK,
            fontWeight: 600,
            marginBottom: 10,
            width: 'fit-content',
        },
    },
    helper: {
        fontSize: 13,
        color: TEXT_COLOR,
        marginBottom: 20,
        marginTop: -10,
    },
    colored: {
        color: PRIMARY,
    },
    storeLogo: {
        width: '100%',
        height: 'auto',
    },
    btn: {
        background: PRIMARY,
        borderRadius: 7,
        padding: 6,
        width: '100%',
        height: 42,
        '&:hover': {
            background: PRIMARY_DARK,
        },
    },
    btnContainer: {
        [theme.breakpoints.down('sm')]: {
            padding: '0 10px',
        },
    },
    btnSave: {
        background: PRIMARY,
        borderRadius: 6,
        padding: 6,
        width: '100%',
        height: 52,
        '&:hover': {
            background: PRIMARY_DARK,
        },
        margin: '30px 0',
    },
    btnText: {
        fontSize: 15,
    },
    formField: {
        padding: 0,
        marginBottom: 30,
    },
    formFieldsGrid: {
        display: 'grid',
        gridTemplateColumns: '20% 80%',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
        marginBottom: 30,
        alignItems: 'center',
        '&.start': {
            alignItems: 'flex-start',
        },
    },
    imgGroup: {
        margin: 10,
        padding: '10px 0',
        textAlign: 'center',
    },
    imgContainer: {
        position: 'relative',
        border: '1px solid #B1BCDA',
        padding: 0,
        width: 210,
        height: 210,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgBack: {
        width: 142,
        height: 142,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        borderRadius: 10,
        backgroundColor: GRAY_BG,
    },
    error: {
        color: ERROR,
        fontSize: '0.75rem',
        marginBottom: 10,
    },
}));

export default useStyles;
