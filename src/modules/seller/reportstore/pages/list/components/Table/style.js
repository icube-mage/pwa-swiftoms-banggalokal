/* eslint-disable object-curly-newline */
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY, WHITE, BORDER_COLOR, BLACK, GRAY_LIGHT, PRIMARY_DARK,
    PRIMARY_DARK_OLD, GRAY_LIGHT3, WHITE_IMPORTANT,
} from '@theme_color';

const colorText = BLACK;
const iconFont = '#435179';

const useStyles = makeStyles((theme) => ({
    tableToolbar: {
        '& .top-buttons-wrapper': {
            padding: '16px 0',
            paddingBottom: 27,
            textAlign: 'right',
            [theme.breakpoints.down('xs')]: {
                padding: 16,
            },
        },
        '& .records-found': {
            padding: '12px 0',
            float: 'left',
            [theme.breakpoints.down('xs')]: {
                textAlign: 'left',
            },
            '& h2': {
                [theme.breakpoints.down('xs')]: {
                    fontSize: 14,
                },
            },
        },
        '& .top-item': {
            display: 'inline-block',
            '& button': {
                fontSize: 12,
            },
        },
        '& .top-item.records-found': {
            textAlign: 'initial',
            [theme.breakpoints.down('xs')]: {
                display: 'block',
                float: 'none',
            },
        },
        '& .boxColumn': {
            display: 'inline-block',
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            },
        },
        '& .MuiCollapse-wrapperInner .col-filter': {
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
            '& .MuiAutocomplete-root': {
                [theme.breakpoints.down('xs')]: {
                    width: '100% !important',
                },
            },
        },
        '& .MuiCollapse-wrapperInner .col-filter .MuiTextField-root': {
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            },
        },
    },
    btn: {
        borderRadius: 4,
        color: colorText,
        borderColor: BORDER_COLOR,
        padding: '9px 16px',
        fontWeight: 700,
        background: WHITE,
        '&:hover': {
            background: WHITE,
        },
        '& .btnIcon': {
            width: 15,
            height: 'auto',
            marginRight: 10,
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
        overflowX: 'scroll',
        background: WHITE,
        borderRadius: '6px 6px 0 0',
        border: `1px solid ${BORDER_COLOR}`,
        borderBottom: 0,
        [theme.breakpoints.down('xs')]: {
            margin: 16,
            background: 'unset',
            border: 0,
            marginBottom: 0,
        },
    },

    tableContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        marginLeft: 'auto',
        marginRight: 'auto',
        background: 'unset',
        boxShadow: 'none',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100vw',
            display: 'block',
            marginLeft: '0px',
            marginRight: '0px',
            maxHeight: 'calc(100% - 140px)',
        },
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
    },
    divFilter: {
        background: WHITE,
        marginBottom: 20,
        borderRadius: 6,
        border: `1px solid ${BORDER_COLOR}`,
        [theme.breakpoints.down('xs')]: {
            margin: '0 15px',
        },
    },
    loading: {
        display: 'flex',
        color: iconFont,
        fontWeight: 600,
        justifyContent: 'center',
        padding: '20px 0',
    },
    alignTop: {
        verticalAlign: 'top',
    },
    fieldRoot: {
        width: '100%',
        verticalAlign: 'middle',
        marginTop: 10,
    },
    fieldInput: {
        '& .MuiInputBase-input': {
            padding: '8.5px 14px',
        },
        borderRadius: 20,
        width: '100%',
        minWidth: 400,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
        '&.MuiInput-underline:before': {
            display: 'none',
        },
        '&.MuiInput-underline:after': {
            display: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            fontSize: 14,
        },
    },
    search: {
        border: '1px solid',
        borderColor: '#B1BCDB',
        borderRadius: 20,
        backgroundColor: 'white',
        width: 'auto',
        display: 'flex',
        flexDirection: 'row',
        height: 36,
        marginBottom: 10,
    },
    searchIcon: {
        paddingLeft: 16,
        height: '100%',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1,
        color: PRIMARY,
    },
    sortableHead: {
        marginLeft: -16,
        textAlign: 'left',
        color: 'rgba(0, 0, 0, 0.87)',
    },
    tableFooter: {
        background: WHITE,
        borderRadius: '0 0 6px 6px',
        border: `1px solid ${BORDER_COLOR}`,
        borderTop: 0,
        [theme.breakpoints.down('xs')]: {
            marginBottom: 30,
            background: 'unset',
            border: 0,
        },
        '& .MuiTableFooter-root': {
            [theme.breakpoints.down('xs')]: {
                display: 'block',
                margin: '0 15px',
                border: `1px solid ${BORDER_COLOR}`,
                borderRadius: 6,
                background: WHITE,
            },
        },
    },
    tablePagination: {
        marginTop: 10,
        '& .MuiTablePagination-spacer': {
            display: 'none',
        },
        '& .MuiTablePagination-caption': {
            color: BLACK,
            fontWeight: 600,
        },
        '& .MuiTablePagination-select': {
            color: BLACK,
            fontWeight: 600,
            border: `1px solid ${GRAY_LIGHT}`,
            borderRadius: 6,
            marginLeft: 10,
            paddingLeft: 15,
            paddingRight: 30,
        },
        '& .MuiTablePagination-toolbar': {
            display: 'grid',
            gridTemplateColumns: '0fr 0fr 2fr 7fr',
            paddingRight: 24,
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
                borderColor: BLACK,
                color: BLACK,
            },
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            borderColor: BORDER_COLOR,
            color: BLACK,
            backgroundColor: 'transparent',
            fontWeight: 700,
        },
        margin: '0 10px',
    },
    btnPagination: {
        background: PRIMARY,
        borderRadius: 8,
        padding: '5px 12px',
        minWidth: 'unset',
        width: 26,
        height: 26,
        '&:hover': {
            backgroundColor: PRIMARY_DARK_OLD,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK_OLD,
        },
        '& .MuiButton-label': {
            fontSize: 13,
        },
        '&.MuiButton-contained.Mui-disabled': {
            backgroundColor: GRAY_LIGHT3,
            color: 'white',
        },
    },
    tableHead: {
        '& .MuiButton-label': {
            color: PRIMARY_DARK,
            fontWeight: 600,
        },
        '& .MuiTableCell-head': {
            color: PRIMARY_DARK,
            fontWeight: 600,
            [theme.breakpoints.up('md')]: {
                padding: 23,
            },
        },
        '& .MuiTableCell-head:not(:first-child)': {
            textAlign: 'center',
        },
        '& .MuiSvgIcon-root': {
            width: 20,
            height: 'auto',
        },
    },
    tableRow: {
        '& .MuiTableCell-body': {
            color: PRIMARY_DARK,
            padding: 23,
            fontSize: 14,
        },
        '& .MuiTableCell-body:not(:first-child)': {
            textAlign: 'center',
        },
        '& .MuiSvgIcon-root': {
            width: 20,
            height: 'auto',
        },
    },
    RowMobile: {
        background: WHITE,
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: 6,
        marginBottom: 10,
        padding: '0 15px',
        '& .row-mobile': {
            padding: '15px 0',
            borderBottom: `1px solid ${BORDER_COLOR}`,
            '&:last-child': {
                borderBottom: 0,
            },
            [theme.breakpoints.down('xs')]: {
                fontSize: 13,
            },
        },
    },
    h4: {
        margin: 0,
        marginBottom: 8,
    },
    btnPaginationDisabled: {
        color: WHITE_IMPORTANT,
        backgroundColor: `${GRAY_LIGHT} !important`,
    },
    hr: {
        margin: '20px 15px',
        border: `2px solid ${BORDER_COLOR}`,
        borderRadius: 10,
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

export default useStyles;
