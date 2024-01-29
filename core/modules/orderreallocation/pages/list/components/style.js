import { makeStyles } from '@material-ui/core/styles';

const colorText = '#536777';

const useStyles = makeStyles(() => ({
    fieldInput: {
        border: '1px solid',
        borderColor: colorText,
        height: 56,
        borderRadius: 4,
        '& .MuiInputBase-input': {
            padding: '18.5px 14px',
        },
    },
}));

export default useStyles;
