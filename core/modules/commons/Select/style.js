import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    formControl: {
        margin: 8,
        marginLeft: 0,
        minWidth: 'calc(100% - 30px)',
    },
    select: {
        height: 31,
    },
    formControlFullWidth: {
        margin: 8,
        marginLeft: 0,
        width: '100%',
    },
    root: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
    },
}));

export default useStyles;
