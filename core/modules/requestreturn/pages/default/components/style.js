import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#435179';
const colorP = '#B1BCDB';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '16px 0',
        borderRadius: 16,
        margin: '0 auto',
        height: '100%',
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
        color: colorPurple,
        fontFamily: font,
    },
    formField: {
        padding: 0,
        paddingBottom: 26,
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            padding: '0 14px',
        },
    },
    formFieldButton: {
        padding: '24px 29px 30px 22px',
    },
    btn: {
        borderRadius: 20,
        '&.search': {
            marginLeft: 12,
            background: '#FFFFFF',
            color: colorPurple,
            borderColor: colorPurple,
        },
    },
    divLabel: {
        display: 'block',
    },
    label: {
        color: colorText,
        fontFamily: font,
        position: 'relative',
        fontWeight: 600,
    },
    labelRequired: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -5,
            right: -9,
            color: colorPurple,
            fontSize: 20,
        },
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 29px 12px 22px',
    },
    fieldRoot: {
        width: '100%',
    },
    fieldInput: {
        height: 36,
        color: colorP,
        '& fieldset': {
            border: 0,
            borderBottom: '1px solid',
            borderColor: colorText,
            borderRadius: 0,
        },
    },
    paraf: {
        color: colorP,
        marginBottom: 32,
    },
}));

export default useStyles;
