import makeStyles from '@material-ui/core/styles/makeStyles';

const colorText = '#435179';
const colorTextGray = '#B1BCDB';
const colorBorder = '#435179';
const borderGray = '#E5E9F1';
const colorPurple = '#BE1F93';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: '12px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 8,
        '& hr': {
            margin: '12px -15px',
            background: borderGray,
            border: 0,
            height: 1,
        },
    },
    tableToolbar: {
        '& .top-header': {
            display: 'flex',
            justifyContent: 'space-between',
        },
        '& .top-buttons-wrapper': {
            padding: '16px',
            textAlign: 'right',
        },
        '& .records-found': {
            padding: '12px 0',
            float: 'left',
            marginLeft: '12px',
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
    gridList: {
        display: 'grid',
    },
    titleList: {
        color: colorTextGray,
        fontSize: 10,
        margin: 0,
    },
    bodyList: {
        color: colorText,
        fontSize: 12,
        margin: 0,
        fontWeight: 400,
    },
    loading: {
        display: 'flex',
        color: colorText,
        fontWeight: 600,
        justifyContent: 'center',
        padding: '20px 0',
    },
    boxAll: {
        background: 'unset',
        padding: '0 15px',
    },
    title: {
        padding: '11px 0',
        color: colorText,
        fontWeight: 700,
        minWidth: 200,
    },
    gridHead: {
        display: 'flex',
    },
}));

export default useStyles;
