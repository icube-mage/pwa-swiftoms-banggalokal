import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY, TABLE_GRAY, FONT_COLOR, PRIMARY_DARK, GRAY_LIGHT, WHITE, PURPLE, BORDER_COLOR, WHITE_IMPORTANT,
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
        boxShadow: '0px 3px 15px #4D2F821A',
        borderRadius: 8,
        '&.separate': {
            marginBottom: 20,
        },
    },
    tableContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        boxShadow: '0px 3px 15px #4D2F821A',
        border: `1px solid ${BORDER_COLOR}`,
        borderBottom: 0,
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100vw',
            display: 'block',
            marginLeft: '0px',
            marginRight: '0px',
        },
        '&.joinTab': {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
        },
        '&.footer': {
            paddingTop: 10,
            borderRadius: 0,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderTop: 0,
        },
    },
    loading: {
        display: 'flex',
        color: PRIMARY_DARK,
        fontWeight: 600,
        justifyContent: 'center',
        padding: '20px 0px',
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
        borderRadius: 10,
        width: 26,
        minWidth: 26,
        maxWidth: 26,
        height: 26,
        padding: 0,
        color: 'white',
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        [theme.breakpoints.down('xs')]: {
            width: 22,
            height: 22,
            minWidth: 22,
            maxWidth: 22,
            borderRadius: 6,
        },
    },
    btnPaginationDisabled: {
        color: WHITE_IMPORTANT,
        backgroundColor: `${GRAY_LIGHT} !important`,
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
        '& .centering': {
            textAlign: 'center',
        },
    },
    tableRow: {
        '&.gray': {
            backgroundColor: WHITE,
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
        '& .centering': {
            textAlign: 'center',
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
    checkAllContainer: {
        padding: '0px 30px',
        marginBottom: 20,
        marginTop: 20,
        color: PRIMARY_DARK,
        gap: 10,
    },
    checkedLength: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    btnActionCheck: {
        borderRadius: 6,
        textTransform: 'capitalize',
        border: '1px solid',
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
    },
    tablePaginationToolbar: {
        display: 'grid',
        gridTemplateColumns: '50px 80px 90px auto',
        paddingBottom: 10,
    },
}));

export default useStyles;
