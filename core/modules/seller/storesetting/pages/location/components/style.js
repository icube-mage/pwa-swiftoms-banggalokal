import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, GRAY_BG, PRIMARY, ERROR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        boxShadow: '0px 3px 15px #4D2F821A !important',
        padding: 30,
        borderRadius: '8px !important',
    },
    headerContainer: {
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
        marginBottom: 20,
        '& .title': {
            color: PRIMARY_DARK,
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 0,
            marginBottom: 0,
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
    error: {
        color: ERROR,
        fontSize: '0.75rem',
        marginBottom: 10,
    },
}));

export default useStyles;
