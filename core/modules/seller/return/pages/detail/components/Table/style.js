import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, TABLE_GRAY, GRAY_LIGHT, GRAY_BG, ERROR,
} from '@theme_color';

const useStyles = makeStyles(() => ({
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
    table: {
        borderTop: `1px solid ${GRAY_LIGHT}`,
        borderBottom: `1px solid ${GRAY_LIGHT}`,
        color: PRIMARY_DARK,
    },
    tr: {
        verticalAlign: 'top',
        backgroundColor: TABLE_GRAY,
        height: 45,
        padding: '0 20px',
        borderColor: 'transparent',
    },
    th: {
        '&.MuiTableCell-head': {
            textAlign: 'left',
            color: PRIMARY_DARK,
            fontWeight: 'bold',
        },
        '&.check': {
            paddingTop: 8,
        },
        '&.small': {
            width: 140,
        },
        '&.form': {
            minWidth: 170,
        },
    },
    rowItem: {
        '&.noBorder': {
            '& .MuiTableCell-root': {
                borderBottom: '0px',
            },
        },
    },
    td: {
        '&.MuiTableCell-body': {
            color: PRIMARY_DARK,
            verticalAlign: 'baseline',
        },
        border: '0',
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
    checkbox: {
        '&.MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '&.MuiCheckbox-root': {
            color: GRAY_LIGHT,
            borderRadius: 4,
        },
        '&.MuiIconButton-colorSecondary:hover': {
            backgroundColor: 'transparent',
        },
        '&.MuiCheckbox-colorSecondary.Mui-disabled': {
            color: GRAY_LIGHT,
        },
        '&.MuiButtonBase-root.Mui-disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'auto',
        },
        marginLeft: 0,
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
