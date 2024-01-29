import { makeStyles } from '@material-ui/core/styles';

const font = '"Roboto", "Helvetica", "Arial", sans-serif !important';
const grayBack = '#F5F7FB';
const borderColor = '#ECF0FB';
const colorText = '#435179';
const colorPurple = '#BE1F93';
const colorGray = '#8C98A2';
const colorLight = '#B1BCDB';
const colorGreen = '#41C328';

const useStyles = makeStyles(() => ({
    container: {
        fontFamily: font,
        borderRadius: 16,
        boxShadow: 'none',
        paddingBottom: 30,
    },
    topSection: {
        borderBottom: `1px solid ${borderColor}`,
        padding: 20,
    },
    centerDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mpTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colorText,
    },
    bottomSection: {
        padding: 40,
        display: 'grid',
        gridTemplateColumns: '4fr 1fr 4fr',
    },
    capabilty: {
        backgroundColor: grayBack,
        padding: '30px 40px',
        color: colorText,
        height: 'fit-content',
    },
    featuresContainer: {
        textAlign: 'left',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20%',
    },
    check: {
        color: colorGreen,
        fontSize: 20,
        marginRight: 5,
        fontWeight: 600,
    },
    capabilityImg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .connect': {
            width: 33,
            height: 'auto',
            marginRight: 25,
        },
        marginBottom: 20,
    },
    icon: {
        height: 60,
        width: 'auto',
    },
    form: {
        padding: '0 40px 0 60px',
    },
    formControl: {
        width: '100%',
        '& .MuiInputLabel-formControl': {
            textTransform: 'uppercase',
            color: colorLight,
            fontSize: 16,
        },
        '& .MuiSelect-select.MuiSelect-select': {
            fontSize: 14,
            fontFamily: font,
        },
        '&.disabled': {
            '& .MuiSelect-select.MuiSelect-select': {
                fontSize: 14,
                fontFamily: font,
                color: colorGray,
            },
        },
    },
    autocompleteRoot: {
        paddingTop: 20,
    },
    divider: {
        height: 20,
    },
    buttonStart: {
        padding: '10px 18px !important',
        borderRadius: '32px !important',
        fontSize: '16px !important',
    },
    fieldInput: {
        '& .MuiInputBase-input': {
            paddingTop: 20,
            width: '100%',
        },
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            height: 0,
        },
    },
    helperCreate: {
        paddingTop: 5,
        cursor: 'pointer',
        color: `${colorPurple} !important`,
        width: 'fit-content',
    },
}));

export default useStyles;
