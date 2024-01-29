import { makeStyles } from '@material-ui/core/styles';

const colorGreen = '#5EC929';
const colorOrange = '#FF962C';
const colorRed = '#DA1414';
const colorGray = '#B1BCDB';

const useStyles = makeStyles(() => ({
    green: {
        color: colorGreen,
    },
    orange: {
        color: colorOrange,
    },
    red: {
        color: colorRed,
    },
    gray: {
        color: colorGray,
    },
}));

export default useStyles;
