import { makeStyles } from '@material-ui/core/styles';

const colorRed = '#DA1414';
const colorGray = '#B1BCDB';
const colorOrange = '#FF962C';
const colorPurple = '#BE1F93';
const borderColor = '#DDE1EC';

const useStyles = makeStyles(() => ({
    red: {
        color: colorRed,
        fontWeight: 600,
    },
    orange: {
        color: colorOrange,
        fontWeight: 600,
    },
    gray: {
        color: colorGray,
        fontWeight: 600,
    },
    footer: {
        background: '#ffffff',
        position: 'sticky',
        bottom: 0,
        left: 0,
        width: '100%',
    },
    btnFooter: {
        width: '100%',
        backgroundColor: colorPurple,
        color: '#FFFFFF',
        cursor: 'pointer',
        padding: 20,
        border: 0,
    },
    btnFooterDisabled: {
        width: '100%',
        backgroundColor: borderColor,
        color: colorGray,
        cursor: 'not-allowed',
        padding: 20,
        border: 0,
    },
}));

export default useStyles;
