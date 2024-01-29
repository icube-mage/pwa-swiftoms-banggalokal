import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY, TABLE_GRAY, FONT_COLOR, PRIMARY_DARK, GRAY_LIGHT, TEXT_COLOR, WHITE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    tableToolbar: {
        '& .top-buttons-wrapper': {
            display: 'flex',
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            },
            justifyContent: 'space-between',
        },
        '& .top-item-left': {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            },
            '&.header': {
                color: PRIMARY_DARK,
                fontSize: 20,
                fontWeight: 'bold',
            },
        },
        '& .top-item-right': {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'right',
            justifyContent: 'end',
            '& .outlined': {
                marginRight: '12px',
            },
            [theme.breakpoints.down('sm')]: {
                display: 'block',
                textAlign: 'right',
            },
            [theme.breakpoints.down('xs')]: {
                textAlign: 'left',
                '& .gray': {
                    marginRight: 8,
                },
            },
        },
        '& .top-item': {
            display: 'inline-block',
            [theme.breakpoints.down('xs')]: {
                marginTop: 20,
                '& .MuiPickersDateRangePickerInput-root': {
                    alignItems: 'inherit',
                },
            },
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
        padding: 30,
        borderRadius: 8,
        [theme.breakpoints.down('xs')]: {
            padding: 20,
        },
    },
    tableContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 8,
        boxShadow: '0px 3px 15px #4D2F821A',
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
    tableHead: {
        '& .MuiButton-label': {
            color: PRIMARY_DARK,
            fontWeight: 600,
        },
        '& .MuiTableCell-head': {
            color: PRIMARY_DARK,
            fontWeight: 600,
        },
        '& .MuiSvgIcon-root': {
            width: 20,
            height: 'auto',
        },
    },
    tableRow: {
        '&.gray': {
            backgroundColor: TABLE_GRAY,
        },
        '& .MuiTableCell-body': {
            color: PRIMARY_DARK,
            paddingTop: 15,
            paddingBottom: 10,
            fontSize: 14,
        },
        '& .MuiSvgIcon-root': {
            width: 20,
            height: 'auto',
        },
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
        color: PRIMARY_DARK,
        fontSize: 20,
        fontWeight: 'bold',
        padding: '30px 0 0 30px',
    },
    textInput: {
        width: 300,
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
        padding: '12px 30px',
        height: 42,
        fontSize: 13,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '&.outlined': {
            background: 'white',
            borderColor: PRIMARY,
            color: PRIMARY,
            '&:hover': {
                backgroundColor: 'white',
                boxShadow: 'none',
                borderColor: PRIMARY_DARK,
                color: PRIMARY_DARK,
            },
        },
    },
    checkedCount: {
        color: PRIMARY_DARK,
        fontSize: 14,
        fontWeight: 600,
        paddingLeft: 30,
        marginBottom: 10,
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
        color: `${TEXT_COLOR} !important`,
        fontSize: '13px !important',
        backgroundColor: `${TABLE_GRAY} !important`,
        borderRadius: 6,
    },
    checkboxOption: {
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: TEXT_COLOR,
        },
        '& .MuiCheckbox-root': {
            color: TEXT_COLOR,
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
        whiteSpace: 'pre',
        [theme.breakpoints.down('xs')]: {
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
}));

export default useStyles;
