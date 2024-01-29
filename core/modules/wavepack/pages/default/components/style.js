import { makeStyles } from '@material-ui/core/styles';

const colorRed = '#DA1414';
const colorGray = '#B1BCDB';
const colorOrange = '#FF962C';

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
}));

export default useStyles;
