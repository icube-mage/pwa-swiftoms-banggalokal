import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, DISABLED, GRAY_LIGHT, TABLE_GRAY,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('sm')]: {
            padding: '0 10px',
        },
        paddingBottom: 5,
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
    formFieldsGrid: {
        display: 'grid',
        gridTemplateColumns: '20% 80%',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
        marginBottom: 10,
        alignItems: 'center',
        '&.start': {
            alignItems: 'flex-start',
        },
    },
    label: {
        '&.MuiFormLabel-root': {
            fontSize: 14,
            color: PRIMARY_DARK,
            fontWeight: 600,
            marginBottom: 10,
        },
        position: 'relative',
        width: 'fit-content',
        '&.disabled': {
            color: DISABLED,
        },
    },
    textInput: {
        width: '100%',
        '&.table': {
            minWidth: 150,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            '&.full': {
                width: '100%',
            },
        },
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            backgroundColor: TABLE_GRAY,
            borderRadius: 6,
            padding: '5px 10px',
        },
        '& .MuiInputBase-root.Mui-disabled': {
            backgroundColor: '#c4cfed',
        },
        '& .MuiInputBase-input.Mui-disabled': {
            cursor: 'not-allowed',
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
        '&.adorn': {
            '&.end': {
                '& .MuiInputBase-input': {
                    paddingLeft: 10,
                    height: 42,
                },
            },
            '& .MuiInput-root': {
                padding: 0,
                height: 42,
            },
        },
    },
    adornment: {
        backgroundColor: GRAY_LIGHT,
        padding: '21px 0px',
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        '&.end': {
            borderRadius: 0,
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
        },
        '& .MuiTypography-root': {
            color: PRIMARY_DARK,
            fontSize: 13,
            fontWeight: 'bold',
        },
        width: 60,
        display: 'flex',
        justifyContent: 'center',
    },
    controlLabel: {
        paddingLeft: 10,
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 13,
            fontWeight: 'bold',
            paddingLeft: 5,
        },
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '& .MuiCheckbox-root': {
            color: GRAY_LIGHT,
            borderRadius: 4,
        },
        '&.MuiFormControlLabel-root': {
            marginBottom: 0,
            color: PRIMARY_DARK,
        },
        '& .MuiSvgIcon-root': {
            height: 18,
            width: 18,
        },
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
    btn: {
        width: '100%',
        height: 40,
        borderRadius: 6,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        borderColor: PRIMARY,
        padding: '7px 14px',
        fontSize: 13,
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '&.disabled': {
            background: GRAY_LIGHT,
            color: 'white',
            borderColor: GRAY_LIGHT,
            '&.MuiButton-contained:hover.Mui-disabled': {
                background: GRAY_LIGHT,
                color: 'white',
                borderColor: GRAY_LIGHT,
            },
            '&.MuiButtonBase-root.Mui-disabled': {
                pointerEvents: 'unset',
                cursor: 'not-allowed',
            },
        },
        '&.outlined': {
            background: 'transparent',
            color: PRIMARY,
            '&:hover': {
                background: 'transparent',
                boxShadow: 'none',
                color: PRIMARY_DARK,
                borderColor: PRIMARY_DARK,
            },
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
            padding: '8px 15px',
        },
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
            minWidth: 300,
        },
    },
    totalDiv: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    flex: {
        padding: '5px 15px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'right',
        '&.dark': {
            backgroundColor: TABLE_GRAY,
            width: 'fit-content',
        },
        '& .border': {
            borderLeft: `1px solid ${GRAY_LIGHT}`,
            margin: '0 10px',
        },
    },
    totalText: {
        color: PRIMARY_DARK,
        fontWeight: 600,
        '& .title': {
            fontSize: 13,
        },
        '& .total': {
            fontSize: 16,
        },
    },
    noPadding: {
        '&.MuiGrid-item': {
            padding: 0,
        },
    },
    pb10Xs: {
        [theme.breakpoints.down('xs')]: {
            paddingBottom: 10,
        },
    },
}));

export default useStyles;
