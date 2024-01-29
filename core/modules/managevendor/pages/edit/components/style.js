import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY, GRAY_BG, TEXT_COLOR } from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGray = '#B1BCDB';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 16px',
        borderRadius: 16,
        backgroundColor: 'unset',
        boxShadow: 'none',
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
        color: colorGray,
        fontSize: 12,
        textTransform: 'uppercase',
        margin: 0,
        marginBottom: 8,
        marginTop: 18,
    },
    formField: {
        padding: 0,
        paddingBottom: 16,
        display: 'grid',
        gridTemplateColumns: '40% 60%',
    },
    formFieldCol: {
        padding: 0,
        paddingBottom: 16,
    },
    formFieldButton: {
        padding: '0px 29px 30px 22px',
    },
    btn: {
        borderRadius: 20,
        marginRight: 10,
    },
    divLabel: {
        display: 'block',
    },
    label: {
        color: colorText,
        fontFamily: font,
        position: 'relative',
        '&.attach': {
            color: TEXT_COLOR,
        },
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
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 18,
    },
    fieldRoot: {
        width: '100%',
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
        '&.multi': {
            height: '100%',
            minHeight: 36,
        },
        '&.width-small': {
            width: 100,
        },
        '& .MuiInputBase-input.Mui-disabled': {
            cursor: 'not-allowed',
        },
    },
    notes: {
        display: 'inline-block',
        marginTop: 10,
    },
    autocompleteRoot: {
        width: 'calc(100% - 300px)',
        verticalAlign: 'middle',
        display: 'inline-flex',
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            minHeight: 36,
            padding: '0 9px',
        },
        [theme.breakpoints.down('xs')]: {
            width: 'calc(100% - 115px)',
        },
    },
    radioGroup: {
        '& .MuiRadio-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 13,
        },
        '& .MuiFormControlLabel-root': {
            marginBottom: 0,
        },
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    adornment: {
        '&.end': {
            borderRadius: 0,
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
        },
        '& .MuiTypography-root': {
            color: PRIMARY,
            fontSize: 13,
            fontWeight: 'bold',
        },
    },
    bgGray: {
        backgroundColor: GRAY_BG,
        padding: 20,
        borderRadius: 6,
        width: '90%',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    attachment: {
        width: 144,
        height: 144,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    imgBack: {
        width: 142,
        height: 142,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        borderRadius: 10,
        backgroundColor: GRAY_BG,
    },
}));

export default useStyles;
