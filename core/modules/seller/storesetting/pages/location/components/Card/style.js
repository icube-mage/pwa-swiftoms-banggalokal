import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY, GRAY_LIGHT, ERROR } from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 20,
        border: '1px solid',
        borderColor: GRAY_LIGHT,
        borderRadius: '8px !important',
        boxShadow: 'none !important',
        '&.errors': {
            borderColor: ERROR,
        },
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 !important',
        marginBottom: 10,
        '& .MuiCardContent-root': {
            padding: 0,
        },
    },
    collapseContent: {
        '&.MuiCardContent-root:last-child': {
            paddingBottom: 0,
        },
    },
    imgContainer: {
        padding: 0,
        width: '50%',
        height: '50%',
    },
    img: {
        maxWidth: '75% !important',
        maxHeight: '50%',
        width: 'auto',
        height: 'auto',
        display: 'block',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    method: {
        fontSize: 12,
    },
    controlLabel: {
        '& .MuiFormControlLabel-label': {
            fontFamily: font,
            fontSize: 12,
        },
        '& .MuiCheckbox-colorSecondary.Mui-checked': {
            color: `${PRIMARY} !important`,
        },
        '& .MuiCheckbox-root': {
            color: '#B1BCDA !important',
            borderRadius: '6px !important',
        },

    },
    rootLabel: {
        '&.MuiFormControlLabel-root': {
            marginBottom: '-5px',
        },
    },
    imgBack: {
        width: 80,
        height: 80,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    },
    error: {
        color: ERROR,
        fontSize: '0.75rem',
        marginTop: 10,
    },
}));

export default useStyles;
