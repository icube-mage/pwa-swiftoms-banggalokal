import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    dropdownContainer: {
        '& [class*="makeStyles-classicButton"]': {
            display: 'flex',
            width: 100,
            padding: '0px 10px 0px 10px',
            justifyContent: 'space-between',
            [theme.breakpoints.down('sm')]: {
                width: 'auto',
            },
            '& img': {
                marginRight: 0,
                marginLeft: 5,
                height: 8,
                width: 8,
            },
        },
    },
}));

export default useStyles;
