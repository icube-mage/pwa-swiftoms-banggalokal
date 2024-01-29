import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const colorBold = '#435179';
const borderColor = '#DDE1EC';

const useStyles = makeStyles(() => ({
    container: {
        padding: 20,
    },
    paper: {
        padding: 20,
    },
    divider: {
        height: 20,
    },
    section: {
        textAlign: 'center',
        color: colorBold,
    },
    name: {
        fontSize: 22,
        margin: 0,
    },
    text: {
        fontSize: 13,
        margin: 0,
        fontWeight: 400,
    },
    imgContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    img: {
        width: 214,
        height: 214,
        border: `1px solid ${borderColor}`,
    },
    qty: {
        fontSize: 30,
        margin: '10px 0 15px 0',
        fontWeight: 500,
    },
    btn: {
        fontSize: 18,
        width: 147,
        height: 55,
        borderRadius: 27,
        marginBottom: 40,
    },
    back: {
        color: colorPurple,
        fontSize: 14,
        textDecoration: 'underline',
    },
    loadingFetch: {
        display: 'flex',
        color: colorBold,
        fontWeight: 600,
        justifyContent: 'center',
        padding: '20px 0',
    },
}));

export default useStyles;
