import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, BLACK, GRAY_LIGHT, PRIMARY_DARK,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        padding: 20,
        borderRadius: 6,
        backgroundColor: 'white',
        position: 'relative',
        height: '100%',
        [theme.breakpoints.down('xs')]: {
            marginRight: 10,
            marginLeft: 10,
        },
    },
    cardMark: {
        width: 4,
        height: 21,
        position: 'absolute',
        top: 20,
        left: 0,
        backgroundColor: PRIMARY,
        borderRadius: '0px 2px 2px 0px',
        [theme.breakpoints.down('xs')]: {
            top: 22,
        },
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    gridItemRoot: {
        height: 240,
        '&.grid-chat': {
            [theme.breakpoints.up('lg')]: {
                minHeight: 249,
                height: 'unset',
            },
        },
        [theme.breakpoints.up('1441')]: {
            flex: 1,
        },
        [theme.breakpoints.down('md')]: {
            height: '100%',
            marginBottom: 20,
        },
        [theme.breakpoints.down('376')]: {
            maxWidth: '100%',
            flexBasis: '100%',
        },
    },
    title: {
        color: BLACK,
        fontSize: 16,
        [theme.breakpoints.up('sm')]: {
            marginBottom: 15,
            margin: 0,
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    listIcon: {
        minWidth: '0',
        marginRight: 10,
        color: PRIMARY,
        marginTop: 7,
    },
    icon: {
        width: 16,
        height: 16,
    },
    listItemDense: {
        paddingTop: 0,
        paddingBottom: 0,
        alignItems: 'baseline',
    },
    listText: {
        fontSize: 12,
        color: '#A0A0A0',
        alignSelf: 'start',
    },
    divAction: {
        marginTop: 'auto',
        '&.div-chat': {
            [theme.breakpoints.up('lg')]: {
                height: '100%',
            },
        },
    },
    divider: {
        margin: 0,
        marginBottom: 20,
        '&.divider-chat': {
            marginBottom: 14,
        },
    },
    buttonRoot: {
        boxShadow: 'none',
        height: 36,
        '&:hover': {
            background: PRIMARY_DARK,
        },
    },
    mpImageContainer: {
        border: `1px solid ${GRAY_LIGHT}`,
        padding: 20,
        borderRadius: 8,
        width: 'fit-content',
        height: 'fit-content',
        marginBottom: 20,
        '&.noMargin': {
            [theme.breakpoints.down('376')]: {
                marginBottom: 0,
            },
        },
    },
    gridImageRoot: {
        [theme.breakpoints.down('xs')]: {
            order: 1,
        },
        [theme.breakpoints.down('376')]: {
            order: 0,
        },
    },
    mpImage: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        maxWidth: 100,
        minWidth: 70,
        maxHeight: 100,
        minHeight: 70,
    },
}));

export default useStyles;
