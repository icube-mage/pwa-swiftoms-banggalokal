/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core/styles';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorBold = '#435179';
const colorBlack = '#000000';
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
        marginTop: 0,
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
        color: colorBlack,
        fontSize: 12,
        fontWeight: 400,
        margin: 0,
        display: 'block',
        '&.signText': {
            textAlign: 'center',
        },
        '& strong': {
            fontWeight: 800,
        },
    },
    content: {
        padding: '18px 15px',
        background: '#ffffff',
    },
    contentImg: {
        paddingBottom: 0,
        display: 'flex',
        alignItems: 'center',
        '& .imgIcon': {
            maxHeight: 40,
            width: 'auto',
            marginRight: 10,
        },
        '& span': {
            color: colorBold,
            fontWeight: 'bold',
        },
    },
    wrapperColumn: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 50%)',
        columnGap: 30,
        rowGap: 15,
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
        '& tbody tr:last-child td': {
            paddingBottom: 15,
            borderBottom: `1px solid ${borderColor}`,
        },
        '& tfoot tr:first-child td': {
            paddingTop: 20,
        },
        '& tfoot tr:nth-child(even) td': {
            paddingBottom: 5,
        },
        '& tfoot tr:nth-child(odd) td': {
            paddingBottom: 5,
        },
        '& .border': {
            paddingBottom: 10,
            borderBottom: `1px solid ${borderColor}`,
        },
    },
    tr: {
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
        verticalAlign: 'top',
    },
    th: {
        textAlign: 'left',
        padding: '5px 8px',
        color: colorBlack,
        '&.right': {
            textAlign: 'right',
        },
    },
    td: {
        padding: '5px 8px',
        fontFamily: font,
        '&.td-tfoot': {
            padding: '0 8px',
        },
        '&.right': {
            textAlign: 'right',
        },
        '&.total': {
            fontWeight: 600,
            paddingTop: 10,
        },
    },
    colSpan: {
        textAlign: 'right',
    },
}));

export default useStyles;
