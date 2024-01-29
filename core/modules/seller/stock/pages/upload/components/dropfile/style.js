import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    GRAY_LIGHT, PRIMARY, PRIMARY_DARK, SECONDARY,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    contentDropFile: {
        '& .dropzone': {
            display: 'inline-block',
            width: '100%',
        },
    },
    btn: {
        borderRadius: 6,
        backgroundColor: 'transparent',
        textTransform: 'none',
        color: GRAY_LIGHT,
        minHeight: 42,
        boxShadow: 'none',
        border: `1px solid ${GRAY_LIGHT}`,
        borderStyle: 'dashed',
        padding: '6px 15px',
        '&:hover': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
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
        color: GRAY_LIGHT,
        marginLeft: 10,
        fontSize: 12,
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
        width: '60%',
        [theme.breakpoints.down('xs')]: {
            width: '80%',
        },
        display: 'inline-block',
        verticalAlign: 'middle',
    },
    icon: {
        height: 21,
    },
    btnFile: {
        borderRadius: 8,
        background: 'white',
        boxShadow: 'none',
        textTransform: 'capitalize',
        borderColor: PRIMARY,
        color: PRIMARY,
        padding: '9px 21px',
        height: 42,
        fontSize: 13,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: 'white',
            boxShadow: 'none',
            color: SECONDARY,
            borderColor: SECONDARY,
        },
        [theme.breakpoints.down('md')]: {
            minHeight: 42,
        },
        '&.primary': {
            background: PRIMARY,
            borderColor: 'transparent',
            color: 'white',
            '&:hover': {
                backgroundColor: PRIMARY_DARK,
                boxShadow: 'none',
                color: 'white',
                borderColor: 'transparent',
            },
        },
    },
    gridMobile: {
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            maxWidth: '100%',
            margin: 0,
        },
        '&.MuiGrid-item': {
            [theme.breakpoints.down('sm')]: {
                padding: '12px 0px',
            },
        },
    },
}));

export default useStyles;
