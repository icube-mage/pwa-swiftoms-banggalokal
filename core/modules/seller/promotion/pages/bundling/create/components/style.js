import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, DISABLED, GRAY_LIGHT, GRAY_BG, TEXT_COLOR, TABLE_GRAY, ERROR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: 10,
    },
    paper: {
        boxShadow: '0px 3px 15px #4D2F821A !important',
        padding: 30,
        borderRadius: '8px !important',
        marginBottom: 30,
        '&.step': {
            padding: '30px 20%',
            [theme.breakpoints.down('sm')]: {
                padding: '30px 0',
            },
        },
    },
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        '& .MuiIconButton-root': {
            padding: 0,
            paddingRight: 10,
        },
        '& .MuiSvgIcon-root': {
            fill: PRIMARY_DARK,
            height: 30,
            width: 'auto',
        },
        '& .MuiIconButton-root:hover': {
            background: 'none',
        },
        marginBottom: 20,
        '& .title': {
            color: PRIMARY_DARK,
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 0,
            marginBottom: 0,
        },
    },
    title: {
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 0,
        '&.paper': {
            marginBottom: 30,
        },
    },
    btn: {
        borderRadius: 6,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        borderColor: PRIMARY,
        padding: '12px 30px',
        height: 42,
        fontSize: 15,
        width: '100%',
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
            padding: '8px 15px',
        },
        marginBottom: 20,
    },
    formFieldsGrid: {
        display: 'grid',
        gridTemplateColumns: '20% 80%',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
        marginBottom: 20,
        alignItems: 'center',
        '&.start': {
            alignItems: 'flex-start',
        },
        '& .right': {
            justifyContent: 'flex-end',
            display: 'flex',
            gap: 15,
            alignItems: 'center',
            marginBottom: 10,
        },
    },
    label: {
        '&.MuiFormLabel-root': {
            fontSize: 14,
            color: PRIMARY_DARK,
            fontWeight: 600,
            [theme.breakpoints.down('sm')]: {
                marginBottom: 10,
            },
        },
        position: 'relative',
        width: 'fit-content',
        '&.disabled': {
            color: DISABLED,
        },
    },
    labelLoc: {
        '&.MuiFormLabel-root': {
            fontSize: 14,
            color: PRIMARY_DARK,
            fontWeight: 600,
            textAlign: 'end',
        },
    },
    required: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -3,
            right: -9,
            color: PRIMARY,
            fontSize: 16,
        },
    },
    stepper: {
        color: PRIMARY_DARK,
        '&.MuiPaper-root': {
            backgroundColor: 'transparent',
        },
        '&.MuiStepper-root': {
            padding: 0,
        },
        '& .MuiStepLabel-label': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
        '& .MuiStepIcon-root': {
            color: ' white',
            borderRadius: '50%',
            border: `1px solid ${PRIMARY_DARK}`,
            height: 30,
            width: 30,
        },
        '& .MuiStepIcon-text': {
            fill: PRIMARY_DARK,
        },
        '& .MuiStepIcon-root.MuiStepIcon-active': {
            color: PRIMARY_DARK,
            '& .MuiStepIcon-text': {
                fill: 'white',
            },
            border: '0',
        },
        '& .MuiStepIcon-root.MuiStepIcon-completed': {
            color: PRIMARY_DARK,
            borderRadius: 'unset',
            border: '0',
        },
        '& .MuiStepLabel-iconContainer.MuiStepLabel-alternativeLabel': {
            color: PRIMARY_DARK,
            fill: 'white',
        },
        '& .MuiStepLabel-label.MuiStepLabel-active': {
            color: PRIMARY_DARK,
            borderRadius: 'unset',
            border: '0',
        },
        '& .MuiStepLabel-label.MuiStepLabel-completed': {
            color: PRIMARY_DARK,
        },
        '&.disabled': {
            '& .MuiStepLabel-iconContainer.MuiStepLabel-alternativeLabel': {
                color: PRIMARY_DARK,
                fill: 'white',
            },
        },
    },
    textInput: {
        width: '100%',
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            backgroundColor: GRAY_BG,
            borderRadius: 6,
            padding: '5px 10px',
        },
        '& .MuiAutocomplete-inputRoot': {
            minHeight: 42,
            borderBottom: 'none',
            paddingTop: 10,
            paddingBottom: 10,
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-root.Mui-disabled': {
            backgroundColor: '#c4cfed',
        },
        '& .MuiInputBase-input.Mui-disabled': {
            cursor: 'not-allowed',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
    },
    textNumber: {
        width: 90,
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            height: 36,
            backgroundColor: 'transparent',
            borderRadius: 8,
            border: `1px solid ${GRAY_LIGHT}`,
        },
    },
    adornment: {
        padding: 0,
        '& .MuiTypography-root': {
            color: PRIMARY_DARK,
            fontSize: 18,
            fontWeight: 'bold',
            justifyContent: 'center',
        },
        '& .button': {
            color: PRIMARY_DARK,
            '&.MuiIconButton-root:hover': {
                backgroundColor: 'transparent',
            },
            '&.MuiIconButton-root': {
                padding: '12px 5px',
            },
        },
    },

    containerImg: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
        },
    },
    btnImg: {
        borderRadius: 6,
        backgroundColor: GRAY_BG,
        textTransform: 'none',
        color: PRIMARY_DARK,
        height: 106,
        width: 106,
        boxShadow: 'none',
        border: `1px solid ${GRAY_LIGHT}`,
        borderStyle: 'dashed',
        '&:hover': {
            backgroundColor: GRAY_BG,
            boxShadow: 'none',
        },
        [theme.breakpoints.down('xs')]: {
            '&.MuiButton-label': {
                fontSize: 12,
            },
            margin: '5px 0px',
        },
        '& .MuiButton-label': {
            display: 'block',
            justifyContent: 'center',
        },
        '&.error': {
            border: '1px solid red',
        },
    },
    textFile: {
        color: PRIMARY_DARK,
        fontSize: 12,
        textAlign: 'center',
        width: '100%',
    },
    icon: {
        height: 40,
        width: 40,
    },
    imgGroup: {
        margin: 10,
        textAlign: 'center',
        width: 106,
    },
    imgContainer: {
        position: 'relative',
        border: `1px solid ${GRAY_LIGHT}`,
        borderStyle: 'dashed',
        padding: 0,
        width: 106,
        height: 106,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    img: {
        maxWidth: 100,
        maxHeight: 100,
        width: 'auto',
        height: 'auto',
        display: 'block',
    },
    fileName: {
        verticalAlign: 'middle',
        color: PRIMARY_DARK,
        fontSize: 12,
        textAlign: 'center',
        width: 110,
        marginTop: 5,
    },
    tableContainer: {
        borderRadius: 6,
        '&::-webkit-scrollbar': {
            height: '.6em',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 2px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: GRAY_LIGHT,
            borderRadius: 5,
        },
        border: `1px solid ${GRAY_LIGHT}`,
        marginTop: 20,
        '&.error': {
            border: `1px solid ${ERROR}`,
        },
    },
    rowItem: {
        backgroundColor: 'transparent',
        '&.dark': {
            backgroundColor: TABLE_GRAY,
        },
    },
    tr: {
        verticalAlign: 'top',
        '&.head': {
            height: 45,
        },
        padding: '0 20px',
        borderColor: 'transparent',
    },
    th: {
        textAlign: 'left',
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        padding: '10px 10px',
        '&.fix': {
            width: 30,
        },
    },
    td: {
        color: TEXT_COLOR,
        borderColor: GRAY_LIGHT,
        padding: '20px 0',
        '&.border': {
            padding: '20px 10px',
        },
    },
    divider: {
        minHeight: 60,
        display: 'flex',
        alignItems: 'center',
        borderLeft: `1px solid ${GRAY_LIGHT}`,
        padding: '0 10px',
    },
    checkbox: {
        height: 20,
        width: 20,
        '&.MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '&.MuiCheckbox-root': {
            color: GRAY_LIGHT,
            borderRadius: 4,
        },
        '& .MuiSvgIcon-root': {
            height: 20,
            width: 20,
        },
    },
    error: {
        color: ERROR,
    },
    switch: {
        '&.MuiFormControlLabel-root': {
            marginTop: 10,
        },
    },
}));

export default useStyles;
