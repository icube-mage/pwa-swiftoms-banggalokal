import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(() => ({
    productActionContainer: {
        '& .catalog-header-tab': {
            '& ul': {
                marginBottom: 0,
            },
        },
    },
}));

export default useStyles;
