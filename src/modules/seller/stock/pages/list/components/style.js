import { makeStyles } from '@material-ui/core/styles';
import {
    BORDER_COLOR, GREEN_STATUS_TABLE_BORDER, RED_STATUS_TABLE_BORDER, GRAY_BG_2, PRIMARY, BLACK, GRAY_LIGHT3,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: 50,
    },
    imgContainer: {
        display: 'flex',
        border: `1px solid ${BORDER_COLOR}`,
        minHeight: 82,
        borderRadius: 4,
        padding: 10,
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            alignItems: 'center',
        },
    },
    imgContainerFlex: {
        display: 'flex',
        gap: 10,
        [theme.breakpoints.down('xs')]: {
            alignItems: 'center',
        },
        '& .parent-product': {
            color: BLACK,
            overflow: 'hidden',
            wordBreak: 'break-all',
            display: '-webkit-box',
            '-webkit-line-clamp': '1',
            '-webkit-box-orient': 'vertical',
        },
        '& .name-product': {
            color: BLACK,
            overflow: 'hidden',
            wordBreak: 'break-all',
            display: '-webkit-box',
            '-webkit-line-clamp': '1',
            '-webkit-box-orient': 'vertical',
        },
        '& .sku-product': {
            color: GRAY_LIGHT3,
        },
    },
    imgBackContainer: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            marginBottom: 10,
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: 0,
            justifyContent: 'center',
        },
        border: `1px solid ${BORDER_COLOR}`,
        padding: 5,
        justifyContent: 'center',
    },
    imgBack: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: 40,
        width: 40,
    },
    editIconRoot: {
        padding: 0,
    },
    syncChannelContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        [theme.breakpoints.down('xs')]: {
            gap: 3,
        },
    },
    imgBackContainerSync: {
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${BORDER_COLOR}`,
        padding: 5,
        margin: '5px 0',
        justifyContent: 'center',
        borderRadius: '50%',
        [theme.breakpoints.down('xs')]: {
            padding: 2,
            justifyContent: 'center',
        },
    },
    imgBackSync: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: 12,
        width: 12,
        [theme.breakpoints.down('xs')]: {
            height: 10,
            width: 10,
        },
    },
    status: {
        paddingLeft: 10,
        '& .icon': {
            width: 22,
            height: 22,
        },
        '& .check': {
            fill: GREEN_STATUS_TABLE_BORDER,
        },
        '& .cancel': {
            fill: RED_STATUS_TABLE_BORDER,
        },
    },
    red: {
        color: 'red',
    },
    channelName: {
        whiteSpace: 'break-spaces',
        wordBreak: 'break-all',
        width: '100%',
    },
    channelNameVar: {
        whiteSpace: 'break-spaces',
        wordBreak: 'break-all',
        width: '100%',
    },
    failedDiv: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
    },
    failedCount: {
        borderRadius: '50%',
        backgroundColor: GRAY_BG_2,
        fontSize: 10,
        display: 'grid',
        padding: '3px 7px',
        placeItems: 'center',
        '&.active': {
            color: PRIMARY,
        },
    },
}));

export default useStyles;
