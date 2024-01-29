import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const titleFont = 'normal normal bold 30px/37px "Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGray = '#B1BCDB';

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
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
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
        '&.top': {
            alignItems: 'unset',
        },
    },
    formFieldButton: {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '30% 60% 10%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
        padding: '10px 0px 30px 25px',
    },
    buttonContainer: {
        padding: '15px 29px 40px 22px',
    },
    btn: {
        borderRadius: 20,
        width: 'fit-content',
        '&.link': {
            marginRight: 10,
        },
    },
    divLabel: {
        display: 'block',
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
        borderColor: colorText,
        borderRadius: 20,
        height: 36,
    },
    fieldInputMultiline: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: 20,
    },
    autocompleteRoot: {
        width: '100%',
        verticalAlign: 'middle',
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            height: 36,
            padding: '0 9px',
        },
    },
    titleSmall: {
        fontFamily: font,
        color: colorGray,
        fontSize: 12,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 8,
        marginTop: 18,
    },
    paper: {
        borderRadius: 16,
    },
    dialogTitle: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    textTitle: {
        '& .MuiTypography-h6': {
            font: titleFont,
            color: colorPurple,
        },
        paddingBottom: 0,
    },
    content: {
        padding: 20,
    },
}));

export default useStyles;
