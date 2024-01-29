import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    GRAY_LIGHT, GRAY_BG, PRIMARY_DARK, TABLE_GRAY,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
        },
        backgroundColor: TABLE_GRAY,
        borderRadius: 6,
        padding: '5px 10px',
    },
    btn: {
        borderRadius: 6,
        backgroundColor: GRAY_BG,
        textTransform: 'none',
        color: PRIMARY_DARK,
        height: 85,
        width: 85,
        boxShadow: 'none',
        border: `1px solid ${GRAY_LIGHT}`,
        borderStyle: 'dashed',
        '&:hover': {
            backgroundColor: GRAY_BG,
            boxShadow: 'none',
        },
        [theme.breakpoints.down('xs')]: {
            '&.MuiButton-label': {
                fontSize: 12,
            },
            margin: '5px 0px',
        },
        '& .MuiButton-label': {
            display: 'block',
            justifyContent: 'center',
        },
        '&.error': {
            border: '1px solid red',
        },
        '&.disabled': {
            background: GRAY_LIGHT,
            color: 'white',
            borderColor: GRAY_LIGHT,
        },
    },
    textFile: {
        color: PRIMARY_DARK,
        fontSize: 9,
        textAlign: 'center',
        width: '100%',
        maxHeight: 40,
        textOverflow: 'ellipsis',
    },
    errorText: {
        color: 'red',
        fontSize: '0.75rem',
        marginTop: 5,
        textAlign: 'left',
    },
    fileName: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        verticalAlign: 'middle',
        color: PRIMARY_DARK,
        fontSize: 12,
        textAlign: 'center',
        width: 85,
        marginTop: 5,
    },
    icon: {
        height: 21,
    },
    imgGroup: {
        margin: 10,
        textAlign: 'center',
        width: 85,
    },
    imgContainer: {
        position: 'relative',
        border: `1px solid ${GRAY_LIGHT}`,
        borderStyle: 'dashed',
        padding: 0,
        width: 85,
        height: 85,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backgroundColor: 'white',
    },
    img: {
        maxWidth: 75,
        maxHeight: 75,
        width: 'auto',
        height: 'auto',
        display: 'block',
    },
    trashIcon: {
        position: 'absolute',
        height: 16,
        width: 'auto',
        cursor: 'pointer',
        right: '5%',
        bottom: '5%',
        '&.disabled': {
            color: 'white',
        },
    },
    typeContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    labelType: {
        backgroundColor: GRAY_LIGHT,
        borderRadius: 20,
        marginBottom: 10,
        marginRight: 5,
        padding: '5px 10px',
        width: 'fit-content',
        fontSize: 11,
        textTransform: 'capitalize',
    },
}));

export default useStyles;
