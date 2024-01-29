import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY, TABLE_GRAY, PRIMARY_DARK, GRAY_LIGHT, TEXT_COLOR,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const useStyles = makeStyles((theme) => ({
    rowItem: {
        backgroundColor: 'transparent',
        '&.dark': {
            backgroundColor: TABLE_GRAY,
        },
        '& .borderTop': {
            borderTop: `1px solid ${GRAY_LIGHT}`,
            borderRadius: 6,
            '&.show': {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
            },
        },
        '& .borderRight': {
            borderRight: `1px solid ${GRAY_LIGHT}`,
        },
        '& .borderLeft': {
            borderLeft: `1px solid ${GRAY_LIGHT}`,
        },
        '& .borderBottom': {
            borderBottom: `1px solid ${GRAY_LIGHT}`,
        },
        '& .pointer': {
            cursor: 'pointer',
        },
    },
    td: {
        color: TEXT_COLOR,
        borderColor: GRAY_LIGHT,
        padding: '20px 0px',
        '&.p10': {
            padding: '10px 0',
        },
        '&.p0': {
            padding: 0,
        },
        '&.ph10': {
            padding: '10px 20px',
        },
        '&.pointer': {
            cursor: 'pointer',
        },
        '&.border': {
            padding: '20px 10px',
        },
        '&.dark': {
            color: PRIMARY_DARK,
            fontWeight: 'bold',
        },
        '&.black': {
            color: 'white',
            backgroundColor: TEXT_COLOR,
            padding: '0 10px',
        },
        '&.br': {
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
        },
        fontFamily: font,
        fontSize: 13,
        '& .trash img': {
            width: 15,
            height: 15,
        },
        '&.noborder': {
            borderColor: 'transparent',
        },
    },
    header: {
        cursor: 'pointer',
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
        '&.white': {
            '&.MuiCheckbox-colorSecondary.Mui-checked': {
                color: 'white',
            },
        },
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imgContainer: {
        border: `1px solid ${GRAY_LIGHT}`,
        borderRadius: 6,
        padding: 10,
        width: 'calc(100% - 0.1em)',
    },
    img: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: 80,
        [theme.breakpoints.down('md')]: {
            width: 80,
            height: 80,
        },
    },
    centerMd: {
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            justifyContent: 'center',
        },
    },
    break: {
        overflowWrap: 'break-word',
    },
    divider: {
        minHeight: 60,
        display: 'flex',
        alignItems: 'center',
        borderLeft: `1px solid ${GRAY_LIGHT}`,
        padding: '0 10px',
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
}));

export default useStyles;
