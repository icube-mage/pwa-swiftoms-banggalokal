import { makeStyles } from '@material-ui/core/styles';

const colorGreen = '#5EC929';
const colorOrange = '#FF962C';
const colorRed = '#DA1414';
const colorGray = '#B1BCDB';

const useStyles = makeStyles(() => ({
    green: {
        color: colorGreen,
        fontWeight: 600,
    },
    orange: {
        color: colorOrange,
        fontWeight: 600,
    },
    red: {
        color: colorRed,
        fontWeight: 600,
    },
    gray: {
        color: colorGray,
        fontWeight: 600,
    },
}));

export default useStyles;
