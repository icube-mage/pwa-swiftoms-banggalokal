import { makeStyles } from '@material-ui/core/styles';
import {
    GRAY_TITLE, BORDER_TEXT, GRAY_BG, GRAY_LIGHT, ERROR, GREEN,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    contentBorder: {
        padding: '20px 29px 0px 22px',
        borderBottom: `2px solid ${GRAY_BG}`,
    },
    titleSmall: {
        color: GRAY_TITLE,
        fontSize: 12,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 8,
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
        display: 'grid',
        gridTemplateColumns: '30% 60% 10%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
    },
    autocompleteRoot: {
        width: '100%',
        verticalAlign: 'middle',
        '& .MuiOutlinedInput-root': {
            borderColor: BORDER_TEXT,
            borderRadius: 20,
            border: '1px solid',
            minHeight: 36,
            padding: '0 9px',
        },
        '&.w100': {
            width: 100,
        },
    },
    fieldRoot: {
        width: 200,
        verticalAlign: 'middle',
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            padding: '7px 14px',
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: BORDER_TEXT,
        borderRadius: 20,
        height: 36,
    },
    helper: {
        fontSize: '0.75rem',
        marginLeft: 10,
        marginTop: 5,
    },
    divider: {
        height: 20,
    },
    container: {
        overflow: 'auto',
        '&::-webkit-scrollbar': {
            width: '.4em',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 2px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: GRAY_LIGHT,
            borderRadius: 5,
        },
        minHeight: 600,
        height: 'max-content',
        '& .delete': {
            '&.MuiSvgIcon-root': {
                fill: ERROR,
                width: 16,
                height: 16,
                cursor: 'pointer',
                verticalAlign: 'middle',
            },
        },
        '& .add': {
            '&.MuiSvgIcon-root': {
                fill: GREEN,
                width: 16,
                height: 16,
                cursor: 'pointer',
                verticalAlign: 'middle',
            },
        },
        '& .bold': {
            fontWeight: 'bold',
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'underline',
            },
            margin: '0px 5px',
            width: 'max-content',
        },
        '& .bold-2': {
            fontWeight: 'bold',
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'underline',
            },
            marginRight: 5,
            maxWidth: '60%',
        },
    },
    group: {
        marginLeft: 7,
        paddingLeft: 10,
        borderLeft: `1px solid ${GRAY_LIGHT}`,
    },
    fieldRootTree: {
        verticalAlign: 'middle',
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            padding: '7px 14px',
        },
        margin: '0px 5px',
    },
    fieldInputTree: {
        border: '1px solid',
        borderColor: BORDER_TEXT,
        borderRadius: 20,
        height: 36,
        minWidth: 100,
    },
    field: {
        display: 'flex',
        margin: '5px 0',
        '&.alignCenter': {
            alignItems: 'center',
        },
    },
    select: {
        height: 36,
        '& .MuiSelect-select:focus': {
            backgroundColor: 'transparent',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: 20,
            border: `1px solid ${GRAY_TITLE} !important`,
        },
        margin: '0px 5px',
        minWidth: 100,
        width: 'max-content',
    },
    selectMultiple: {
        '& .MuiSelect-select:focus': {
            backgroundColor: 'transparent',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${GRAY_TITLE} !important`,
        },
        '& .MuiOutlinedInput-input': {
            padding: '0 12px',
            height: 110,
        },
        margin: '0px 5px',
        minWidth: 100,
        width: 'max-content',
    },
    root: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
    },
}));

export default useStyles;
