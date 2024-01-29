import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    title: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 20,
        display: 'flex',
        gap: 20,
    },
    btnRoot: {
        width: 184,
    },
    btnRootOutlined: {
        width: 142,
    },
}));

export default useStyles;
