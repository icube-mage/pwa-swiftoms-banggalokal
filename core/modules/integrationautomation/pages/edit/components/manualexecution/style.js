import { makeStyles } from '@material-ui/core/styles';
import { GRAY_TITLE, TEXT_COLOR } from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    content: {
        borderBottom: '2px solid #F5F7FB',
        padding: '26px 29px 0px 22px',
    },
    contentWithoutBorder: {
        padding: '26px 29px 20px 22px',
    },
    fieldRoot: {
        minWidth: 180,
        width: '100%',
        verticalAlign: 'middle',
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            padding: '7px 14px',
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: GRAY_TITLE,
        borderRadius: 36,
        height: 36,
        '&.MuiOutlinedInput-input:-webkit-autofill': {
            height: 0,
        },
        '& .MuiInputBase-input': {
            fontSize: '.9rem',
        },
    },
    topField: {
        display: 'flex',
        gap: 20,
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
    btn: {
        borderRadius: 20,
        marginBottom: 20,
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 40,
        '& .textfield': {
            gap: 10,
            display: 'flex',
            alignItems: 'center',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
    divLabel: {
        display: 'inline-block',
        width: '100%',
        minWidth: 'max-content',
        '& bold': {
            fontWeight: 600,
        },
    },
    label: {
        color: TEXT_COLOR,
        fontFamily: font,
        position: 'relative',
    },
    tooltip: {
        '&.MuiIconButton-root:hover': {
            backgroundColor: 'transparent',
        },
        '&.MuiIconButton-root': {
            padding: 0,
            color: TEXT_COLOR,
        },
    },
}));

export default useStyles;
