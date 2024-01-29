import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, TEXT_COLOR, DISABLED, GRAY_LIGHT, GRAY_BG,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('sm')]: {
            padding: '0 10px',
        },
        paddingBottom: 5,
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
    },
    paper: {
        boxShadow: '0px 3px 15px #4D2F821A !important',
        padding: 30,
        borderRadius: '8px !important',
        marginBottom: 30,
    },
    title: {
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 0,
        '&.paper': {
            marginBottom: 30,
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
    label: {
        '&.MuiFormLabel-root': {
            fontSize: 14,
            color: PRIMARY_DARK,
            fontWeight: 600,
            marginBottom: 10,
        },
        position: 'relative',
        width: 'fit-content',
        '&.disabled': {
            color: DISABLED,
        },
    },
    helper: {
        fontSize: 13,
        color: TEXT_COLOR,
        marginTop: -10,
        '& .primary': {
            color: PRIMARY,
        },
    },
    helperLink: {
        color: PRIMARY,
    },
    desc: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
    btnContainer: {
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            justifyContent: 'end',
            marginTop: 20,
        },
    },
    formFieldsGrid: {
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
    },
    required: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -3,
            right: -9,
            color: PRIMARY,
            fontSize: 16,
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
        '&.adorn': {
            '& .MuiInput-root': {
                padding: 0,
            },
        },
        '& .MuiChip-root': {
            backgroundColor: 'transparent',
            border: `1px solid ${GRAY_LIGHT}`,
            borderRadius: 8,
        },
        '& .MuiChip-deleteIcon': {
            fill: PRIMARY_DARK,
        },
        '&.multi': {
            '& .MuiInput-root': {
                backgroundColor: GRAY_BG,
                borderRadius: 6,
                padding: '0px 10px',
            },
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
}));

export default useStyles;
