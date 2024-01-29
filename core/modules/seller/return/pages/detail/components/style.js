import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, TEXT_COLOR, GRAY_BG, ERROR,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 20,
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
    paper: {
        boxShadow: '0px 3px 15px #4D2F821A !important',
        borderRadius: '8px !important',
        marginBottom: 20,
        padding: '30px 0',
    },
    title: {
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 0,
        fontSize: 18,
        '&.padding': {
            padding: '10px 30px',
            paddingTop: 0,
        },
    },
    itemsGrid: {
        padding: '0 30px',
        paddingTop: 30,
        '&.nopadding': {
            padding: 0,
        },
    },
    subtitle: {
        marginBottom: 5,
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        fontSize: 14,
        position: 'relative',
        width: 'fit-content',
        '&.required': {
            '&::after': {
                content: "'*'",
                display: 'block',
                position: 'absolute',
                top: -9,
                right: -9,
                color: PRIMARY,
                fontSize: 20,
            },
        },
    },
    subText: {
        color: TEXT_COLOR,
        fontSize: 14,
        overflowWrap: 'break-word',
    },
    stepContainer: {
        borderBottom: `2px solid ${GRAY_BG}`,
    },
    autocompleteRoot: {
        '& .MuiOutlinedInput-root': {
            background: GRAY_BG,
        },
        borderRadius: 6,
        '& input': {
            fontSize: '0.875rem',
        },
        '& fieldset': {
            border: 0,
        },
        '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${ERROR}`,
        },
        '& .MuiInputBase-root.Mui-disabled': {
            cursor: 'not-allowed',
        },
        '& input:disabled': {
            cursor: 'not-allowed',
        },
    },
    link: {
        fontWeight: 'bold',
        color: PRIMARY,
        '&:hover': {
            textDecoration: 'underline',
        },
        wordBreak: 'break-word',
    },
}));

export default useStyles;
