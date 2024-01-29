/* eslint-disable max-len */

import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY, TABLE_GRAY, FONT_COLOR, PRIMARY_DARK, GRAY_LIGHT, WHITE, BORDER_COLOR, BLACK, GRAY_BG,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    tableToolbar: {
        padding: '10px 30px',
        backgroundColor: GRAY_BG,
        borderRight: `1px solid ${BORDER_COLOR}`,
        borderLeft: `1px solid ${BORDER_COLOR}`,
        [theme.breakpoints.up('sm')]: {
            backgroundColor: '#ECF0F2',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '0px',
            border: 0,
        },
        '& .top-buttons-wrapper': {
            padding: '20px 20px 20px 30px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            '&.nopad': {
                padding: 0,
            },
        },
        '& .top-item-left': {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            [theme.breakpoints.down('sm')]: {
                display: 'block',
                width: '100%',
            },
        },
        '& .top-item-right': {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'right',
            justifyContent: 'end',
            flexWrap: 'wrap',
            [theme.breakpoints.down('md')]: {
                marginTop: 15,
            },
            [theme.breakpoints.down('sm')]: {
                flex: 1,
                textAlign: 'left',
                justifyContent: 'space-between',
            },
            '& .datepicker-container': {
                backgroundColor: WHITE,
                flex: 1,
                border: `1px solid ${BORDER_COLOR}`,
                borderRadius: 4,
                marginLeft: 0,
                [theme.breakpoints.down('xs')]: {
                    marginTop: 15,
                    marginBottom: 15,
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
            marginRight: 10,
            '&.right-10': {
                marginRight: 10,
            },
            '&.right-0': {
                marginRight: 0,
            },
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
        paddingBottom: 7,
    },
    expandContainer: {
        '& .filter-item': {
            border: `1px solid ${BORDER_COLOR}`,
            color: BLACK,
            backgroundColor: WHITE,
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
        gridGap: 10,
        '& div.MuiGrid-container': {
            marginTop: 17,
            [theme.breakpoints.down('xs')]: {
                marginTop: 5,
                marginBottom: 0,
            },
        },
    },
    expandContainerTab: {},
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
        justifyContent: 'flex-start',
        width: 100,
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
        boxShadow: 'unset',
        borderRadius: 8,
        paddingBottom: 0,
        '& > header': {},
    },
    tableContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 8,
        boxShadow: 'unset',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100vw',
            display: 'block',
            marginLeft: '0px',
            marginRight: '0px',
        },
        '&.footer': {
            paddingTop: 10,
            borderRadius: 0,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderTop: 0,
            border: `1px solid ${BORDER_COLOR}`,
            [theme.breakpoints.down('xs')]: {
                border: `1px solid ${BORDER_COLOR}`,
                paddingTop: 0,
                borderRadius: 8,
            },
        },
        '& .MuiTableCell-root': {
            border: 'none',
        },
    },
    checkAllContainer: {
        padding: '0px 30px',
        color: PRIMARY_DARK,
        alignItems: 'center',
        '&.MuiGrid-spacing-xs-3': {
            width: '100%',
        },
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
    },
    controlLabel: {
        '& .MuiFormControlLabel-label': {
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
            marginRight: 0,
        },
    },
    rowPaper: {
        boxShadow: 'unset',
        marginBottom: 20,
        padding: '10px 0 30px 0',
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: 4,
        color: PRIMARY_DARK,
        fontSize: 13,
        '&.sync': {
            paddingBottom: 10,
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: 10,
        },
    },
    rowHead: {
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
        [theme.breakpoints.down('xs')]: {
            marginBottom: 20,
            paddingBottom: 10,
            paddingLeft: 15,
            paddingRight: 15,

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
        padding: '0px 20px',
        '& .box': {
            [theme.breakpoints.down('xs')]: {
                borderRight: '0',
                borderBottom: `1px inset ${BORDER_COLOR}`,
                padding: 10,
            },
            borderRight: `1px inset ${BORDER_COLOR}`,
            padding: '0 20px',
            '& .title': {
                fontWeight: 'bold',
                marginBottom: 15,
            },
            '&:last-child': {
                borderColor: 'transparent',
            },
            cursor: 'pointer',
        },
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '2fr 1fr 1fr',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'block',
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
            borderRadius: 4,
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
        borderRadius: 4,
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
        },
    },
    header: {
        color: PRIMARY_DARK,
        fontSize: 20,
        fontWeight: 'bold',
        padding: '30px 0 0 30px',
        '&.nopad': {
            padding: 0,
        },
    },
    textInput: {
        width: 280,
        '&.full': {
            width: 430,
        },
        [theme.breakpoints.down('md')]: {
            '&.full': {
                width: 280,
            },
        },
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
            backgroundColor: WHITE,
            borderRadius: 4,
            padding: '5px 10px',
            border: `1px solid ${BORDER_COLOR}`,
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
        borderRadius: 4,
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
        borderRadius: 4,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        padding: '12px 15px',
        [theme.breakpoints.down('sm')]: {
            padding: '8px 15px',
            fontSize: 12,
        },
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
            backgroundColor: WHITE,
            borderColor: BORDER_COLOR,
            color: PRIMARY_DARK,
            '&:hover': {
                backgroundColor: WHITE,
                boxShadow: 'none',
                borderColor: BORDER_COLOR,
            },
            '&.filter': {
                [theme.breakpoints.down('xs')]: {
                    backgroundColor: PRIMARY,
                    color: WHITE,
                },
            },
        },
    },
    menuAction: {
        '& .MuiMenuItem-root': {
            fontSize: 13,
            color: PRIMARY_DARK,
        },
        '& .MuiMenu-list': {
            borderRadius: 4,
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
            borderRadius: 4,
        },
        color: 'white !important',
        fontSize: '13px !important',
        backgroundColor: `${GRAY_LIGHT} !important`,
    },
    dateContainer: {
        display: 'flex',
        alignItems: 'center',
        background: WHITE,
        borderRadius: 4,
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
            borderRadius: 4,
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
            minWidth: '100%',
            marginBottom: 0,
            height: 25,
        },
    },
    radioOption: {
        '& .MuiSvgIcon-root': {
            width: 16,
            height: 16,
        },
    },
    icon: {
        borderRadius: 3,
        width: 16,
        height: 16,
        border: `1px solid ${BORDER_COLOR}`,
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        border: 'none',
        backgroundColor: PRIMARY,
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage:
                "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath"
                + " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 "
                + "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: PRIMARY,
        },
    },
    dialogContainer: {
        padding: '15px 20px',
        borderRadius: 4,
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
            borderRadius: '4px 0 0 4px',
            '& h6': {
                fontWeight: 700,
            },
        },
        '& .MuiPickersDesktopDateRangeCalendar-rangeCalendarContainer + .MuiPickersDesktopDateRangeCalendar-rangeCalendarContainer .MuiPickersDesktopDateRangeCalendar-arrowSwitcher': {
            borderRadius: '0 4px 4px 0',
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
    table: {
        paddingTop: 20,
        backgroundColor: WHITE,
        border: `1px solid ${BORDER_COLOR}`,
        [theme.breakpoints.up('sm')]: {
            borderTop: 'unset',
        },
        [theme.breakpoints.down('xs')]: {
            backgroundColor: 'unset',
            border: 'unset',
            paddingTop: 0,
        },
    },
    tableBodyContainer: {
        [theme.breakpoints.up('sm')]: {
            padding: '0 30px',
        },
    },
    container: {
        borderTop: 'none',
        marginBottom: 20,
    },
    filterPopper: {
        backgroundColor: 'white',
        padding: 20,
        border: '1px solid #D2D9DF',
        borderRadius: 6,
        maxWidth: '100%',
        '& .filter-container': {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            overflow: 'visible',
        },
    },
    syncMobileBody: {
        '& .title': {
            fontSize: 11,
            fontWeight: 'bold',
            marginBottom: 10,
        },
        fontSize: 13,
        borderBottom: `2px inset ${TABLE_GRAY}`,
        marginBottom: 10,
        paddingBottom: 10,
        '&:last-child': {
            borderBottom: 0,
            marginBottom: 0,
            paddingBottom: 0,
        },
    },
    viewMoreDetail: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: PRIMARY,
        marginTop: 15,
        fontWeight: 'bold',
    },
    flexChannel: {
        display: 'flex',
        alignItems: 'center',
        gap: 5,
    },
    imgChannelContainer: {
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${BORDER_COLOR}`,
        padding: 3,
        justifyContent: 'center',
        borderRadius: '50%',
    },
    imgChannel: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: 12,
        width: 12,
    },
    filterContainer: {
        display: 'flex',
        '& div:nth-child(2)': {
            '@media (max-width: 500px)': {
                marginRight: 0,
            },
        },
    },
    selectContainer: {
        marginRight: 10,
    },
}));

export default useStyles;
