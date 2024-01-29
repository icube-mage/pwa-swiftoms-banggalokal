import { makeStyles } from '@material-ui/core/styles';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const borderColor = '#DDE1EC';

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('xs')]: {
            paddingLeft: 17,
            paddingRight: 17,
        },
    },
    table: {
        borderCollapse: 'collapse',
        margin: '20px 0 50px 0',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            paddingLeft: 17,
            paddingRight: 17,
        },
        [theme.breakpoints.up('sm')]: {
            width: '30%',
        },
    },
    tr: {
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
        verticalAlign: 'top',
    },
    th: {
        textAlign: 'left',
        padding: '5px 0',
    },
    td: {
        padding: '5px 0',
        fontFamily: font,
    },
    grandTotal: {
        fontFamily: font,
        fontWeight: 'bold',
    },
}));

export default useStyles;
