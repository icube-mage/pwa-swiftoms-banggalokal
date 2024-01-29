import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        paddingBottom: '32px',
        [theme.breakpoints.down('xs')]: {
            paddingBottom: 0,
            paddingLeft: 17,
            paddingRight: 17,
        },
        [theme.breakpoints.between('768', '1024')]: {
            display: 'grid',
            gridTemplateColumns: '50% 50%',
            alignItems: 'center',
        },
    },
    title: {
        display: 'inline',
        color: colorPurple,
        fontFamily: font,
        fontSize: 24,
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            margin: 0,
        },
    },
    buttonAdd: {
        display: 'inline',
        float: 'right',
        borderRadius: 20,
        marginRight: 12,
        textTransform: 'capitalize',
        [theme.breakpoints.down('xs')]: {
            float: 'none',
            marginTop: 7,
        },
        [theme.breakpoints.between('768', '1024')]: {
            justifySelf: 'right',
            gridColumnStart: 2,
        },
    },
}));

export default useStyles;
