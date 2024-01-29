import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    title: {
        fontWeight: 500,
        margin: '16px 0 10px 0',
        display: 'inline-block',
    },
    totalValue: {
        float: 'right',
    },
    total: {
        margin: '16px 5px 0',
        display: 'inline-block',
    },
}));

export default useStyles;
