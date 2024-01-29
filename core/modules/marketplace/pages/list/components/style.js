import { makeStyles } from '@material-ui/core/styles';
import {
    RED_STATUS_TABLE, RED_STATUS_TABLE_BORDER, GREEN_STATUS_TABLE, GREEN_STATUS_TABLE_BORDER,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    fieldInputFilter: {
        '& .MuiInputBase-input': {
            padding: '8.5px 14px',
        },
    },
    status: {
        border: '1px solid',
        borderRadius: 20,
        textAlign: 'center',
        textTransform: 'capitalize',
        width: 100,
        backgroundColor: RED_STATUS_TABLE,
        borderColor: RED_STATUS_TABLE_BORDER,
        color: RED_STATUS_TABLE_BORDER,
        '&.active': {
            backgroundColor: GREEN_STATUS_TABLE,
            borderColor: GREEN_STATUS_TABLE_BORDER,
            color: GREEN_STATUS_TABLE_BORDER,
        },
    },
}));

export default useStyles;
