import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY, TABLE_GRAY, FONT_COLOR, PRIMARY_DARK, GRAY_LIGHT,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    tableToolbar: {
        '& .top-buttons-wrapper': {
            padding: '20px 20px 20px 30px',
            display: 'flex',
            [theme.breakpoints.down('md')]: {
                display: 'block',
            },
            justifyContent: 'space-between',
            '&.nopad': {
                padding: '20px 0 0 0',
                [theme.breakpoints.down('md')]: {
                    padding: 0,
                },
            },
        },
        '& .top-item-left': {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'left',
            [theme.breakpoints.down('xs')]: {
                display: 'block',
            },
            '& .top-item': {
                marginRight: '12px',
                [theme.breakpoints.down('md')]: {
                    marginTop: 20,
                },
            },
        },
        '& .top-item-right': {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'right',
            justifyContent: 'end',
            '& .top-item': {
                [theme.breakpoints.down('md')]: {
                    marginTop: 20,
                },
            },
            '& .gray': {
                marginRight: '12px',
            },
            [theme.breakpoints.down('md')]: {
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
        width: 430,
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
    btnAdd: {
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
    nameContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
    },
    dragHandle: {
        cursor: 'move',
        '&.invisible': {
            visibility: 'hidden',
        },
    },
}));

export default useStyles;
