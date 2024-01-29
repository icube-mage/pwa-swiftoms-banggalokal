import { makeStyles } from '@material-ui/core/styles';
import {
    RED_STATUS_TABLE, RED_STATUS_TABLE_BORDER, YELLOW_STATUS_TABLE,
    YELLOW_STATUS_TABLE_BORDER, GREEN_STATUS_TABLE, GREEN_STATUS_TABLE_BORDER,
    TEXT_COLOR, GRAY_LIGHT,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    content: {
        borderBottom: '2px solid #F5F7FB',
        padding: '10px 15px 0px 15px',
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        },
    },
    divider: {
        height: 10,
    },
    status: {
        border: '1px solid',
        borderRadius: 20,
        textAlign: 'center',
        textTransform: 'capitalize',
        [theme.breakpoints.down('xs')]: {
            padding: '2px 10px',
            width: 'fit-content',
        },
        '&.failed': {
            backgroundColor: RED_STATUS_TABLE,
            borderColor: RED_STATUS_TABLE_BORDER,
            color: RED_STATUS_TABLE_BORDER,
        },
        '&.success': {
            backgroundColor: GREEN_STATUS_TABLE,
            borderColor: GREEN_STATUS_TABLE_BORDER,
            color: GREEN_STATUS_TABLE_BORDER,
        },
        '&.warning': {
            backgroundColor: YELLOW_STATUS_TABLE,
            borderColor: YELLOW_STATUS_TABLE_BORDER,
            color: YELLOW_STATUS_TABLE_BORDER,
        },
    },
    btnMore: {
        '& .MuiSvgIcon-root': {
            fill: TEXT_COLOR,
            height: 15,
            width: 'auto',
        },
    },
    menuAction: {
        '& .MuiMenuItem-root': {
            fontSize: 13,
            color: TEXT_COLOR,
        },
        '& .MuiMenu-paper': {
            marginTop: -10,
        },
        '& .MuiMenu-list': {
            borderRadius: 8,
            border: `1px solid ${GRAY_LIGHT}`,
            display: 'grid',
        },
    },
    menuItem: {
        fontSize: 13,
        color: TEXT_COLOR,
        padding: '6px 16px',
    },
}));

export default useStyles;
