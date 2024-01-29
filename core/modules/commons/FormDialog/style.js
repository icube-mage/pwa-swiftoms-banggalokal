import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        padding: '16px 24px',
        top: 0,
        right: 0,
    },
    wrapperDialog: {
        '& .MuiDialog-paperWidthSm': {
            minWidth: 500,
            [theme.breakpoints.down('xs')]: {
                minWidth: 300,
            },
        },
    },
}));

export default useStyles;
