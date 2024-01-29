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
        position: 'relative',
        margin: '0px 5px 0 15px',
        top: -8,
        display: 'inline-block',
    },
    percent: {
        marginLeft: 10,
        position: 'relative',
        top: -8,
        fontSize: 12,
    },
}));

export default useStyles;
