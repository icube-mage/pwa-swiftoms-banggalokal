import makeStyles from '@material-ui/core/styles/makeStyles';

const colorPurple = '#BE1F93';
const colorText = '#536777';

const useStyles = makeStyles((theme) => ({
    contentDropFile: {
        '& .dropzone': {
            display: 'inline-block',
        },
    },
    btn: {
        borderRadius: 20,
        border: `1.5px solid ${colorPurple}`,
        backgroundColor: 'transparent',
        color: colorPurple,
        '&:hover': {
            backgroundColor: 'transparent !important',
        },
        margin: '0px 15px',
        [theme.breakpoints.down('xs')]: {
            '&.MuiButton-label': {
                fontSize: 10,
            },
            margin: '5px 0px',
        },
        '&.no-margin': {
            margin: 0,
        },
    },
    textNoFile: {
        color: colorText,
        padding: '0px 10px',
    },
}));

export default useStyles;
