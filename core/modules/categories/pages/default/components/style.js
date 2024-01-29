import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, GRAY_BG, TABLE_GRAY, GRAY_LIGHT, ERROR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        boxShadow: '0px 3px 15px #4D2F821A',
        borderRadius: 8,
    },
    title: {
        padding: 30,
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 0,
        fontSize: 20,
        '&.grid': {
            padding: 0,
            backgroundColor: 'transparent',
        },
    },
    headContainer: {
        padding: 30,
        paddingTop: 0,
        paddingBottom: 20,
        borderBottom: `3px solid ${GRAY_BG}`,
        display: 'flex',
        justifyContent: 'space-between',
        '& .flex': {
            display: 'flex',
        },
        '&.end': {
            justifyContent: 'end',
        },
        '& .icon': {
            marginRight: 15,
        },
        '&.grid': {
            border: '0px',
            paddingRight: 20,
            paddingLeft: 0,
        },
        '& .selected': {
            color: PRIMARY_DARK,
        },
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
    formField: {
        padding: 0,
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
    textInputSearch: {
        width: 280,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            '&.full': {
                width: '100%',
            },
        },
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            backgroundColor: TABLE_GRAY,
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
    iconImg: {
        padding: '0 5px 0 10px',
    },
    btn: {
        width: 148,
        height: 42,
        margin: '0 10px',
        boxShadow: 'none',
        fontSize: 15,
        '&.secondary': {
            backgroundColor: 'white',
            color: PRIMARY,
            boxShadow: 'none',
            border: `1px solid ${PRIMARY}`,
        },
        '&.red': {
            backgroundColor: ERROR,
            fontSize: 11,
            height: 20,
            width: 55,
            padding: '3px 11px',
            boxShadow: 'none',
            borderRadius: 2,
            '&:hover': {
                boxShadow: 'none',
            },
        },
        [theme.breakpoints.down('xs')]: {
            margin: 0,
            marginTop: 20,
        },
    },
    btnAdd: {
        marginLeft: 30,
        backgroundColor: 'white',
        color: PRIMARY,
        boxShadow: 'none',
        border: `1px solid ${PRIMARY}`,
        height: 42,
        margin: '0 10px',
        fontSize: 15,
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: 'white',
            color: PRIMARY,
            border: `1px solid ${PRIMARY}`,
        },
    },
    gridLeft: {
        padding: 30,
        minHeight: 600,
        [theme.breakpoints.down('xs')]: {
            padding: 10,
        },
    },
    progress: {
        height: 450,
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 50,
    },
    gridRight: {
        backgroundColor: TABLE_GRAY,
        borderLeft: `1px solid ${GRAY_LIGHT}`,
        padding: 30,
        borderBottomRightRadius: 8,
        [theme.breakpoints.down('xs')]: {
            padding: '30px 10px',
        },
    },
    paperForm: {
        marginTop: 20,
        boxShadow: 'none',
        borderRadius: 8,
        border: '1px solid',
        borderColor: GRAY_LIGHT,
        minHeight: 450,
        padding: 30,
    },
    divRight: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: PRIMARY_DARK,
        '& div': {
            textAlign: 'center',
        },
        '& .title': {
            fontSize: 20,
            fontWeight: 600,
            margin: '10px 0',
        },
        '& .subtitle': {
            fontSize: 13,
        },
    },
    fieldRoot: {
        width: '100%',
        verticalAlign: 'middle',
        border: `1px solid ${GRAY_LIGHT}`,
        '& .ql-container.ql-snow': {
            height: 220,
        },
    },
}));

export default useStyles;
