/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#435179';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 16px',
        borderRadius: 16,
        backgroundColor: 'unset',
        boxShadow: 'none',
        position: 'relative',
    },
    btn: {
        borderRadius: 30,
        boxShadow: 'none',
        border: '1px solid',
        borderColor: colorPurple,
        letterSpacing: 0,
        padding: '14px 53px',
        marginTop: 27,
        textTransform: 'uppercase',
    },
    content: {
        padding: '8px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
    h2: {
        marginBottom: 0,
        color: colorText,
        letterSpacing: 0,
        '&.quantity': {
            marginTop: 0,
            fontSize: 30,
        },
    },
    text: {
        display: 'block',
        color: colorText,
    },
    img: {
        marginTop: 17,
        marginBottom: 19,
    },
    imgPlaceholder: {
        width: '50%',
        marginTop: 17,
        marginBottom: 19,
    },
    linkBack: {
        display: 'block',
        textDecoration: 'underline',
        color: colorPurple,
        marginTop: 143,
        marginBottom: 10,
    },
}));

export default useStyles;
