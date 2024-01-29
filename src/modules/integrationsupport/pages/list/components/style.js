import { makeStyles } from '@material-ui/core/styles';
import {
    GREEN_STATUS_TABLE_BORDER, RED_STATUS_TABLE_BORDER, YELLOW_STATUS_TABLE_BORDER,
    BLUE_LINK,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    divImg: {
        [theme.breakpoints.up('sm')]: {
            textAlign: 'center',
        },
        '& img': {
            width: 38,
            height: 'auto',
        },
    },
    divRequest: {
        display: 'grid',
        gridTemplateColumns: '7% auto',
    },
    divStatus: {
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        textTransform: 'capitalize',
        '& .icon': {
            width: 22,
            height: 22,
        },
        '& .pending': {
            fill: YELLOW_STATUS_TABLE_BORDER,
        },
        '& .processing': {
            fill: BLUE_LINK,
        },
        '& .complete': {
            fill: GREEN_STATUS_TABLE_BORDER,
        },
        '& .cancel': {
            fill: RED_STATUS_TABLE_BORDER,
        },
    },
    btnAction: {
        width: '100%',
        [theme.breakpoints.down('xs')]: {
            marginTop: 5,
        },
        '&.processing': {
            backgroundColor: BLUE_LINK,
        },
        '&.integration': {
            backgroundColor: YELLOW_STATUS_TABLE_BORDER,
        },
        '&.complete': {
            backgroundColor: GREEN_STATUS_TABLE_BORDER,
        },
    },
    textField: {
        '& input': {
            paddingTop: 8.5,
            paddingBottom: 8.5,
        },
    },
}));

export default useStyles;
