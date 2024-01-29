import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY,
    TABLE_GRAY,
    PRIMARY_DARK,
    BORDER_COLOR,
    GRAY_BG_2,
    PRIMARY_DARK_OLD,
    PURPLE,
    YELLOW_STATUS,
    CYAN_STATUS,
    PURPLE_STATUS,
    ORANGE_STATUS,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    input: {
        [theme.breakpoints.down('md')]: {
            width: '100%',
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
            backgroundColor: 'transparent',
            borderRadius: 4,
            width: 90,
        },
        '& .MuiInputBase-input': {
            fontSize: 13,
            fontWeight: 600,
            color: PRIMARY_DARK,
            textAlign: 'center',
        },
        '& .MuiAutocomplete-inputRoot': {
            height: 42,
            borderBottom: 'none',
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
    },
    head: {
        display: 'flex',
        alignItems: 'center',
        '& .MuiSvgIcon-root': {
            width: 18,
            height: 18,
        },
        '& div': {
            flexShrink: 0,
        },
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
    },
    divider: {
        display: 'flex',
        '&.space': {
            marginLeft: 5,
        },
        '&.slash': {
            '&::after': {
                content: "' / '",
                display: 'block',
                margin: '0 10px',
            },
        },
        '&.primary': {
            fontWeight: 600,
        },
        '&.content-center': {
            justifyContent: 'center',
        },
    },
    imgContainer: {
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: 4,
        minHeight: 74,
        padding: 10,
    },
    img: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: 60,
    },

    btnAction: {
        borderRadius: 4,
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
    menuAction: {
        '& .MuiMenuItem-root': {
            fontSize: 13,
            color: PRIMARY_DARK,
        },
        '& .MuiMenu-list': {
            borderRadius: 4,
            background: TABLE_GRAY,
            marginTop: 5,
        },
    },
    menuItem: {
        background: TABLE_GRAY,
        margin: 0,
    },
    arrowDown: {
        transition: 'all .2s linear',
        transform: 'rotate(90deg)',
    },
    arrowUp: {
        transition: 'all .2s linear',
        transform: 'rotate(-90deg)',
    },
    dateContainer: {
        display: 'flex',
        alignItems: 'center',
        background: TABLE_GRAY,
        borderRadius: 4,
        height: 42,
        padding: '13px 0px 13px 15px',
        '& .MuiTypography-body1': {
            margin: 0,
        },
        '& .MuiSvgIcon-root': {
            fill: PRIMARY_DARK,
            width: 17,
            height: 17,
        },
        '& .MuiPickersDay-root.Mui-selected': {
            backgroundColor: PRIMARY_DARK,
        },
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
        },
    },
    imgGrid: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: 40,
        width: 40,
    },
    plus: {
        margin: '0 10px',
    },
    channelLogo: {
        width: 20,
        height: 20,
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: '50%',
        '& img': {
            height: 15,
            alignSelf: 'center',
        },
    },
    channelContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
    },
    channelIcon: {
        width: 20,
        height: 20,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    },
    listCoreContainer: {
        [theme.breakpoints.down('xs')]: {
            margin: 10,
        },
        '@media (max-width: 374px)': {
            padding: 0,
        },
    },
    searchBarContainer: {
        backgroundColor: GRAY_BG_2,
        padding: 10,
    },
    orderStatusLabel: {
        color: PRIMARY_DARK_OLD,
        '&.unconfirmed': {
            backgroundColor: `${PURPLE}4D`,
            borderRadius: 4,
            padding: '3px 5px',
        },
        '&.confirmed': {
            backgroundColor: `${YELLOW_STATUS}4D`,
            borderRadius: 4,
            padding: '3px 5px',
        },
        '&.ready_for_ship': {
            backgroundColor: `${CYAN_STATUS}4D`,
            borderRadius: 4,
            padding: '3px 5px',
        },
        '&.order_shipped': {
            backgroundColor: `${PURPLE_STATUS}4D`,
            borderRadius: 4,
            padding: '3px 5px',
        },
        '&.order_delivered': {
            backgroundColor: `${ORANGE_STATUS}4D`,
            borderRadius: 4,
            padding: '3px 5px',
        },
        '&.canceled': {
            backgroundColor: '#FCC0C0',
            borderRadius: 4,
            padding: '3px 5px',
            color: '#EA2A2A',
        },
        '&.allocation_failed': {
            backgroundColor: '#EA2A2A',
            borderRadius: 4,
            padding: '3px 5px',
            color: '#FCC0C0',
        },
    },
    tabsContainer: {
        border: `1px solid ${BORDER_COLOR}`,
        borderBottom: 0,
        borderRadius: '6px 6px 0 0',
        padding: 1,
        position: 'relative',
        [theme.breakpoints.down('xs')]: {
            borderBottom: `1px solid ${BORDER_COLOR}`,
            marginTop: 10,
            borderRadius: 6,
        },
    },
    progressBar: {
        width: '20%',
        position: 'absolute',
        top: 13,
        borderRadius: 5,
        right: 10,
        background: '#ECF0F2',
        padding: 10,
        height: 50,
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    progressBarMobile: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            width: '100%',
            borderRadius: 5,
            background: '#fff',
            border: '1px #cecece solid',
            padding: 10,
            height: 50,
        },
    },
    divTabCount: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        '& span.MuiBadge-badge': {
            fontSize: 'inherit',
            fontWeight: 'inherit',
            zIndex: 'inherit',
        },
    },
    infoCount: {
        borderRadius: '50%',
        backgroundColor: GRAY_BG_2,
        fontSize: 10,
        display: 'grid',
        width: 28,
        height: 28,
        placeItems: 'center',
    },
}));

export default useStyles;
