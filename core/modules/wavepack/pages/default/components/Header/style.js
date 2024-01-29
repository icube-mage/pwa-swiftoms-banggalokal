import { makeStyles } from '@material-ui/core/styles';

const colorFont = '#435179';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    headerContainer: {
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 17,
            paddingRight: 17,
        },
        display: 'flex',
    },
    title: {
        display: 'inline',
        color: colorFont,
        fontFamily: font,
        fontSize: 24,
    },
    buttonAdd: {
        display: 'inline',
        float: 'right',
        borderRadius: 20,
        textTransform: 'capitalize',
        [theme.breakpoints.down('xs')]: {
            float: 'left',
            marginTop: 7,
        },
    },
}));

export default useStyles;
