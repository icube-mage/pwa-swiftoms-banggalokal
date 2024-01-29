/* eslint-disable max-len */

import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    TABLE_GRAY, PRIMARY_DARK, GRAY_LIGHT, WHITE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    dialogContainer: {
        padding: '30px',
        borderRadius: 8,
        position: 'relative',
        minWidth: 'min-content',
        [theme.breakpoints.down('xs')]: {
            minWidth: 'unset',
            padding: 20,
        },
        '&.MuiDialog-paperWidthSm': {
            maxWidth: 'unset',
        },
        '& .MuiPickersStaticWrapper-root': {
            overflow: 'unset',
            [theme.breakpoints.up('sm')]: {
                minWidth: 562,
            },
            marginBottom: 30,
        },
        '& .MuiDialogContent-root': {
            overflowY: 'hidden',
            [theme.breakpoints.down('xs')]: {
                overflowY: 'auto',
            },
        },
        '& .MuiPickersDesktopDateRangeCalendar-arrowSwitcher': {
            background: GRAY_LIGHT,
            borderTopLeftRadius: 6,
            '& h6': {
                fontWeight: 700,
            },
            paddingTop: 10,
            paddingBottom: 10,
        },
        '& .MuiPickersDesktopDateRangeCalendar-rangeCalendarContainer + .MuiPickersDesktopDateRangeCalendar-rangeCalendarContainer .MuiPickersDesktopDateRangeCalendar-arrowSwitcher': {
            borderTopRightRadius: 6,
            borderTopLeftRadius: 0,
        },
        '& .MuiPickersArrowSwitcher-iconButton': {
            background: 'unset',
        },
        '& .MuiPickersCalendar-daysHeader span': {
            fontWeight: 700,
            color: PRIMARY_DARK,
        },
        '& .MuiPickersDesktopDateRangeCalendar-calendar': {
            minWidth: 'unset',
            maxHeight: 313,
            minHeight: 254,
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
        '& .MuiPickersCalendar-weekContainer': {
            backgroundColor: TABLE_GRAY,
        },
        '& .MuiPickersDesktopDateRangeCalendar-rangeCalendarContainer:not(:last-child)': {
            height: 344,
        },
    },
    dialogTitleContainer: {
        textAlign: 'center',
        color: PRIMARY_DARK,
        '& .MuiTypography-root': {
            fontWeight: 'bold',
        },
        '& h2': {
            fontSize: '1.5rem',
        },
        paddingBottom: 30,
    },
    content: {
        color: PRIMARY_DARK,
        fontSize: 14,
        paddingRight: 0,
        paddingLeft: 0,
        '& .title': {
            fontWeight: 600,
            marginBottom: 10,
        },
        '&.two-columns': {
            display: 'flex',
            padding: 0,
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            },
        },
        '&.MuiDialogContent-root': {
            overflowY: 'visible',
        },
    },
    closeButtonDialog: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: PRIMARY_DARK,
    },
    divPeriod: {
        width: 200,
        paddingLeft: 40,
        [theme.breakpoints.down('xs')]: {
            width: 'auto',
            paddingLeft: 0,
        },
    },
    btnGrid: {
        [theme.breakpoints.down('xs')]: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            '& hr': {
                display: 'none',
            },
        },
        '& hr': {
            marginBottom: 23,
            borderColor: TABLE_GRAY,
        },
    },
    btnTime: {
        fontSize: 13,
        marginBottom: 15,
        background: TABLE_GRAY,
        color: PRIMARY_DARK,
        letterSpacing: 0,
        padding: '4px 10px',
        boxShadow: 'none',
        marginRight: 10,
        '&.focus': {
            background: GRAY_LIGHT,
            color: WHITE,
        },
        '&:hover': {
            background: GRAY_LIGHT,
            color: WHITE,
            boxShadow: 'none',
        },
        '&:focus': {
            background: GRAY_LIGHT,
            color: WHITE,
        },
        transition: 'all .1s linear',
    },
    btnDone: {
        width: 200,
        height: 42,
        padding: '12px 60px',
        boxShadow: 'none',
        fontSize: 15,
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
    },
    contentBottom: {
        [theme.breakpoints.down('xs')]: {
            height: 175,
            '& > div': {
                display: 'flex',
                flexDirection: 'column-reverse',
            },
        },
        '&.MuiDialogContent-root': {
            paddingLeft: 0,
            overflowY: 'visible',
        },
    },
    infoDateRange: {
        display: 'inline-block',
        marginLeft: 20,
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            marginLeft: 0,
        },
        '& span': {
            color: PRIMARY_DARK,
        },
    },
}));

export default useStyles;
