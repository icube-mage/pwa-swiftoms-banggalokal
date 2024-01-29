/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core/styles';

const colorBlack = '#000000';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#000000';
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
    titleTop: {
        fontSize: 24,
        color: colorBlack,
        fontFamily: font,
        display: 'block',
        marginBottom: 0,
    },
    title: {
        fontFamily: font,
        fontSize: 16,
        color: colorBlack,
        display: 'block',
        margin: 0,
    },
    titleSmall: {
        fontFamily: font,
        color: colorText,
        fontWeight: 400,
        fontSize: 14,
        margin: 0,
        display: 'block',
        '&.alignRight': {
            textAlign: 'right',
            padding: '0 8px',
        },
        '&.gridColumn': {
            gridColumn: '2/5',
        },
    },
    content: {
        padding: '18px 15px',
        background: '#ffffff',
    },
    hr: {
        border: 0,
    },
    wrapperColumn: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, auto)',
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
        marginTop: 15,
    },
    tr: {
        verticalAlign: 'top',
    },
    th: {
        textAlign: 'left',
        padding: '5px 8px',
        color: colorBlack,
        border: '1px solid #000000',
        '&.alignRight': {
            textAlign: 'right',
        },
    },
    td: {
        padding: '5px 8px',
        fontFamily: font,
        border: '1px solid #000000',
        '&.alignRight': {
            textAlign: 'right',
        },
    },
    wrapperGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
    gridTwo: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
}));

export default useStyles;
