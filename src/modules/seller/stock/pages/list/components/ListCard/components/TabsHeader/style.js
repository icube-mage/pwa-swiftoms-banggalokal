import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    FONT_COLOR, PRIMARY_DARK, GRAY_LIGHT, WHITE, BORDER_COLOR, PRIMARY, PRIMARY_DARK_OLD, GRAY_BG_2, PURPLE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    paperHead: {
        boxShadow: 'unset',
        borderRadius: 6,
        [theme.breakpoints.down('xs')]: {
            backgroundColor: 'transparent',
        },
        position: 'relative',
    },
    tableToolbar: {
        padding: '10px 30px',
        backgroundColor: GRAY_BG_2,
        '& .top-buttons-wrapper': {
            padding: '20px 20px 20px 30px',
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                display: 'block',
            },
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
            },
        },
        '& .top-item-right': {
            display: 'flex',
            alignItems: 'center',
            textAlign: 'right',
            justifyContent: 'end',
            [theme.breakpoints.down('sm')]: {
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
    textInput: {
        width: 430,
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
            borderRadius: 6,
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
    expandContainer: {
        '& .filter-item': {
            background: WHITE,
            border: `1px solid ${GRAY_LIGHT}`,
            color: PRIMARY_DARK_OLD,
            fontSize: 13,
            padding: '5px 10px',
            height: 24,
            borderRadius: 4,
            marginTop: 0,
            display: 'flex',
            justifyContent: 'space-between',
            minWidth: 90,
            alignItems: 'center',

        },
    },
    expandGrid: {
        marginTop: 15,
        alignItems: 'baseline',
        display: 'grid',
        gridTemplateColumns: '80px auto',
        gap: 10,
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
    btnFilterText: {
        background: 'transparent',
        boxShadow: 'none',
        padding: 0,
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
        backgroundColor: PRIMARY_DARK_OLD,
        padding: 0,
        marginLeft: 15,
        '&:hover': {
            backgroundColor: PRIMARY_DARK_OLD,
        },
    },
    closeIcon: {
        height: 12,
        width: 12,
        color: WHITE,
    },
    searchHeader: {
        backgroundColor: GRAY_BG_2,
        padding: 10,
    },
    tabsMobileContainer: {
        border: `1px solid ${BORDER_COLOR}`,
        margin: 10,
        borderRadius: 4,
    },
    headerMobileContainer: {
        padding: '5px 10px 0 10px',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contSync: {
        marginTop: 10,
        textAlign: 'right',
    },
    btnPurple: {
        backgroundColor: PURPLE,
        color: WHITE,
        padding: '7px 10px 7px 10px',
        fontSize: 13,
        fontWeight: 600,
        'box-shadow': '0px 2px 5px 0px rgba(0,0,0,0.23)',
        '-webkit-box-shadow': '0px 2px 5px 0px rgba(0,0,0,0.23)',
        '-moz-box-shadow': '0px 2px 5px 0px rgba(0,0,0,0.23)',
        borderRadius: 5,
        '&:hover': {
            color: PURPLE,
        },
    },
    btnSync: {
        backgroundColor: PURPLE,
        color: WHITE,
        padding: '7px 10px 7px 10px',
        marginRight: 10,
        position: 'absolute',
        right: 30,
        top: 22,
        fontSize: 13,
        fontWeight: 600,
        'box-shadow': '0px 2px 5px 0px rgba(0,0,0,0.23)',
        '-webkit-box-shadow': '0px 2px 5px 0px rgba(0,0,0,0.23)',
        '-moz-box-shadow': '0px 2px 5px 0px rgba(0,0,0,0.23)',
        borderRadius: 5,
        '&:hover': {
            color: PURPLE,
        },
    },
}));

export default useStyles;
