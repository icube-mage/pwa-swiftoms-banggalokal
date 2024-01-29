import makeStyles from '@material-ui/core/styles/makeStyles';
import { DISABLED, PRIMARY } from '@theme_color';

const colorText = '#536777';
const colorBorder = '#435179';
const colorPurple = '#BE1F93';
const iconFont = '#435179';

const useStyles = makeStyles((theme) => ({
    tableToolbar: {
        '& .top-buttons-wrapper': {
            padding: '16px',
            textAlign: 'right',
        },
        '& .records-found': {
            padding: '12px 0',
            float: 'left',
            marginLeft: '12px',
            [theme.breakpoints.down('xs')]: {
                textAlign: 'left',
            },
        },
        '& .top-item': {
            display: 'inline-block',
            marginRight: '12px',
            '& .MuiButton-text': {
                border: '1px solid',
                borderColor: colorBorder,
                color: colorText,
                textTransform: 'capitalize',
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
        borderRadius: 20,
        background: 'unset',
        boxShadow: 'none',
        textTransform: 'capitalize',
        color: colorText,
        border: '1px solid',
        borderColor: colorBorder,
        padding: '5px 16px 5px 8px',
        height: 35,
        '&:hover': {
            background: 'unset',
            boxShadow: 'none',
        },
        '&.filter': {
            borderColor: colorPurple,
            color: 'white',
            background: colorPurple,
            margin: '10px 0',
        },
        '& .btnIcon': {
            width: 30,
            height: 'auto',
        },
        [theme.breakpoints.down('xs')]: {
            padding: '5px',
            minWidth: 'unset',
            width: 40,
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
    },

    tableContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100vw',
            display: 'block',
            marginLeft: '0px',
            marginRight: '0px',
        },
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '& .MuiCheckbox-colorSecondary.Mui-disabled': {
            color: DISABLED,
        },
    },
    loading: {
        display: 'flex',
        color: iconFont,
        fontWeight: 600,
        justifyContent: 'center',
        padding: '20px 0',
    },
    tablePagination: {
        '& .MuiTablePagination-spacer': {
            display: 'none',
        },
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
}));

export default useStyles;
