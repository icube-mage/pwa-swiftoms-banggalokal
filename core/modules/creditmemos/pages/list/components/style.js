import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    fieldInput: {
        '& .MuiInputBase-input': {
            padding: '8.5px 14px',
        },
    },
}));

export default useStyles;
