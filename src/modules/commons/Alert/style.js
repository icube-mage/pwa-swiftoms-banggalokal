import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY_DARK_OLD } from '@theme_color';

const useStyles = makeStyles(() => ({
    containerAlert: {
        margin: '20px 0',
        position: 'relative',
        borderRadius: 6,
        '& div.MuiAlert-icon': {
            color: PRIMARY_DARK_OLD,
        },
        '& .MuiAlert-action': {
            alignItems: 'start',
        },
    },
    divContent: {
        color: PRIMARY_DARK_OLD,
        fontSize: 13,
        '&:not(:first-child)': {
            marginTop: 12,
        },
    },
    title: {
        '&.MuiAlertTitle-root': {
            color: PRIMARY_DARK_OLD,
            fontWeight: 700,
            fontSize: 13,
            marginBottom: 0,
        },
    },
}));

export default useStyles;
