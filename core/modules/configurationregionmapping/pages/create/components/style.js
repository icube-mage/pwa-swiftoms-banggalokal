import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '16px 0',
        borderRadius: 16,
    },
    titleTop: {
        fontSize: 24,
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
    },
    btnBack: {
        display: 'inline-block !important',
        borderRadius: '10px 0px 0px 10px  !important',
        minWidth: 'unset  !important',
        height: '36px !important',
        width: '42px !important',
        marginBottom: '6px !important',
        [theme.breakpoints.down('xs')]: {
            marginLeft: '18px !important',
        },
    },
    formField: {
        display: 'grid',
        gridTemplateColumns: '30% 60% 10%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
    },
    formFieldButton: {
        padding: '24px 29px 30px 22px',
    },
    btn: {
        borderRadius: 20,
    },
    divLabel: {
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            paddingRight: 10,
            paddingLeft: 0,
            justifyContent: 'start',
        },
        paddingRight: 30,
        justifyContent: 'end',
        alignItems: 'center',
    },
    label: {
        color: colorText,
        fontFamily: font,
        position: 'relative',
        textTransform: 'capitalize',
    },
    labelRequired: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -9,
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
        verticalAlign: 'middle',
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: 20,
        height: 35,
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            padding: '7px 14px',
        },
        marginTop: 12,
        marginBottom: 10,
    },
    autocompleteRoot: {
        verticalAlign: 'middle',
        display: 'inline-flex',
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            height: 36,
            padding: '0 1px',
        },
    },
}));

export default useStyles;
