import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, TABLE_GRAY, BORDER_COLOR, WHITE, BLACK, GRAY_LIGHT,
    GREEN_STATUS_TABLE_BORDER, RED_STATUS_TABLE_BORDER, YELLOW_STATUS_TABLE_BORDER,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: 50,
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 5,
        [theme.breakpoints.down('sm')]: {
            paddingTop: 20,
        },
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 15,
            paddingLeft: 10,
            paddingRight: 10,
        },
    },
    header: {
        color: PRIMARY_DARK,
        fontSize: 16,
        fontWeight: 'bold',
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
        color: WHITE,
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
    },
    status: {
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        textTransform: 'capitalize',
        '& .icon': {
            width: 16,
            height: 16,
        },
        '& .check': {
            fill: GREEN_STATUS_TABLE_BORDER,
        },
        '& .cancel': {
            fill: RED_STATUS_TABLE_BORDER,
        },
        '& .pending': {
            fill: YELLOW_STATUS_TABLE_BORDER,
        },
    },
    actions: {
        background: 'transparent',
        borderRadius: 6,
        border: '1px solid',
        borderColor: BORDER_COLOR,
        color: BLACK,
        boxShadow: 'none',
        fontWeight: 'bold',
        padding: '4px 14px',
        '&:hover': {
            background: 'transparent',
            boxShadow: 'none',
            borderColor: BORDER_COLOR,
        },
    },
    moreRoot: {
        padding: 0,
        height: 17,
        color: GRAY_LIGHT,
    },
    arrowDown: {
        transition: 'all .2s linear',
        transform: 'rotate(90deg)',
    },
    arrowUp: {
        transition: 'all .2s linear',
        transform: 'rotate(-90deg)',
    },
    menuAction: {
        '& .MuiMenuItem-root': {
            fontSize: 13,
            color: PRIMARY_DARK,
        },
        '& .MuiMenu-list': {
            borderRadius: 6,
            border: '1px solid',
            borderColor: BORDER_COLOR,
            background: WHITE,
            display: 'grid',
        },
        '& .MuiListItem-button:hover': {
            background: TABLE_GRAY,
        },
        '& .MuiMenu-paper': {
            marginTop: 5,
        },
    },
    channelDiv: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: 'max-content',
    },
    channelContainer: {
        width: 20,
        height: 20,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    },
    tabsContainer: {
        border: `1px solid ${BORDER_COLOR}`,
        marginBottom: 20,
        borderRadius: 6,
        marginTop: 15,
        [theme.breakpoints.down('xs')]: {
            margin: 10,
            marginBottom: 20,
            borderRadius: 6,
        },
    },
    circular: {
        marginTop: '10%',
        width: '100%',
        display: 'grid',
        placeItems: 'center',
    },
    activeBadge: {
        padding: '3px 5px 3px 5px',
        background: '#51C519',
        fontSize: 10,
        color: WHITE,
        borderRadius: 10,
    },
}));

export default useStyles;
