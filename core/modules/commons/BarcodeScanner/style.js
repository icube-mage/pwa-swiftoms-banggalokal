import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    scan: {
        display: 'flex',
        justifyContent: 'center',
        '& #scanner-container': {
            position: 'relative',
        },
        '& .drawingBuffer': {
            display: 'none',
        },
        '& video': {
            '@media (max-width: 767px )': {
                height: window.innerHeight / 2,
            },
        },
    },
    scanText: {
        fontStyle: 'italic',
        marginBottom: 20,
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 65,
        zIndex: 1,
    },
    closeIcon: {
        color: 'white',
        width: 36,
        height: 36,
    },
    matchIcon: {
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        left: 0,
        marginTop: '-50px',
    },
    matchIconManual: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    icon: {
        backgroundColor: 'white',
        border: '5px solid white',
        borderRadius: 99,
        width: 80,
        height: 80,
        '&.cancel': {
            color: '#DA1414',
        },
        '&.check': {
            color: '#5EC929',
        },
        '&.none': {
            color: 'gray',
        },
    },
}));

export default useStyles;
