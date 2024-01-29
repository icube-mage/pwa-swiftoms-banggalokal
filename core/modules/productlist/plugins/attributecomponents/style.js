import { makeStyles } from '@material-ui/core/styles';

const colorText = '#536777';
const borderColor = '#DDE1EC';

const useStyles = makeStyles(() => ({
    fieldRoot: {
        verticalAlign: 'middle',
    },
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: '20px !important',
        height: 35,
        '&.disabled': {
            borderColor,
        },
        '& .MuiOutlinedInput-input': {
            padding: '7px 14px',
        },
    },
    fieldRootNote: {
        border: '1px solid',
        borderColor: colorText,
        borderRadius: '20px !important',
        '&.disabled': {
            borderColor,
        },
    },
    selectControl: {
        margin: '8px 0px',
    },
    autocompleteRoot: {
        verticalAlign: 'middle',
        display: 'inline-flex',
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            minHeight: 36,
            padding: '0 9px',
        },
    },
    imgGroup: {
        margin: 10,
        padding: '10px 0',
        textAlign: 'center',
    },
    imgContainer: {
        position: 'relative',
        border: '1px solid',
        borderColor,
        padding: 0,
        width: 210,
        height: 210,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        cursor: 'pointer',
    },
    img: {
        maxWidth: 200,
        maxHeight: 200,
        width: 'auto',
        height: 'auto',
        display: 'block',
        cursor: 'pointer',
    },
    trashIcon: {
        position: 'absolute',
        height: 25,
        width: 'auto',
        cursor: 'pointer',
        right: '5%',
        bottom: '5%',
    },
    typeContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 10,
        paddingRight: '10%',
        width: 200,
    },
    labelType: {
        backgroundColor: borderColor,
        borderRadius: 20,
        marginBottom: 10,
        marginRight: 10,
        padding: '5px 10px',
        width: 'fit-content',
        fontSize: 12,
        textTransform: 'capitalize',
    },
}));

export default useStyles;
