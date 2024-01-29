import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const borderColor = '#DDE1EC';

const useStyles = makeStyles((theme) => ({
    topPage: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingRight: 10,
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
        display: 'inline-block',
    },
    formFieldButton: {
        padding: '24px 29px 30px 22px',
    },
    container: {
        padding: '16px 0',
        borderRadius: 16,
        '& .MuiAccordionDetails-root': {
            display: 'block',
        },
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 29px 12px 22px',
    },
    formField: {
        display: 'grid',
        gridTemplateColumns: '30% 40% 30%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
        '&.block': {
            [theme.breakpoints.down('sm')]: {
                display: 'block',
            },
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            },
        },
        padding: 0,
        marginTop: 8,
        '& .MuiSvgIcon-root': {
            color: '#CCCCCC',
            width: 20,
            '&:hover': {
                color: 'unset',
            },
        },
    },
    divLabel: {
        display: 'flex',
        justifyContent: 'end',
        marginTop: '16px',
        textAlign: 'end',
        [theme.breakpoints.down('sm')]: {
            paddingRight: 10,
            paddingLeft: 0,
            justifyContent: 'start',
            textAlign: 'start',
        },
        paddingRight: 30,
    },
    label: {
        color: colorText,
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
            color: colorPurple,
            fontSize: 20,
        },
    },
    divField: {
        display: 'flex',
        flex: '0 0 100%',
        flexDirection: 'column',
    },
    fieldRoot: {
        verticalAlign: 'middle',
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: '20px !important',
        height: 35,
        margin: '7px 0px',
        '&.disabled': {
            borderColor,
        },
        '& .MuiOutlinedInput-input': {
            padding: '7px 14px',
        },
        '& .search': {
            color: 'unset !important',
        },
    },
    autocompleteRoot: {
        verticalAlign: 'middle',
        display: 'inline-flex',
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            height: 36,
            padding: '0 9px',
        },
    },
    helperText: {
        marginBottom: 0,
        marginTop: 0,
        fontSize: '10px',
    },
}));

export default useStyles;
