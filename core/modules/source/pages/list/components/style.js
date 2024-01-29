import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    fieldInput: {
        maxWidth: '100%',
        '& .MuiInputBase-input': {
            padding: '8.5px 14px',
        },
    },
    edit: {
        color: '#007bdb',
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));

export default useStyles;
