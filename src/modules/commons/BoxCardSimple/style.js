import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    boxCardSimpleContainer: {
        '& .box-card': {
            '& .box-card-header': {
                display: 'flex',
                justifyContent: 'space-between',
                [theme.breakpoints.down('sm')]: {
                    display: 'block',
                },
                '& .title': {
                    fontSize: 18,
                    [theme.breakpoints.down('sm')]: {
                        fontSize: 16,
                        marginBottom: 10,
                    },
                },
                '& .button': {
                    [theme.breakpoints.down('sm')]: {
                        marginBottom: 15,
                    },
                    '& a': {
                        [theme.breakpoints.down('sm')]: {
                            justifyContent: 'center',
                        },
                    },
                },
            },
        },
    },
}));

export default useStyles;
