import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, TABLE_GRAY, GRAY_LIGHT, PRIMARY, TEXT_COLOR, GREEN_HIGHLIGHT,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const useStyles = makeStyles((theme) => ({
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
    },
    table: {
        '& .first': {
            [theme.breakpoints.up('md')]: {
                paddingLeft: 40,
            },
        },
    },
    tr: {
        verticalAlign: 'top',
        '&.head': {
            backgroundColor: TABLE_GRAY,
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
    },
    rowItem: {
        backgroundColor: TABLE_GRAY,
        '&.dark': {
            backgroundColor: 'rgb(177, 188, 218, .4)',
        },
        '&.selected': {
            backgroundColor: GREEN_HIGHLIGHT,
        },
    },
    td: {
        color: TEXT_COLOR,
        borderColor: GRAY_LIGHT,
        '&.status': {
            textTransform: 'capitalize',
        },
        padding: '5px 10px',
        '&.change': {
            padding: '25px 10px',
            transition: '.4s',
        },
        '&.dark': {
            color: PRIMARY_DARK,
            fontWeight: 'bold',
        },
        fontFamily: font,
        fontSize: 13,
        '&.noborder': {
            borderBottom: '0px',
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
            border: `1px solid ${GRAY_LIGHT}`,
            borderRadius: 6,
            padding: '5px 10px',
            height: 30,
            backgroundColor: 'white',
            minWidth: 70,
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
                },
            },
            '& .MuiInput-root': {
                padding: 0,
                minWidth: 120,
            },
        },
        '& .MuiChip-root': {
            backgroundColor: 'transparent',
            border: `1px solid ${GRAY_LIGHT}`,
            borderRadius: 8,
        },
        '& .MuiChip-deleteIcon': {
            fill: PRIMARY_DARK,
        },
        '&.disabled': {
            '& .MuiInput-root': {
                backgroundColor: 'transparent',
                border: 0,
            },
        },
    },
    adornment: {
        backgroundColor: GRAY_LIGHT,
        padding: '15px 9px',
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
    },
    imgContainer: {
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 35,
        height: 35,
        '&.white': {
            backgroundColor: 'white',
        },
    },
    img: {
        maxWidth: 30,
        maxHeight: 30,
        width: 'auto',
        height: 'auto',
        display: 'block',
    },
    checkbox: {
        height: 18,
        width: 18,
        '&.MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '&.MuiCheckbox-root': {
            color: GRAY_LIGHT,
            borderRadius: 4,
        },
        '& .MuiSvgIcon-root': {
            height: 18,
            width: 18,
        },
    },
    controlLabel: {
        paddingLeft: 10,
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 13,
            fontWeight: 'bold',
            paddingLeft: 15,
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
            height: 22,
            width: 22,
        },
    },
    btn: {
        width: 'max-content',
        borderRadius: 6,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        borderColor: PRIMARY,
        padding: '7px 14px',
        height: 30,
        fontSize: 13,
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
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
        '&.disabled': {
            background: GRAY_LIGHT,
            color: 'white',
            borderColor: GRAY_LIGHT,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
            padding: '8px 15px',
        },
    },
}));

export default useStyles;
