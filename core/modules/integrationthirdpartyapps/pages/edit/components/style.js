import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY, BORDER_TEXT, GRAY_TITLE } from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '16px 0',
        borderRadius: 16,
        margin: '20px 0',
    },
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px',
        minWidth: 'unset',
        height: 36,
        width: 42,
        marginBottom: 6,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 18,
        },
    },
    titleTop: {
        fontSize: 24,
        color: PRIMARY,
        fontFamily: font,
        display: 'inline-block',
    },
    titleSmall: {
        fontFamily: font,
        color: GRAY_TITLE,
        fontSize: 12,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 8,
        marginTop: 10,
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '30% 60% 10%',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '40% 60%',
        },
    },
    formFieldButton: {
        padding: '15px 29px 40px 22px',
    },
    btn: {
        borderRadius: 20,
    },
    divLabel: {
        display: 'block',
        '&.top': {
            alignSelf: 'flex-start',
        },
    },
    label: {
        color: BORDER_TEXT,
        fontFamily: font,
        position: 'relative',
    },
    labelRequired: {
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
    contentWithoutBorder: {
        padding: '0px 29px 0px 22px',
    },
    fieldRoot: {
        width: '100%',
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
    },
    helper: {
        fontSize: '0.75rem',
        marginLeft: 10,
        marginTop: 5,
    },
    editOutput: {
        color: PRIMARY,
        alignSelf: 'baseline',
        whiteSpace: 'pre',
        paddingLeft: 10,
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 0,
        },
    },
}));

export default useStyles;
