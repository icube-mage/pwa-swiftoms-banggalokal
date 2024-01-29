import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    popup: {
        cursor: 'pointer',
        color: '#BE1F93',
        background: 'transparent',
        border: 0,
        boxShadow: 'none',
        padding: 0,
        letterSpacing: 0,
        textTransform: 'capitalize',
        '&:hover': {
            background: 'transparent',
            boxShadow: 'none',
        },
    },
}));

export default useStyles;
