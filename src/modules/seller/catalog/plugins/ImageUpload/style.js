import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    GRAY_LIGHT, GRAY_BG, PRIMARY_DARK, PRIMARY,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        [theme.breakpoints.down('lg')]: {
            justifyContent: 'center',
        },
        [theme.breakpoints.up('sm')]: {
            display: 'grid',
            gridTemplateColumns: 'repeat(5, min-content)',
        },
    },
    btn: {
        borderRadius: 6,
        backgroundColor: GRAY_BG,
        textTransform: 'none',
        color: PRIMARY_DARK,
        height: 160,
        width: 160,
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
        [theme.breakpoints.up('sm')]: {
            maxWidth: 110,
            maxHeight: 110,
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: 160,
            maxHeight: 160,
        },
    },
    textFile: {
        color: PRIMARY_DARK,
        fontSize: 12,
        textAlign: 'center',
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
        width: 150,
        marginTop: 5,
        [theme.breakpoints.up('sm')]: {
            maxWidth: 100,
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: 150,
        },
    },
    icon: {
        height: 40,
        width: 40,
    },
    imgGroup: {
        margin: 10,
        textAlign: 'center',
        width: 160,
        [theme.breakpoints.up('sm')]: {
            maxWidth: 110,
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: 160,
        },
    },
    dragHandle: {
        position: 'absolute',
        top: 0,
        left: 0,
        color: PRIMARY,
        fontSize: '1.25rem',
        cursor: 'move',
    },
    imgContainer: {
        position: 'relative',
        border: `1px solid ${GRAY_LIGHT}`,
        borderStyle: 'dashed',
        padding: 0,
        width: 160,
        height: 160,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backgroundColor: 'white',
        borderRadius: 6,
        [theme.breakpoints.up('sm')]: {
            maxWidth: 110,
            maxHeight: 110,
            height: '100%',
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: 160,
            maxHeight: 160,
        },
    },
    imgContainerMain: {
        border: `1px solid ${PRIMARY}`,
        borderStyle: 'solid',
    },
    imgMainWrapper: {
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        paddingBottom: 5,
    },
    imgMainInfo: {
        marginRight: 1,
        marginTop: 1,
        [theme.breakpoints.up('sm')]: {
            marginRight: 1,
            marginTop: 0.5,
        },
        [theme.breakpoints.up('lg')]: {
            marginRight: 2,
            marginTop: 1,
        },
    },
    img: {
        maxWidth: 150,
        maxHeight: 150,
        width: 'auto',
        height: 'auto',
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            maxWidth: 100,
            maxHeight: 100,
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: 150,
            maxHeight: 150,
        },
    },
    trashIcon: {
        position: 'absolute',
        height: 16,
        width: 'auto',
        cursor: 'pointer',
        left: 5,
        bottom: 5,
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
