/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGray = '#B1BCDB';
const colorBold = '#435179';
const borderColor = '#DDE1EC';
const borderGray = '#E5E9F1';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 16px',
        borderRadius: 16,
        backgroundColor: 'unset',
        boxShadow: 'none',
        maxWidth: 768,
        margin: '0 auto',
        pageBreakAfter: 'always',
    },
    containerBtn: {
        padding: '0 16px',
        maxWidth: 768,
        margin: '0 auto',
    },
    titleTop: {
        fontSize: 24,
        color: colorPurple,
        fontFamily: font,
        display: 'block',
        marginBottom: 0,
    },
    title: {
        fontFamily: font,
        fontSize: 14,
        margin: 0,
        marginBottom: 5,
        display: 'block',
        '&.sign': {
            marginBottom: 50,
            textAlign: 'center',
        },
    },
    titleSmall: {
        fontFamily: font,
        color: colorText,
        fontSize: 12,
        margin: 0,
        display: 'block',
        '&.signText': {
            textAlign: 'center',
        },
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '18px 15px',
        background: '#ffffff',
        '& hr': {
            margin: '12px -15px',
            background: borderGray,
            border: 0,
            height: 1,
        },
    },
    wrapperColumn: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
    },
    wrapperSign: {
        paddingTop: 50,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, auto)',
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
        marginTop: 15,
    },
    tr: {
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
        verticalAlign: 'top',
    },
    th: {
        textAlign: 'left',
        padding: '5px 8px',
        color: colorBold,
    },
    td: {
        padding: '5px 8px',
        fontFamily: font,
    },
}));

export default useStyles;
