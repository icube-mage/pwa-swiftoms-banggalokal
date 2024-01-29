import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY_DARK, PRIMARY } from '@theme_color';

const useStyles = makeStyles(() => ({
    container: {
        padding: 30,
    },
    noteContainer: {
        marginBottom: 20,
        fontSize: 14,
    },
    buttonsWrapper: {
        display: 'flex',
        gap: 20,
    },
    buttonRoot: {
        boxShadow: 'none',
        height: 36,
        borderRadius: 4,
        '&:hover': {
            background: PRIMARY_DARK,
        },
    },
    buttonRootOutlined: {
        boxShadow: 'none',
        height: 36,
        borderRadius: 4,
        border: `1px solid ${PRIMARY}`,
        backgroundColor: 'transparent',
        color: PRIMARY,
        '&:hover': {
            border: `1px solid ${PRIMARY_DARK}`,
            color: PRIMARY_DARK,
            backgroundColor: 'transparent',
        },
    },
}));

export default useStyles;
