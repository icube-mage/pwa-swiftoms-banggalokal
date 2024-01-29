import makeStyles from '@material-ui/core/styles/makeStyles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '16px 0',
        borderRadius: 16,
    },
    btnBack: {
        '&.buttonBack': {
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
    },
    nameGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridColumnGap: '25px',
    },
    titleTop: {
        fontSize: 24,
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            marginLeft: 18,
        },
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
    },
    formFieldButton: {
        padding: '24px 29px 30px 22px',
    },
    btn: {
        borderRadius: 20,
    },
    divLabel: {
        width: 300,
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            width: 140,
        },
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
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 29px 12px 22px',
    },
    fieldRoot: {
        width: 'calc(100% - 300px)',
        verticalAlign: 'middle',
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 140px)',
        },
    },
    fieldInput: {
        width: '100%',
        '&.fieldInputSpace': {
            marginTop: '20px',
        },
    },
    formControl: {
        '&.formControlSpace': {
            marginTop: '20px',
        },
    },
    passwordIndicator: {
        marginTop: '5px',
    },
    checkboxToggle: {
        '&.MuiCheckbox-colorSecondary.Mui-checked': {
            color: colorPurple,
        },
    },
    fieldPhoneContainer: {
        marginTop: 20,
        '& .form-control': {
            width: '100%',
            height: 40,
            border: 'none',
            borderBottom: '1px solid rgba(0, 0, 0, 0.54)',
            borderRadius: 0,
            '&:focus': {
                border: 'none',
                borderBottom: '2px solid black',
                boxShadow: 'none',
                '& .special-label': {
                    color: 'black',
                },
            },
        },
        '& .special-label': {
            padding: 0,
            position: 'unset',
            fontSize: 12,
            color: 'rgba(0, 0, 0, 0.54)',
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '0.00938em',
        },
        '& .flag-dropdown': {
            '& .flag': {
                marginTop: -5,
            },
        },
    },
    fieldPhoneRoot: {
        width: '100%',
    },
}));

export default useStyles;
