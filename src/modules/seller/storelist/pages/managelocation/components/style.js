import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, WHITE, BORDER_COLOR, BLACK, ERROR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.up('sm')]: {
            padding: 24,
        },
        marginBottom: 50,
    },
    divTh: {
        padding: '10px 0',
    },
    textInput: {
        [theme.breakpoints.up('md')]: {
            minWidth: 300,
        },
        [theme.breakpoints.up('sm')]: {
            minWidth: 200,
        },
        width: '100%',
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
            [theme.breakpoints.down('xs')]: {
                fontSize: 12,
            },
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
            [theme.breakpoints.down('xs')]: {
                fontSize: 12,
            },
        },
        '& .MuiAutocomplete-inputRoot': {
            height: 42,
            [theme.breakpoints.down('xs')]: {
                height: 36,
            },
            backgroundColor: WHITE,
            borderBottom: 'none',
        },
        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
            [theme.breakpoints.down('xs')]: {
                fontSize: 12,
            },
        },
        '&.notFound': {
            '& .MuiAutocomplete-inputRoot': {
                color: ERROR,
            },
        },
    },
    iconButtonRoot: {
        padding: 0,
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
    errorText: {
        color: ERROR,
    },
}));

export default useStyles;
