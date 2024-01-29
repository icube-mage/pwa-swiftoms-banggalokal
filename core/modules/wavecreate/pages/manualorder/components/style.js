import { makeStyles } from '@material-ui/core/styles';

const colorGreen = '#5EC929';
const colorOrange = '#FF962C';
const colorRed = '#DA1414';
const colorGray = '#B1BCDB';
const colorPurple = '#BE1F93';
const borderColor = '#DDE1EC';

const useStyles = makeStyles(() => ({
    green: {
        color: colorGreen,
        fontWeight: 500,
    },
    orange: {
        color: colorOrange,
        fontWeight: 500,
    },
    red: {
        color: colorRed,
        fontWeight: 500,
    },
    gray: {
        color: colorGray,
        fontWeight: 500,
    },
    footer: {
        background: '#ffffff',
        position: 'sticky',
        bottom: 0,
        left: 0,
        width: '100%',
        '& span': {
            marginLeft: 5,
        },
    },
    btnFooter: {
        width: '40%',
        backgroundColor: colorPurple,
        color: '#FFFFFF',
        cursor: 'pointer',
        padding: 20,
        border: 0,
    },
    btnFooterDisabled: {
        width: '40%',
        backgroundColor: borderColor,
        color: colorGray,
        cursor: 'not-allowed',
        padding: 20,
        border: 0,
    },
}));

export default useStyles;
