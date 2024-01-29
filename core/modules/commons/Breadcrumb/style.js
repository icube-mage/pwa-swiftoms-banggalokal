import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: 20,
        '& a': {
            cursor: 'pointer',
        },

        '& p': {
            marginLeft: 0,
        },
    },
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        padding: 0,
    },
    containerMobile: {
        [theme.breakpoints.down('xs')]: {
            padding: '10px 17px 0 17px',
        },
    },
    breadcrumbItem: {
        paddingLeft: 0,
        paddingRight: '5px',
    },
    breadcrumbActive: {
        textTransform: 'capitalize',
        '&:hover': {
            color: '#be1f93',
            borderBottom: '1px solid #be1f93',
            marginBottom: '-1px',
        },
    },
    breadcrumbSeparator: {
        paddingLeft: '5px',
        '&:hover': {
            borderBottom: 'none',
        },
    },
}));

export default useStyles;
