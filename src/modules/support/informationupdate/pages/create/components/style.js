import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';

const useStyles = makeStyles((theme) => ({
    container1: {
        padding: '16px 0',
        borderRadius: 16,
        width: '60%',
        display: 'inline-block',
        [theme.breakpoints.down('md')]: {
            width: '60%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            margin: 5,
        },
    },
    container2: {
        padding: '16px 0',
        borderRadius: 16,
        width: '17%',
        display: 'inline-block',
        verticalAlign: 'top',
        marginLeft: '1%',
        [theme.breakpoints.down('md')]: {
            width: '30%',
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: 20,
            width: '100%',
        },
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
    title: {
        fontFamily: font,
        color: colorText,
        fontSize: 14,
        textTransform: 'uppercase',
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
        display: 'grid',
        alignItems: 'center',
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
            position: 'relative',
            top: 0,
            right: -5,
            color: colorPurple,
            fontSize: 20,
            fontWeight: 600,
        },
    },
    content: {
        padding: '10px 29px 12px 22px',
    },
    fieldRoot: {
        width: '100%',
        marginTop: 10,
        border: '1px #c6c6c6 solid',
        padding: 10,
        fontFamily: 'Arial, Helvetica, sans-serif',
    },
    fieldRootArea: {
        width: '100%',
        marginTop: 10,
        resize: 'none',
        height: 150,
        border: '1px #c6c6c6 solid',
        padding: 10,
        fontFamily: 'Arial, Helvetica, sans-serif',
    },
    fieldRootDesc: {
        [theme.breakpoints.down('xs')]: {
            verticalAlign: 'top',
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: 20,
        height: 36,
    },
    labelNote: {
        verticalAlign: 'top',
        marginTop: 10,
    },
    notes: {
        display: 'inline-block',
        marginTop: 10,
    },
    autocompleteRoot: {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            height: 36,
            padding: '0 9px',
        },
    },
    autocompleteMulti: {
        '& .MuiOutlinedInput-root': {
            height: 'auto',
            paddingTop: 8,
            paddingBottom: 8,
        },
    },
    tooltip: {
        display: 'block',
    },
    tooltipWidth: {
        maxWidth: 200,
    },
    radioGroup: {
        '& .MuiRadio-colorSecondary.Mui-checked': {
            color: colorPurple,
        },
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 13,
        },
    },
    marginSection: {
        marginBottom: 20,
    },
    imageUpload: {
        border: '1px #ccc solid',
        borderRadius: 5,
        background: '#f5f5f5',
        width: '100%',
        textAlign: 'center',
        color: '#ccc',
        cursor: 'pointer',
        padding: 10,
    },
}));

export default useStyles;
