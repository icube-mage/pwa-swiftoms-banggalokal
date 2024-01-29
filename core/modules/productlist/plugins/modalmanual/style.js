import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';

const useStyles = makeStyles(() => ({
    circular: {
        marginTop: '20%',
        '& .MuiCircularProgress-colorPrimary': {
            color: colorPurple,
        },
        display: 'flex',
        justifyContent: 'center',
    },
    btnContainer: {
        display: 'flex',
        justifyContent: 'end',
        marginBottom: 40,
    },
    imgThumbContainer: {
        height: 50,
        width: 50,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    },
    imgThumb: {
        height: '90%',
        width: 'auto',
    },
}));

export default useStyles;
