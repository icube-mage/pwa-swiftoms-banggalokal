import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    title: {
        '& .MuiTypography-root': {
            fontSize: 16,
            fontWeight: 600,
        },
    },
    closeButtonDialog: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: PRIMARY_DARK,
        '& svg': {
            width: 20,
            height: 20,
        },
    },
    content: {
        color: PRIMARY_DARK,
        fontSize: 14,
        '& .channel-name': {
            paddingLeft: 25,
            margin: '5px 0',
            fontWeight: 700,
        },
    },
    btnActions: {
        padding: '16px 24px',
    },
}));

export default useStyles;
