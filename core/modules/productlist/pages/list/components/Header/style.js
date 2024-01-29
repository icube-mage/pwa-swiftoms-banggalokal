import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        paddingBottom: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            paddingBottom: 0,
            display: 'unset',
        },
    },
    title: {
        color: colorPurple,
        fontFamily: font,
        fontSize: 24,
        margin: 0,
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 17,
        },
    },
    buttonAdd: {
        borderRadius: 20,
        marginBottom: 10,
        textTransform: 'capitalize',
        [theme.breakpoints.down('xs')]: {
            marginTop: 7,
        },
        '&.mid': {
            marginRight: 10,
            marginLeft: 10,
        },
    },
    buttonContainer: {
        paddingLeft: 30,
        textAlign: 'right',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'left',
            paddingLeft: 17,
        },
    },
}));

export default useStyles;
