import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, TABLE_GRAY, PRIMARY_DARK,
} from '@theme_color';

const fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
const useStyles = makeStyles((theme) => ({
    input: {
        [theme.breakpoints.down('md')]: {
            width: '100%',
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
            backgroundColor: 'transparent',
            borderRadius: 6,
            width: 90,
        },
        '& .MuiInputBase-input': {
            fontFamily,
            fontSize: 13,
            fontWeight: 600,
            color: PRIMARY_DARK,
            textAlign: 'center',
        },
        '& .MuiAutocomplete-inputRoot': {
            height: 42,
            borderBottom: 'none',
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
    },
    head: {
        display: 'flex',
        alignItems: 'center',
        '& .MuiSvgIcon-root': {
            width: 18,
            height: 18,
        },
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
    divider: {
        display: 'flex',
        '&.space': {
            marginLeft: 5,
        },
        '&.slash': {
            '&::after': {
                content: "' / '",
                display: 'block',
                margin: '0 10px',
                [theme.breakpoints.down('xs')]: {
                    content: "''",
                },
            },
        },
        '&.primary': {
            color: `${PRIMARY} !important`,
            fontWeight: 600,
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: 5,
        },
    },
    imgContainer: {
        border: `1px solid ${TABLE_GRAY}`,
        marginBottom: 10,
    },
    img: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: 60,
    },

    btnAction: {
        borderRadius: 6,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        borderColor: PRIMARY,
        padding: '12px 15px',
        height: 42,
        fontSize: 13,
        fontWeight: 600,
        '&:active': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '&.gray': {
            background: TABLE_GRAY,
            borderColor: TABLE_GRAY,
            color: PRIMARY_DARK,
            '&:hover': {
                backgroundColor: TABLE_GRAY,
                boxShadow: 'none',
                borderColor: TABLE_GRAY,
            },
        },
    },
    menuAction: {
        '& .MuiMenuItem-root': {
            fontSize: 13,
            color: PRIMARY_DARK,
        },
        '& .MuiMenu-list': {
            borderRadius: 6,
            background: TABLE_GRAY,
            marginTop: 5,
        },
    },
    menuItem: {
        background: TABLE_GRAY,
        margin: 0,
    },
    arrowDown: {
        transition: 'all .2s linear',
        transform: 'rotate(90deg)',
    },
    arrowUp: {
        transition: 'all .2s linear',
        transform: 'rotate(-90deg)',
    },
    dateContainer: {
        display: 'flex',
        alignItems: 'center',
        background: TABLE_GRAY,
        borderRadius: 6,
        height: 42,
        padding: '13px 0px 13px 15px',
        '& .MuiTypography-body1': {
            margin: 0,
        },
        '& .MuiSvgIcon-root': {
            fill: PRIMARY_DARK,
            width: 17,
            height: 17,
        },
        '& .MuiPickersDay-root.Mui-selected': {
            backgroundColor: PRIMARY_DARK,
        },
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
        },
    },
    imgGrid: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: 40,
        width: 40,
    },
    plus: {
        margin: '0 10px',
    },
}));

export default useStyles;
