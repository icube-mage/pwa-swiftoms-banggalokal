/* eslint-disable max-len */

import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY, TABLE_GRAY, FONT_COLOR, PRIMARY_DARK, GRAY_LIGHT, WHITE, TEXT_COLOR,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const useStyles = makeStyles((theme) => ({
    tableToolbar: {
        '& .top-buttons-wrapper': {
            padding: '20px 20px 20px 30px',
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                display: 'block',
            },
            justifyContent: 'space-between',
            '&.nopad': {
                padding: '20px 0 0 0',
            },
        },
        '& .top-item-left': {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            [theme.breakpoints.down('sm')]: {
                display: 'block',
            },
        },
        '& .top-item-right': {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'right',
            justifyContent: 'end',
            [theme.breakpoints.down('sm')]: {
                display: 'block',
                textAlign: 'left',
            },
            '& .top-item': {
                [theme.breakpoints.down('sm')]: {
                    marginTop: 20,
                },
            },
        },
        '& .top-item': {
            display: 'inline-block',
            [theme.breakpoints.down('sm')]: {
                display: 'block',
                textAlign: 'left',
                '& .MuiPickersDateRangePickerInput-root': {
                    alignItems: 'inherit',
                },
            },
            marginRight: '12px',
            '& .MuiButton-text': {
                border: '1px solid',
                color: FONT_COLOR,
                textTransform: 'capitalize',
            },
        },
    },
    head: {
        display: 'flex',
        alignItems: 'center',
        '& .icon': {
            width: 18,
            height: 18,
        },
        '&.end': {
            [theme.breakpoints.down('sm')]: {
                justifyContent: 'end',
            },
            [theme.breakpoints.down('xs')]: {
                marginTop: 10,
                paddingLeft: 40,
            },
        },
    },
    expandContainer: {
        background: 'white',
        '& .filter-item': {
            border: `1px solid ${GRAY_LIGHT}`,
            color: GRAY_LIGHT,
            fontSize: 13,
            padding: '5px 10px',
            minHeight: 26,
            borderRadius: 4,
            margin: 10,
            marginTop: 0,
            display: 'flex',
            justifyContent: 'space-between',
            minWidth: 87,
            alignItems: 'center',
        },
    },
    expandGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 11fr',
        alignItems: 'baseline',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            marginTop: 10,
        },
    },
    expandContainerTab: {
        margin: '20px 0 10px 0',
    },
    btnTab: {
        background: 'transparent',
        boxShadow: 'none',
        border: `1px solid ${GRAY_LIGHT}`,
        fontSize: 13,
        color: PRIMARY_DARK,
        padding: '8px 18px',
        height: 32,
        borderRadius: 4,
        marginTop: 0,
        display: 'flex',
        justifyContent: 'space-between',
        minWidth: 87,
        '&:hover': {
            background: 'transparent',
            boxShadow: 'none',
            border: `1px solid ${GRAY_LIGHT}`,
        },
        '&.active': {
            background: PRIMARY,
            border: `1px solid ${PRIMARY}`,
            color: 'white',
            '&:hover': {
                background: PRIMARY,
                border: `1px solid ${PRIMARY}`,
                color: 'white',
            },
        },
        [theme.breakpoints.down('xs')]: {
            padding: 8,
        },
    },
    btnFilterText: {
        background: 'transparent',
        boxShadow: 'none',
        padding: 0,
        marginRight: 30,
        '&:hover': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderColor: 'transparent',
        },
        '& .MuiButton-label': {
            fontSize: 13,
            color: PRIMARY,
            fontWeight: 'bold',
        },
        whiteSpace: 'nowrap',
    },
    closeButton: {
        height: 16,
        width: 16,
        backgroundColor: GRAY_LIGHT,
        padding: 0,
        marginLeft: 15,
        '&:hover': {
            backgroundColor: GRAY_LIGHT,
        },
    },
    closeIcon: {
        height: 12,
        width: 12,
        color: 'white',
    },
    arrowDown: {
        transition: 'all .2s linear',
        transform: 'rotate(90deg)',
    },
    arrowUp: {
        transition: 'all .2s linear',
        transform: 'rotate(-90deg)',
    },
    paperHead: {
        boxShadow: '0px 3px 15px #4D2F821A',
        marginBottom: 20,
        padding: 30,
        borderRadius: 8,
        paddingBottom: 20,
    },
    tableContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 8,
        boxShadow: '0px 3px 15px #4D2F821A',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100vw',
            display: 'block',
            marginLeft: '0px',
            marginRight: '0px',
        },
        '&.footer': {
            marginTop: 20,
        },
    },
    checkAllContainer: {
        padding: '0px 30px',
        marginBottom: 10,
        color: PRIMARY_DARK,
        alignItems: 'center',
        '&.MuiGrid-spacing-xs-3': {
            width: '100%',
        },
    },
    controlLabel: {
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 13,
            [theme.breakpoints.down('sm')]: {
                fontSize: 12,
            },
            fontWeight: 'bold',
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
        },
    },
    rowPaper: {
        boxShadow: '0px 3px 15px #4D2F821A',
        marginBottom: 20,
        padding: 20,
        borderRadius: 8,
        color: PRIMARY_DARK,
        fontSize: 13,
    },
    divParent: {
        display: 'flex',
        alignItems: 'center',
    },
    rowHead: {
        display: 'flex',
        borderBottom: `2px inset ${TABLE_GRAY}`,
        padding: '0px 20px',
        marginBottom: 20,
        textTransform: 'none',
        '& .MuiCheckbox-colorSecondary.Mui-checked:hover': {
            backgroundColor: 'transparent !important',
        },
        '& .MuiIconButton-colorSecondary:hover': {
            backgroundColor: 'transparent !important',
        },
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            marginBottom: 20,
            paddingBottom: 10,
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
    divider: {
        display: 'flex',
        marginLeft: 5,
    },
    rowFooter: {
        padding: '0px 30px',
        fontWeight: 600,
    },
    rowBody: {
        display: 'flex',
    },
    rowGrid: {
        width: '-webkit-fill-available',
        '& .box': {
            [theme.breakpoints.down('xs')]: {
                borderRight: '0',
                borderBottom: `1px inset ${TABLE_GRAY}`,
                padding: 10,
            },
            borderRight: `1px inset ${TABLE_GRAY}`,
            padding: '0 10px',
            '& .title': {
                fontWeight: 'bold',
                marginBottom: 15,
            },
            margin: 10,
            '&:last-child': {
                borderColor: 'transparent',
            },
        },
        display: 'grid',
        gridTemplateColumns: '3fr 3fr 1fr 3fr 1fr 1fr',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '2fr 1fr 1fr',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
        '& .small': {
            maxWidth: 110,
        },
    },
    loading: {
        display: 'flex',
        color: PRIMARY_DARK,
        fontWeight: 600,
        justifyContent: 'center',
        padding: '20px 0',
    },
    tablePagination: {
        marginTop: 10,
        '& .MuiTablePagination-spacer': {
            display: 'none',
        },
        '& .MuiTablePagination-caption': {
            color: PRIMARY_DARK,
            fontWeight: 600,
        },
        '& .MuiTablePagination-select': {
            color: PRIMARY_DARK,
            fontWeight: 600,
            border: `1px solid ${GRAY_LIGHT}`,
            borderRadius: '8px',
            marginLeft: 10,
            paddingLeft: 15,
            paddingRight: 30,
        },
        '& .MuiTablePagination-toolbar': {
            display: 'grid',
            gridTemplateColumns: '0fr 0fr 2fr 7fr',
            [theme.breakpoints.up('xl')]: {
                gridTemplateColumns: '0fr 0fr 3fr 7fr',
            },
            [theme.breakpoints.down('md')]: {
                gridTemplateColumns: '0fr 0fr 1fr 6fr',
            },
            [theme.breakpoints.down('sm')]: {
                gridTemplateColumns: '0fr 0fr 0fr 6fr',
            },
            paddingTop: 15,
            paddingBottom: 15,
        },
    },
    paginationRoot: {
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
    },
    paginationAction: {
        '& .MuiPaginationItem-outlined': {
            borderColor: GRAY_LIGHT,
            color: GRAY_LIGHT,
            fontWeight: 600,
            '&:hover': {
                borderColor: PRIMARY_DARK,
                color: PRIMARY_DARK,
            },
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            borderColor: PRIMARY,
            color: PRIMARY,
            backgroundColor: 'transparent',
        },
        '& .MuiPagination-ul': {
            [theme.breakpoints.down('md')]: {
                flexWrap: 'nowrap',
            },
        },
        margin: '0 20px',
    },
    btnPagination: {
        background: PRIMARY,
        borderRadius: '10%',
        padding: '5px 12px',
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '& .MuiButton-label': {
            fontSize: 13,
        },
        '&.MuiButton-contained.Mui-disabled': {
            backgroundColor: GRAY_LIGHT,
            color: 'white',
        },
    },
    alignTop: {
        verticalAlign: 'top',
    },
    checkbox: {
        '&.MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '&.MuiCheckbox-root': {
            color: GRAY_LIGHT,
            borderRadius: 4,
            height: 'min-content',
        },
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        '&.nopad': {
            padding: 0,
        },
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
    headerTitle: {
        color: PRIMARY_DARK,
        fontSize: 20,
        fontWeight: 'bold',
    },
    textInput: {
        width: 280,
        [theme.breakpoints.down('sm')]: {
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
        '& .MuiAutocomplete-inputRoot': {
            height: 42,
            borderBottom: 'none',
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
    },
    iconImg: {
        padding: '0 5px 0 10px',
    },
    btnAction: {
        borderRadius: 6,
        background: 'unset',
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        borderColor: TABLE_GRAY,
        padding: '12px 15px',
        height: 42,
        '&:hover': {
            backgroundColor: TABLE_GRAY,
            boxShadow: 'none',
        },
        '&.check': {
            height: 32,
            background: 'white',
            borderColor: GRAY_LIGHT,
            color: PRIMARY_DARK,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: 'none',
            padding: '7px 15px',
            '&:hover': {
                backgroundColor: 'white',
                boxShadow: 'none',
                borderColor: GRAY_LIGHT,
            },
            '&.MuiButton-contained.Mui-disabled': {
                backgroundColor: GRAY_LIGHT,
                color: 'white',
            },
        },
    },
    btnFilter: {
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
        },
        '& .MuiListItem-button:hover': {
            background: TABLE_GRAY,
        },
        '& .MuiMenu-paper': {
            marginTop: 5,
        },
    },
    menuItem: {
        '&.parent': {
            color: `${PRIMARY_DARK} !important`,
            fontSize: '13px !important',
            backgroundColor: `${TABLE_GRAY} !important`,
            borderRadius: 6,
        },
        color: 'white !important',
        fontSize: '13px !important',
        backgroundColor: `${GRAY_LIGHT} !important`,
    },
    dateContainer: {
        display: 'flex',
        alignItems: 'center',
        background: TABLE_GRAY,
        borderRadius: 6,
        height: 42,
        padding: '13px 15px',
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
    checkboxOption: {
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: 'white',
        },
        '& .MuiCheckbox-root': {
            color: 'white',
            borderRadius: 4,
            padding: 10,
        },
        '& .MuiFormControlLabel-label': {
            fontSize: 13,
            [theme.breakpoints.down('sm')]: {
                fontSize: 12,
            },
        },
        '&.MuiFormControlLabel-root': {
            marginBottom: 0,
            height: 25,
        },
    },
    dialogContainer: {
        padding: '15px 20px',
        borderRadius: 8,
        position: 'relative',
        minWidth: 768,
        [theme.breakpoints.down('xs')]: {
            minWidth: 'unset',
        },
        '&.MuiDialog-paperWidthSm': {
            maxWidth: 'unset',
        },
        '& .MuiPickersStaticWrapper-root': {
            overflow: 'unset',
            [theme.breakpoints.up('sm')]: {
                minWidth: 562,
                height: 390,
            },
        },
        '& .MuiDialogContent-root': {
            overflowY: 'hidden',
            [theme.breakpoints.down('xs')]: {
                overflowY: 'auto',
            },
        },
        '& .MuiPickersDesktopDateRangeCalendar-arrowSwitcher': {
            background: GRAY_LIGHT,
            paddingBottom: 16,
            borderRadius: '6px 0 0 6px',
            '& h6': {
                fontWeight: 700,
            },
        },
        '& .MuiPickersDesktopDateRangeCalendar-rangeCalendarContainer + .MuiPickersDesktopDateRangeCalendar-rangeCalendarContainer .MuiPickersDesktopDateRangeCalendar-arrowSwitcher': {
            borderRadius: '0 6px 6px 0',
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
    },
    dialogTitleContainer: {
        textAlign: 'center',
        color: PRIMARY_DARK,
        '& .MuiTypography-root': {
            fontWeight: 'bold',
        },
        '& h2': {
            fontSize: 30,
        },
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
        },
    },
    btnTime: {
        marginBottom: 15,
        background: TABLE_GRAY,
        color: PRIMARY_DARK,
        letterSpacing: 0,
        padding: '0px 10px',
        boxShadow: 'none',
        marginRight: 10,
        '&.focus': {
            background: GRAY_LIGHT,
            color: WHITE,
        },
        '&:hover': {
            background: GRAY_LIGHT,
            color: WHITE,
        },
        '&:focus': {
            background: GRAY_LIGHT,
            color: WHITE,
        },
    },
    btnExport: {
        width: 200,
        padding: '12px 60px',
        fontSize: 15,
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
    btn: {
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
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '&.gray': {
            background: GRAY_LIGHT,
            borderColor: GRAY_LIGHT,
            '&:hover': {
                backgroundColor: TEXT_COLOR,
                boxShadow: 'none',
                borderColor: TEXT_COLOR,
            },
        },
    },
    btnDiv: {
        display: 'flex',
        gap: 20,
        [theme.breakpoints.down('sm')]: {
            marginTop: 10,
            justifyContent: 'right',
        },
    },
    action: {
        display: 'flex',
        gap: 20,
        alignItems: 'center',
    },
    link: {
        color: PRIMARY,
        '&:hover': {
            textDecoration: 'underline',
        },
        padding: 0,
        minWidth: 'min-content',
    },
    trashIcon: {
        height: 15,
        cursor: 'pointer',
    },
}));

export default useStyles;
