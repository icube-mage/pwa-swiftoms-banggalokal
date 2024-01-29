import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY, TABLE_GRAY, FONT_COLOR, GRAY_LIGHT, TEXT_COLOR, WHITE, GRAY_TITLE, PRIMARY_DARK,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const useStyles = makeStyles((theme) => ({
    tableToolbar: {
        '& .top-buttons-wrapper': {
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                display: 'block',
                padding: 0,
            },
            justifyContent: 'space-between',
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
            [theme.breakpoints.down('xs')]: {
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
    arrowDown: {
        transition: 'all .2s linear',
        transform: 'rotate(90deg)',
    },
    arrowUp: {
        transition: 'all .2s linear',
        transform: 'rotate(-90deg)',
    },
    mainTable: {
        borderRadius: 8,
        border: `1px solid ${TABLE_GRAY}`,
        overflow: 'auto',
        background: WHITE,
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
        '& .MuiList-padding': {
            padding: 0,
        },
    },
    paperHead: {
        boxShadow: 'none',
        padding: '10px 0px',
        borderRadius: 8,
        [theme.breakpoints.down('xs')]: {
            padding: 20,
        },
    },
    tableContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 8,
        boxShadow: 'none',
        borderBottom: 0,
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100vw',
            marginLeft: '0px',
            marginRight: '0px',
        },
        '&.footer': {
            marginTop: 20,
        },
    },
    loading: {
        display: 'flex',
        color: TEXT_COLOR,
        fontFamily: font,
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
            color: TEXT_COLOR,
            fontWeight: 600,
        },
        '& .MuiTablePagination-select': {
            color: TEXT_COLOR,
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
            backgroundColor: TEXT_COLOR,
            boxShadow: 'none',
            borderColor: TEXT_COLOR,
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
    tableHead: {
        backgroundColor: TABLE_GRAY,
        '& .MuiButton-label': {
            color: TEXT_COLOR,
            fontWeight: 600,
        },
        '& .MuiTableCell-head': {
            color: TEXT_COLOR,
            fontWeight: 600,
        },
        '& .MuiSvgIcon-root': {
            width: 20,
            height: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            wordBreak: 'break-word',
        },
    },
    tableRow: {
        '& .MuiTableCell-body': {
            color: TEXT_COLOR,
            paddingTop: 15,
            paddingBottom: 10,
            fontSize: 14,
        },
        '& .MuiSvgIcon-root': {
            width: 20,
            height: 'auto',
        },
        wordBreak: 'break-word',
    },
    checkbox: {
        '&.MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '&.MuiCheckbox-root': {
            color: GRAY_LIGHT,
            borderRadius: 4,
        },
        marginLeft: 20,
    },
    header: {
        color: TEXT_COLOR,
        fontSize: 20,
        fontWeight: 'bold',
        padding: '30px 0 0 30px',
        '&.nopad': {
            padding: 0,
        },
    },
    fieldRoot: {
        [theme.breakpoints.up('md')]: {
            minWidth: 280,
        },
        verticalAlign: 'middle',
        '& .MuiOutlinedInput-input:-webkit-autofill': {
            padding: '7px 14px',
        },
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline:after': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            padding: '5px 10px',
            backgroundColor: TABLE_GRAY,
        },
        '& .MuiAutocomplete-inputRoot': {
            borderBottom: 'none',
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: TEXT_COLOR,
            fontSize: 13,
        },
    },
    fieldInput: {
        border: '1px solid',
        borderColor: TABLE_GRAY,
        borderRadius: 36,
        height: 36,
        '&.MuiOutlinedInput-input:-webkit-autofill': {
            height: 0,
        },
        '& .MuiInputBase-input': {
            fontSize: '.9rem',
        },
    },
    iconImg: {
        padding: '0 5px 0 10px',
    },
    sortButon: {
        marginLeft: -16,
        textAlign: 'left',
        '& .MuiButton-endIcon': {
            marginLeft: 0,
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
            backgroundColor: TEXT_COLOR,
            boxShadow: 'none',
            borderColor: TEXT_COLOR,
        },
        '&.outlined': {
            background: 'white',
            borderColor: PRIMARY,
            color: PRIMARY,
            '&:hover': {
                backgroundColor: 'white',
                boxShadow: 'none',
                borderColor: TEXT_COLOR,
                color: TEXT_COLOR,
            },
        },
    },
    checkedCount: {
        color: TEXT_COLOR,
        fontSize: 14,
        fontWeight: 600,
        paddingLeft: 30,
        paddingBottom: 10,
        background: WHITE,
    },
    menuAction: {
        '& .MuiMenuItem-root': {
            fontSize: 13,
            color: TEXT_COLOR,
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
        color: `${TEXT_COLOR} !important`,
        fontSize: '13px !important',
        backgroundColor: `${TABLE_GRAY} !important`,
        borderRadius: 6,
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
            backgroundColor: TEXT_COLOR,
            boxShadow: 'none',
            borderColor: TEXT_COLOR,
        },
        '&:hover': {
            backgroundColor: TEXT_COLOR,
            boxShadow: 'none',
            borderColor: TEXT_COLOR,
        },
        '&.gray': {
            background: TABLE_GRAY,
            borderColor: TABLE_GRAY,
            color: TEXT_COLOR,
            '&:hover': {
                backgroundColor: TABLE_GRAY,
                boxShadow: 'none',
                borderColor: TABLE_GRAY,
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
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
    btnFilterText: {
        background: 'transparent',
        boxShadow: 'none',
        padding: 0,
        marginRight: 10,
        width: 100,
        display: 'inline-block',
        textAlign: 'left',
        [theme.breakpoints.down('md')]: {
            marginBottom: 20,
        },
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
            color: TEXT_COLOR,
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
    dateContainer: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: 36,
        border: `1px solid ${GRAY_TITLE}`,
        height: 36,
        padding: '13px 15px',
        '& .MuiTypography-body1': {
            margin: 0,
        },
        '& .MuiSvgIcon-root': {
            fill: TEXT_COLOR,
            width: 17,
            height: 17,
        },
        '& .MuiPickersDay-root.Mui-selected': {
            backgroundColor: TEXT_COLOR,
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
            color: TEXT_COLOR,
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
