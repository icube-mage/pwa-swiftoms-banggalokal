import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const colorText = '#536777';

const useStyles = makeStyles((theme) => ({
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
        },
    },
    formField: {
        display: 'grid',
        gridTemplateColumns: '30% 70%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
        padding: 0,
        marginTop: 8,
        '& .MuiSvgIcon-root': {
            color: '#CCCCCC',
            width: 20,
            '&:hover': {
                color: 'unset',
            },
        },
    },
    formFieldCheck: {
        display: 'grid',
        gridTemplateColumns: '30% 70%',
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40% 60%',
        },
        padding: 0,
        marginTop: 8,
    },
}));

export default useStyles;
