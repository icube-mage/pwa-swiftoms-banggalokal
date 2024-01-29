import { makeStyles } from '@material-ui/core/styles';

const borderColor = '#DDE1EC';

const useStyles = makeStyles(() => ({
    img: {
        width: 200,
        height: 'fit-content',
        cursor: 'pointer',
    },
    fieldInputMultiple: {
        border: '1px solid',
        borderColor,
    },
}));

export default useStyles;
