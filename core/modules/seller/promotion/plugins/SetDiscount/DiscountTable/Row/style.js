import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY, TABLE_GRAY, PRIMARY_DARK, GRAY_LIGHT, TEXT_COLOR, ERROR,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const useStyles = makeStyles((theme) => ({
    rowItem: {
        '&.gray': {
            backgroundColor: TABLE_GRAY,
        },
        '&.borderbottom': {
            borderBottom: `1px solid ${GRAY_LIGHT}`,
        },
    },
    td: {
        color: TEXT_COLOR,
        fontFamily: font,
        fontSize: 13,
        padding: '10px 0px',
        backgroundColor: 'transparent',
        border: 'unset',
        '&.head': {
            cursor: 'pointer',
            border: `1px solid ${GRAY_LIGHT}`,
            padding: '5px 10px',
        },
        '&.child': {
            border: `1px solid ${GRAY_LIGHT}`,
        },
        '&.padding': {
            padding: '20px 10px',
        },
        '&.noborder': {
            borderColor: 'transparent',
        },
        '&.left': {
            paddingLeft: 10,
            paddingRight: 10,
        },
        '&.close': {
            padding: 0,
            borderColor: 'transparent',
        },
        '&.p10': {
            padding: '10px 0',
        },
        '&.p5': {
            padding: '5px 0',
        },
        '&.p0': {
            padding: 0,
        },
        '&.gray': {
            backgroundColor: TABLE_GRAY,
        },
        '&.noRight': {
            borderRight: 0,
        },
        '&.noLeft': {
            borderLeft: 0,
        },
        '& .bold': {
            fontWeight: 'bold',
        },
        '& .link': {
            '&:hover': {
                textDecoration: 'underline',
            },
        },
        '&.error': {
            color: ERROR,
        },
    },
    trash: {
        width: 15,
        height: 15,
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
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imgContainer: {
        border: `1px solid ${GRAY_LIGHT}`,
        borderRadius: 6,
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
        wordBreak: 'break-word',
    },
    divider: {
        minHeight: 60,
        display: 'flex',
        alignItems: 'center',
        borderLeft: `1px solid ${GRAY_LIGHT}`,
        padding: '0 10px',
        '&.center': {
            justifyContent: 'center',
            textAlign: 'center',
        },
        '&.child': {
            borderLeft: 'unset',
        },
    },
    textInput: {
        width: '100%',
        '&.table': {
            minWidth: 150,
        },
        '&.small': {
            width: 110,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            '&.full': {
                width: '100%',
            },
        },
        '& .MuiFormHelperText-root': {
            color: ERROR,
        },
        '&.border': {
            '& .MuiInput-root': {
                border: `1px solid ${GRAY_LIGHT}`,
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
        '& .MuiTypography-root': {
            color: PRIMARY_DARK,
            fontSize: 13,
            fontWeight: 'bold',
        },
        width: 60,
        display: 'flex',
        justifyContent: 'center',
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
    delimiter: {
        color: TEXT_COLOR,
        borderColor: GRAY_LIGHT,
        fontFamily: font,
        fontSize: 13,
        marginTop: 5,
        marginBottom: 5,
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
            width: 130,
            backgroundColor: TABLE_GRAY,
            borderRadius: 6,
            padding: 10,
            height: 42,
        },
        '& .MuiInputBase-input': {
            fontSize: 13,
            fontWeight: 600,
            color: PRIMARY_DARK,
        },
        '& .MuiAutocomplete-inputRoot': {
            height: 42,
            borderBottom: 'none',
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '&.border': {
            '& .MuiInput-root': {
                border: `1px solid ${GRAY_LIGHT}`,
            },
        },
    },
    adornmentDate: {
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
        width: 30,
        display: 'flex',
        justifyContent: 'center',
    },
}));

export default useStyles;
