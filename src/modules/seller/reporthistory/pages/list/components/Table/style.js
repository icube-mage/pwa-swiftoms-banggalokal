import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY, FONT_COLOR, PRIMARY_DARK, GRAY_LIGHT, WHITE, BORDER_COLOR,
    BLACK, PRIMARY_DARK_OLD, GRAY_LIGHT3,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    tableToolbar: {
        '& .top-buttons-wrapper': {
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
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
                [theme.breakpoints.down('xs')]: {
                    fontSize: 14,
                },
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
        borderRadius: '6px 6px 0 0',
        border: `1px solid ${BORDER_COLOR}`,
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
        [theme.breakpoints.down('xs')]: {
            margin: '0 16px ',
            background: 'unset',
            border: 0,
        },
    },
    paperHead: {
        boxShadow: 'none',
        background: 'unset',
        padding: 30,
        paddingLeft: 0,
        [theme.breakpoints.down('xs')]: {
            padding: 16,
        },
    },
    tableContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0px 3px 15px #4D2F821A',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100vw',
            marginLeft: '0px',
            marginRight: '0px',
            maxHeight: 'calc(100% - 140px)',
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
                borderColor: PRIMARY_DARK,
                color: PRIMARY_DARK,
            },
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            borderColor: BORDER_COLOR,
            color: BLACK,
            backgroundColor: 'transparent',
            fontWeight: 700,
        },
        '& .MuiPagination-ul': {
            [theme.breakpoints.down('md')]: {
                flexWrap: 'nowrap',
            },
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
    header: {
        color: PRIMARY_DARK,
        fontSize: 20,
        fontWeight: 'bold',
        padding: '30px 0 0 30px',
    },
    sortButon: {
        marginLeft: -16,
        textAlign: 'left',
        '& .MuiButton-endIcon': {
            marginLeft: 0,
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
}));

export default useStyles;
