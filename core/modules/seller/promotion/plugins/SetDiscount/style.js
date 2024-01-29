import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, GRAY_LIGHT, TABLE_GRAY,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: 10,
        transition: 'all .2s linear',
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
    paper: {
        boxShadow: '0px 3px 15px #4D2F821A !important',
        padding: 30,
        borderRadius: '8px !important',
        marginBottom: 30,
    },
    headerContent: {
        '& .title': {
            color: PRIMARY_DARK,
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 0,
            marginBottom: 0,
        },
        display: 'grid',
        gridTemplateColumns: '4fr 8fr',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
    headerInput: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 1fr 1fr',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
        gap: 10,
        alignItems: 'center',
        justifyContent: 'end',
        '& .divider': {
            display: 'none',
            [theme.breakpoints.down('sm')]: {
                display: 'block',
                height: 20,
            },
        },
    },
    label: {
        '&.MuiFormLabel-root': {
            fontSize: 14,
            color: PRIMARY_DARK,
            fontWeight: 600,
        },
        position: 'relative',
        width: 'fit-content',
    },
    textInput: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
        '&.small': {
            minWidth: 110,
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
        '& .MuiTypography-root': {
            color: PRIMARY_DARK,
            fontSize: 13,
            fontWeight: 'bold',
        },
        width: 60,
        display: 'flex',
        justifyContent: 'center',
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
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
            padding: '8px 15px',
        },
    },
    dateRangeClass: {
        '& .MuiPickersDesktopDateRangeCalendar-arrowSwitcher': {
            background: GRAY_LIGHT,
            paddingBottom: 16,
            '& h6': {
                fontWeight: 700,
            },
        },
        '& .MuiPickersArrowSwitcher-iconButton': {
            background: 'unset',
        },
        '& .MuiPickersCalendar-daysHeader span': {
            fontWeight: 700,
            color: PRIMARY_DARK,
        },
        '& .MuiPickersDesktopDateRangeCalendar-calendar': {
            minHeight: 265,
        },
        '& .MuiPickersDateRangeDay-rangeIntervalDayPreview': {
            border: 0,
            padding: 2,
        },
        '& .MuiPickersDay-root': {
            fontWeight: 700,
            '&.Mui-disabled': {
                color: GRAY_LIGHT,
            },
        },
        '& .MuiPickersDateRangePickerInput-root': {
            justifyContent: 'end',
        },
    },
    dateContainer: {
        display: 'flex',
        alignItems: 'center',
        background: TABLE_GRAY,
        borderRadius: 6,
        height: 42,
        padding: '13px 15px',
        width: '100%',
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
        '&.MuiPickersDateRangePickerInput-root': {
            justifyContent: 'end',
        },
    },
    inputDate: {
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
}));

export default useStyles;
