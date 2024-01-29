import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';

const useStyles = makeStyles((theme) => ({
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px',
        minWidth: 'unset',
        height: 36,
        width: 42,
        marginBottom: 6,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 18,
        },
    },
    titleTop: {
        fontSize: 24,
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
    },
    container: {
        padding: '16px 0',
        borderRadius: 16,
    },
    textAttach: {
        fontWeight: 'bold',
        display: 'block',
        padding: '10px 29px 12px 22px',
    },
    label: {
        color: colorText,
        fontFamily: font,
        position: 'relative',
    },
    formFieldButton: {
        padding: '24px 29px 30px 22px',
    },
    btn: {
        borderRadius: 20,
    },
    content: {
        borderBottom: '3px solid #F5F7FB',
        padding: '10px 29px 12px 22px',
    },

    table: {
        width: '100%',
        '& th': {
            backgroundColor: colorPurple,
            padding: '11px 10px',
            textAlign: 'left',
            color: 'white',
        },
        '& td': {
            padding: '11px 10px',
            width: 'auto',
        },
    },
    autocompleteRoot: {
        width: '100%',
    },
    tableInputRoot: {
        width: '100%',
    },
    tableInput: {
        '& input': {
            width: '100%',
            padding: 10,
        },
    },
    formFieldGrid: {
        display: 'grid',
        gridTemplateColumns: '20% 40% 40%',
        alignItems: 'center',
        [theme.breakpoints.between('768', '1024')]: {
            gridTemplateColumns: '20% 80%',
        },
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '25% 75%',
        },
        '& .link-download': {
            [theme.breakpoints.between('768', '1024')]: {
                gridColumnStart: 2,
                paddingTop: 10,
            },
            [theme.breakpoints.down('xs')]: {
                gridColumnStart: 2,
                paddingTop: 10,
            },
        },
    },
    autocompleteRootType: {
        width: '90%',
        '& .MuiOutlinedInput-root': {
            borderRadius: 20,
            height: 36,
            padding: '0 9px',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
}));

export default useStyles;
