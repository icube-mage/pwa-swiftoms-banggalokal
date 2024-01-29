import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, ERROR, BORDER_COLOR, GRAY_LIGHT3, BLACK,
} from '@theme_color';

const fontFamily = '"Plus Jakarta Sans", sans-serif';
const useStyles = makeStyles((theme) => ({
    root: {
        padding: 20,
        border: '1px solid',
        borderColor: BORDER_COLOR,
        borderRadius: 4,
        boxShadow: 'none !important',
        '&.errors': {
            borderColor: ERROR,
        },
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 20,
        padding: 0,
        marginBottom: 20,
        '& .MuiCardContent-root': {
            padding: 0,
        },
    },
    collapseContent: {
        padding: 0,
        '&:last-child': {
            paddingBottom: 0,
        },
    },
    contentAction: {
        padding: 0,
    },
    expandRoot: {
        padding: 0,
        color: BLACK,
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
        fontSize: 14,
    },
    method: {
        fontSize: 13,
        color: GRAY_LIGHT3,
    },
    divider: {
        margin: '15px 0',
    },
    formGroupRoot: {
        gap: 5,
    },
    rootCheck: {
        color: BORDER_COLOR,
        padding: 0,
    },
    checkedCheck: {
        color: PRIMARY,
    },
    rootControl: {
        margin: 0,
        gap: 5,
    },
    rootControlLabel: {
        fontFamily: `${fontFamily} !important`,
        fontSize: 13,
        color: BLACK,
    },
    imgBack: {
        width: 150,
        height: 30,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
    },
    childContent: {
        '&.MuiCardContent-root:last-child': {
            paddingBottom: 0,
        },
    },
    error: {
        color: ERROR,
        fontSize: '0.75rem',
        marginTop: 10,
    },
}));

export default useStyles;
