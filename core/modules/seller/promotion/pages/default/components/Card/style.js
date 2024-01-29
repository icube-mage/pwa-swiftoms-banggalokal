import { makeStyles } from '@material-ui/core/styles';
import {
    GRAY_LIGHT, ERROR, PRIMARY_DARK, TABLE_GRAY, PRIMARY, TEXT_COLOR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 20,
        border: '1px solid',
        borderColor: GRAY_LIGHT,
        borderRadius: '8px !important',
        boxShadow: 'none !important',
        display: 'grid',
        gridTemplateColumns: '62px calc(100% - 50px)',
        '&.errors': {
            borderColor: ERROR,
        },
        cursor: 'pointer',
        '& .MuiCollapse-root': {
            gridColumnStart: 2,
        },
    },
    content: {
        display: 'flex',
        padding: '0 !important',
        '& .MuiCardContent-root': {
            padding: 0,
        },
        '&.title': {
            marginBottom: 10,
        },
    },
    collapseContent: {
        marginTop: 20,
        padding: '0 !important',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
        padding: 0,
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '& .MuiSvgIcon-root': {
            color: PRIMARY_DARK,
            width: 21,
            height: 18,
            backgroundColor: TABLE_GRAY,
        },
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    name: {
        fontWeight: 'bold',
        fontSize: 14,
        color: PRIMARY_DARK,
    },
    description: {
        fontSize: 13,
        color: TEXT_COLOR,
        [theme.breakpoints.up('md')]: {
            minHeight: 56,
        },
        maxWidth: '85%',
    },
    imgBack: {
        width: 52,
        height: 52,
        marginRight: 10,
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {
        height: 'auto',
    },
    btn: {
        borderRadius: 6,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        borderColor: PRIMARY,
        padding: '12px 30px',
        height: 40,
        fontSize: 13,
        maxWidth: '100%',
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
    },
}));

export default useStyles;
