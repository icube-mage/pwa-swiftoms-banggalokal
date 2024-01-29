import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    sellerHomeContainer: {
        paddingBottom: 30,
        [theme.breakpoints.down('xs')]: {
            marginTop: -15,
        },
    },
    sellerBoxDashboard: {
        marginTop: -20,
        [theme.breakpoints.down('xs')]: {
            marginTop: -30,
        },
        '@media (max-width: 320px)': {
            marginTop: 0,
        },
    },
}));

export default useStyles;
