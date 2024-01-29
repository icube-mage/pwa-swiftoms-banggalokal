import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const titleFont = 'normal normal bold 30px/37px "Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles(() => ({
    fieldInputFilter: {
        '& .MuiInputBase-input': {
            padding: '8.5px 14px',
        },
    },
    actionButton: {
        padding: 0,
    },
    menu: {
        '& .MuiPaper-elevation8': {
            boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 10%), 0px 3px 14px 2px rgb(0 0 0 / 0%)',
        },
    },
    menuItem: {
        '&.purple': {
            color: colorPurple,
        },
        fontSize: 16,
    },
    paper: {
        borderRadius: 16,
    },
    dialogTitle: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    textTitle: {
        '& .MuiTypography-h6': {
            font: titleFont,
            color: colorPurple,
        },
        paddingBottom: 0,
    },
    content: {
        padding: 20,
    },
}));

export default useStyles;
