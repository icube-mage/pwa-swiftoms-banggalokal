import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, GRAY_BG, PRIMARY, TEXT_COLOR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        boxShadow: '0px 3px 15px #4D2F821A !important',
        padding: 30,
        borderRadius: '8px !important',
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
            minHeight: 42,
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
        fontWeight: 600,
    },
    colored: {
        color: PRIMARY,
        fontWeight: 600,
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
        justifyContent: 'flex-start',
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
        '&.newPassword': {
            marginBottom: 3,
        },
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
        borderRadius: '71px',
        backgroundColor: GRAY_BG,
    },
    checkboxToggle: {
        borderRadius: '4px',
        fontSize: '13px',
        '&.label': {
            color: PRIMARY_DARK,
            fontSize: '13px',
        },
    },
    passwordIndicator: {
        marginBottom: 30,
    },
}));

export default useStyles;
