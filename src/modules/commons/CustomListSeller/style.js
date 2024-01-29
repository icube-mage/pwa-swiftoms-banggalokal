import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY, TABLE_GRAY, FONT_COLOR, PRIMARY_DARK, GRAY_LIGHT, PURPLE, WHITE,
} from '@theme_color';

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
            [theme.breakpoints.down('xs')]: {
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
            },
        },
        '& .top-item': {
            display: 'inline-block',
            marginRight: '12px',
            '& .MuiButton-text': {
                border: '1px solid',
                color: FONT_COLOR,
                textTransform: 'capitalize',
            },
        },
    },
    expandContainer: {
        background: TABLE_GRAY,
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
    },
    paperHead: {
        boxShadow: '0px 3px 15px #4D2F821A',
        marginBottom: 20,
        padding: 30,
        borderRadius: 8,
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
    rowPaper: {
        boxShadow: '0px 3px 15px #4D2F821A',
        marginBottom: 20,
        padding: '10px 0 30px 0',
        borderRadius: 8,
        color: PRIMARY_DARK,
        fontSize: 13,
    },
    rowHead: {
        display: 'flex',
        borderBottom: '2px inset',
        borderColor: TABLE_GRAY,
        padding: '0px 30px',
        marginBottom: 20,
        textTransform: 'capitalize',
        '& .MuiCheckbox-colorSecondary.Mui-checked:hover': {
            backgroundColor: 'transparent !important',
        },
        '& .MuiIconButton-colorSecondary:hover': {
            backgroundColor: 'transparent !important',
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: 20,
            paddingBottom: 10,
        },
    },
    rowFooter: {
        padding: '0px 30px',
        fontWeight: 600,
    },
    rowBody: {
        padding: '0px 30px',
        '& .box': {
            [theme.breakpoints.down('xs')]: {
                borderRight: '0',
                borderBottom: '1px inset',
                padding: 20,
            },
            borderRight: '1px inset',
            borderColor: TABLE_GRAY,
            padding: '0 20px',
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
            backgroundColor: WHITE,
        },
        '& .MuiTableCell-body': {
            color: PRIMARY_DARK,
            paddingTop: 15,
            paddingBottom: 5,
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
    },
    header: {
        color: PURPLE,
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
        '&.filter': {
            background: TABLE_GRAY,
            borderColor: TABLE_GRAY,
            color: PRIMARY_DARK,
            margin: '10px 0',
            boxShadow: 'none',
            '&:hover': {
                backgroundColor: TABLE_GRAY,
                boxShadow: 'none',
                borderColor: TABLE_GRAY,
            },
        },
        '&.check': {
            height: 32,
            background: 'white',
            borderColor: GRAY_LIGHT,
            color: PRIMARY_DARK,
            margin: '10px 0',
            boxShadow: 'none',
            padding: '7px 15px',
            '&:hover': {
                backgroundColor: 'white',
                boxShadow: 'none',
                borderColor: GRAY_LIGHT,
            },
        },
    },
    btnText: {
        fontSize: 13,
        fontWeight: 600,
        color: PRIMARY_DARK,
    },
    sortButon: {
        marginLeft: -16,
        textAlign: 'left',
        '& .MuiButton-endIcon': {
            marginLeft: 0,
        },
    },
}));

export default useStyles;
