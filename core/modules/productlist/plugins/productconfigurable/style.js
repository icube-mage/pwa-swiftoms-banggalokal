import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const borderColor = '#DDE1EC';

const useStyles = makeStyles((theme) => ({
    fieldInputSquare: {
        height: 35,
        '&.disabled': {
            borderColor,
        },
        '& .MuiOutlinedInput-input': {
            padding: '7px 14px',
        },
    },
    optionTop: {
        alignItems: 'center',
        marginBottom: 20,
    },
    optionButton: {
        textAlign: 'right',
        marginTop: 10,
    },
    optionContainer: {
        borderBottom: '1px solid #C4C4C4',
        padding: 10,
        paddingBottom: 0,
        marginBottom: 10,
    },
    stepper: {
        '&.MuiStepper-root': {
            paddingLeft: 0,
        },
        '& .MuiStepLabel-label': {
            [theme.breakpoints.down('xs')]: {
                display: 'none',
            },
        },
        '& .MuiStepIcon-root.MuiStepIcon-active': {
            color: colorPurple,
        },
        '& .MuiStepLabel-label.MuiStepLabel-active': {
            color: colorPurple,
        },
        '& .MuiStepIcon-root.MuiStepIcon-completed': {
            color: colorPurple,
        },
    },
    title: {
        color: colorPurple,
        fontFamily: font,
        fontSize: 24,
        margin: 0,
        marginBottom: 10,
    },
    attributeTitle: {
        fontFamily: font,
        fontSize: 16,
        color: colorText,
    },
    attributeValues: {
        fontFamily: font,
        fontSize: 14,
    },
    formControl: {
        '& .MuiFormControl-root': {
            display: 'block',
            border: '1px solid black',
            marginBottom: 40,
            padding: 20,
            width: '50%',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
    },
    formGroup: {
        padding: 10,
        display: 'grid !important',
        gridTemplateColumns: 'repeat(3,1fr)',
        [theme.breakpoints.down('xs')]: {
            padding: 0,
            gridTemplateColumns: 'repeat(2,1fr)',
        },
        '& .MuiFormControlLabel-root': {
            marginBottom: 10,
        },
    },
    legend: {
        fontFamily: font,
        fontSize: 24,
        color: colorText,
    },
    attLabel: {
        fontFamily: font,
        fontSize: 16,
        color: colorText,
    },
    divider: {
        borderBottom: `1px solid ${colorText}`,
        width: '100%',
        margin: '20px 0 10px 0',
    },
    formControl2: {
        '&.MuiFormControl-root': {
            width: '100% !important',
        },
    },
    radioGroup: {
        '& .MuiRadio-colorSecondary.Mui-checked': {
            color: colorPurple,
        },
        '& .MuiFormControlLabel-label': {
            color: colorText,
            fontFamily: font,
            fontSize: 14,
        },
        '& .MuiFormControlLabel-root': {
            marginBottom: '0px !important',
        },
    },
    addField: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 2fr',
        [theme.breakpoints.down('xs')]: {
            padding: 0,
            gridTemplateColumns: 'repeat(2,1fr)',
        },
        '& .MuiFormControl-root': {
            display: 'block',
            border: 'none',
            marginBottom: 0,
            marginTop: 10,
            padding: 0,
            width: '100%',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
    },
    // img
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
    errors: {
        color: 'red',
        paddingLeft: 15,
    },
    // price
    gridAttribute: {
        display: 'grid',
        gridTemplateColumns: '10% 30% 10%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
    },
    divLabel: {
        display: 'inline-block',
        [theme.breakpoints.down('xs')]: {
            paddingRight: 10,
            paddingLeft: 0,
        },
        paddingRight: 30,
        paddingTop: 10,
        textAlign: 'right',
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
    fieldRoot: {
        verticalAlign: 'middle',
    },
    fieldInput: {
        border: '1px solid',
        borderRadius: '20px !important',
        height: 35,
        '&.disabled': {
            borderColor,
        },
        '& .MuiOutlinedInput-input': {
            padding: '7px 14px',
        },
    },
    fieldInputAdd: {
        border: '1px solid',
        borderRadius: '20px !important',
        height: 35,
        '&.disabled': {
            borderColor,
        },
        '& .MuiOutlinedInput-input': {
            padding: '7px 14px',
        },
        width: '100%',
    },
    fieldInputSelect: {
        border: '1px solid',
        borderRadius: '20px !important',
        height: 35,
        '&.disabled': {
            borderColor,
        },
        '& .MuiOutlinedInput-input': {
            padding: '7px 14px',
        },
        width: '200px',
    },
    selectControl: {
        margin: '8px 0px',
    },
    // table render
    imgThumbContainer: {
        height: 50,
        width: 50,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    },
    imgThumb: {
        height: '90%',
        width: 'auto',
    },
    attLabelGrid: {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '1fr 1fr',
        width: 300,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    attLabelGridText: {
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '1fr 1fr',
        width: 500,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    dialogFull: {
        '& .MuiDialog-paperFullWidth': {
            height: '100%',
        },
        '& .MuiTypography-h6': {
            color: colorPurple,
            fontWeight: 'bold',
        },
    },
    circular: {
        marginTop: '20%',
        '& .MuiCircularProgress-colorPrimary': {
            color: colorPurple,
        },
        display: 'flex',
        justifyContent: 'center',
    },
    errorHtml: {
        backgroundColor: '#F9E5E4',
        color: '#B30100',
        padding: '15px 10px',
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
        '& a': {
            color: '#408AC0',
        },
    },
    tr: {
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
        verticalAlign: 'top',
    },
    th: {
        textAlign: 'left',
        padding: '5px 8px',
        color: '#435179',
    },
    td: {
        padding: '5px 8px',
        fontFamily: font,
    },
    errorText: {
        color: '#ff1744',
        fontSize: '0.75rem',
    },
}));

export default useStyles;
