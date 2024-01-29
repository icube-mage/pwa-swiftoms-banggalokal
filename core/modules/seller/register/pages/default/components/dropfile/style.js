import makeStyles from '@material-ui/core/styles/makeStyles';
import { PRIMARY_DARK } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    contentDropFile: {
        '& .dropzone': {
            display: 'inline-block',
            width: '100%',
        },
    },
    btn: {
        borderRadius: 6,
        backgroundColor: 'white',
        color: PRIMARY_DARK,
        height: 42,
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: 'white !important',
        },
        [theme.breakpoints.down('xs')]: {
            '&.MuiButton-label': {
                fontSize: 10,
            },
            margin: '5px 0px',
        },
        '& .MuiButton-label': {
            justifyContent: 'left',
        },
        '&.error': {
            border: '1px solid red',
        },
    },
    textFile: {
        color: PRIMARY_DARK,
        padding: '0px 15px',
        fontSize: 13,
        textAlign: 'left',
        width: '100%',

    },
    errorText: {
        color: 'red',
        fontSize: '0.75rem',
        marginTop: 5,
    },
    fileName: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        width: '45%',
        display: 'inline-block',
        verticalAlign: 'middle',
    },
}));

export default useStyles;
