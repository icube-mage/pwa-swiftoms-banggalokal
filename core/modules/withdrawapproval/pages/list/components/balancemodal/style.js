import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const colorText = '#536777';

const useStyles = makeStyles(() => ({
    paper: {
        padding: '25px 20px',
        borderRadius: 5,
        margin: '20px 0',
        boxShadow: '0px 3px 25px #00000066',
        color: colorText,
    },
    titleTop: {
        color: colorPurple,
        '& .MuiTypography-h6': {
            fontWeight: 'bold !important',
            display: 'flex',
            justifyContent: 'space-between',
        },
        padding: 0,
        paddingBottom: 16,
    },
    close: {
        color: '#536777',
        cursor: 'pointer',
    },
    content: {
        minHeight: 80,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    progress: {
        color: `${colorPurple} !important`,
    },
    balanceData: {
        fontSize: 18,
    },
    error: {
        backgroundColor: '#FFD2D2',
        color: 'red',
        width: '100%',
        padding: 5,
    },
}));

export default useStyles;
