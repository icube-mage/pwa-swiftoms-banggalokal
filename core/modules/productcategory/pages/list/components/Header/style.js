import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        paddingBottom: '32px',
        [theme.breakpoints.down('xs')]: {
            marginBottom: 25,
            paddingLeft: 17,
            paddingRight: 17,
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
        textTransform: 'capitalize',
        marginLeft: 10,
        [theme.breakpoints.down('xs')]: {
            float: 'left',
            marginTop: 7,
        },
    },
}));

export default useStyles;
