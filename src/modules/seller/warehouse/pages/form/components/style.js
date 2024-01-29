import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, PRIMARY, ERROR, WHITE, BORDER_COLOR, GRAY_BG_2, BLACK,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 24,
        paddingBottom: 150,
        [theme.breakpoints.down('xs')]: {
            padding: 10,
            paddingBottom: 80,
        },
    },
    rootPaper: {
        padding: 30,
        borderRadius: 6,
        border: `1px solid ${BORDER_COLOR}`,
        boxShadow: 'none',
    },
    title: {
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 20,
        fontSize: 16,
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
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-root': {
            backgroundColor: WHITE,
            borderRadius: 4,
            padding: '2px 10px',
            border: `1px solid ${BORDER_COLOR}`,
            width: '100%',
            height: 42,
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
        '& .MuiInputBase-root.Mui-disabled': {
            backgroundColor: GRAY_BG_2,
        },
    },
    fieldPhoneContainer: {
        '& .form-control': {
            backgroundColor: WHITE,
            borderRadius: 4,
            width: '100%',
            height: 42,
            '&:hover': {
                border: `1px solid ${BORDER_COLOR}`,
            },
            '&:focus': {
                border: `1px solid ${BORDER_COLOR}`,
                borderBottom: `2px solid ${PRIMARY}`,
                boxShadow: 'none',
                '& .special-label': {
                    color: 'black',
                },
                borderRadius: '4px 4px 0 0',

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
    stickyBottomContainer: {
        [theme.breakpoints.down('xs')]: {
            '& .sticky-bottom-container-fixed': {
                padding: 14,
                width: '100%',
                bottom: 0,
                gridTemplateColumns: '100%',
                boxShadow: '0px -1px 6px #00000014',
                '& .sticky-bottom-right': {
                    justifyContent: 'end',
                },
            },
        },
    },
    stickyBottomContainerRight: {
        display: 'flex',
        alignItems: 'end',
        paddingRight: 12,
        gap: 10,
        [theme.breakpoints.down('xs')]: {
            paddingRight: 0,
        },
    },
    btnRoot: {
        height: 36,
        minWidth: 120,
        fontSize: 14,
        '&.outlined': {
            color: BLACK,
            borderColor: BORDER_COLOR,
            fontWeight: 'bold',
        },
    },
}));

export default useStyles;
