import { makeStyles } from '@material-ui/core/styles';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles(() => ({
    fieldInput: {
        '& .MuiInputBase-input': {
            padding: '8.5px 14px',
        },
    },
    controllable: {
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 14,
        },
    },
}));

export default useStyles;
