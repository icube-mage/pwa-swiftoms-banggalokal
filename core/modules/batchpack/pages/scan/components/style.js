/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const colorText = '#435179';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 16px',
        borderRadius: 16,
        backgroundColor: 'unset',
        boxShadow: 'none',
        position: 'relative',
    },
    content: {
        padding: '8px 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
    name: {
        color: colorText,
        fontSize: 20,
        fontWeight: 600,
        margin: 0,
    },
    sku: {
        color: colorText,
        fontSize: 13,
        fontWeight: 400,
        margin: 0,
    },
    qty: {
        color: colorText,
        fontSize: 20,
        fontWeight: 400,
    },
    linkBack: {
        display: 'block',
        textDecoration: 'underline',
        color: colorPurple,
        marginTop: 50,
        marginBottom: 20,
    },
}));

export default useStyles;
