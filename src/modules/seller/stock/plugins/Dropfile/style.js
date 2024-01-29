import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    BLUE_LINK,
    GRAY_LIGHT, GRAY_LIGHT2, PRIMARY, PRIMARY_DARK, WHITE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    contentDropFile: {
        justifyContent: 'center',
        alignItems: 'center',
        '& .dropzone': {
            display: 'inline-block',
            width: '100%',
        },
    },
    btn: {
        borderRadius: 6,
        backgroundColor: 'transparent',
        textTransform: 'none',
        color: GRAY_LIGHT2,
        minHeight: 32,
        boxShadow: 'none',
        border: `1px solid ${GRAY_LIGHT2}`,
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
            justifyContent: 'center',
        },
        '&.error': {
            border: '1px solid red',
        },
    },
    btnIcon: {
        height: '18px !important',
        marginRight: 10,
    },
    textFile: {
        color: GRAY_LIGHT,
        marginLeft: 10,
        fontSize: 12,
        textAlign: 'left',
        '& span': {
            color: BLUE_LINK,
            textDecoration: 'underline',
        },
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
        height: 16,
        opacity: 0.5,
    },
    btnFileContainer: {
        marginRight: 5,
        marginBottom: 10,
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginLeft: 0,
            marginTop: 10,
            '& [class*="MuiButton-contained"]': {
                width: '100%',
                height: '42px',
            },
        },
    },
    btnFileContainer2: {
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginLeft: 0,
            marginTop: 10,
            '& [class*="MuiButton-contained"]': {
                width: '100%',
                height: '42px',
            },
        },
    },
    btnFile: {
        borderRadius: 5,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
        borderColor: PRIMARY,
        color: WHITE,
        padding: '9px 21px',
        height: 32,
        paddingLeft: 30,
        paddingRight: 35,
        fontSize: 13,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: PRIMARY,
            boxShadow: 'none',
            color: WHITE,
            borderColor: PRIMARY,
        },
        [theme.breakpoints.down('md')]: {
            minHeight: 35,
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
