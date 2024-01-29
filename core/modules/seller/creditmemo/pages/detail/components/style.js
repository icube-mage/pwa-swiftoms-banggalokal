import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, TABLE_GRAY, GRAY_LIGHT, TEXT_COLOR,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
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
        '&.padding': {
            padding: 30,
        },
    },
    title: {
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        marginTop: 0,
        fontSize: 18,
        '&.padding': {
            padding: '0px 30px',
        },
        '&.base': {
            marginBottom: 0,
        },
    },
    title2: {
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 10,
        marginTop: 0,
    },
    itemsGrid: {
        padding: '0 30px',
        paddingTop: 30,
        color: PRIMARY_DARK,
        '& .right': {
            textAlign: 'right',
        },
        '& .primaryText': {
            color: PRIMARY,
        },
    },
    subtitle: {
        marginBottom: 5,
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        fontSize: 14,
    },
    subText: {
        color: TEXT_COLOR,
        fontSize: 14,
        overflowWrap: 'break-word',
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
    buttonForm: {
        background: PRIMARY,
        boxShadow: 'none',
        borderRadius: 6,
        border: '0px',
        padding: 6,
        width: '100%',
        marginTop: 10,
        height: 42,
        '&:hover': {
            background: PRIMARY_DARK,
            boxShadow: 'none',
        },
        '&.outlined': {
            background: 'transparent',
            border: `1px solid ${PRIMARY}`,
            color: PRIMARY,
            '&:hover': {
                background: 'transparent',
                border: `1px solid ${PRIMARY_DARK}`,
                color: PRIMARY_DARK,
            },
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
    },
    controlLabel: {
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 13,
            fontWeight: 'bold',
            paddingLeft: 5,
        },
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '& .MuiCheckbox-root': {
            color: GRAY_LIGHT,
            borderRadius: 4,
        },
        '&.MuiFormControlLabel-root': {
            marginBottom: -8,
            color: PRIMARY_DARK,
        },
        '& .MuiSvgIcon-root': {
            height: 18,
            width: 18,
        },
    },
    textInput: {
        width: '100%',
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            border: `1px solid ${GRAY_LIGHT}`,
            backgroundColor: 'white',
            borderRadius: 6,
            padding: 10,
            fontSize: '0.875rem',

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
}));

export default useStyles;
