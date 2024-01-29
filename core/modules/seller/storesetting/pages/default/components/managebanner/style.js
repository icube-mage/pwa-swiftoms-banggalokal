import { makeStyles } from '@material-ui/core/styles';
import {
    BOX_SHADOW, GRAY_LIGHT, PRIMARY, PRIMARY_DARK, TEXT_COLOR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        minHeight: 500,
        '&::-webkit-overflow-scrolling': 'touch',
        '&::-webkit-scrollbar': {
            height: '.4em',
            width: '.4em',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 2px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: PRIMARY_DARK,
            borderRadius: 5,
        },
        [theme.breakpoints.down('xs')]: {
            overflowX: 'auto',
        },
    },
    componentContainer: {
        position: 'fixed',
        top: '50%',
        zIndex: 99,
        backgroundColor: 'white',
        display: 'block',
        width: 122,
        boxShadow: `0px 3px 15px ${BOX_SHADOW}`,
    },
    item: {
        backgroundColor: GRAY_LIGHT,
        fontSize: 14,
        color: 'white',
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: PRIMARY,
            transition: 'all .2s',
        },
    },
    head: {
        display: 'flex',
        justifyContent: 'space-between',
        '& .gap': {
            alignItems: 'baseline',
            display: 'flex',
            gap: 15,
        },
        margin: '10px 0',
    },
    title: {
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        marginTop: 0,
    },
    modeContainer: {
        backgroundColor: 'white',
        borderRadius: 4,
        boxShadow: `0px 3px 15px ${BOX_SHADOW}`,
        display: 'flex',
        marginLeft: 15,
        width: 'fit-content',
    },
    mode: {
        cursor: 'pointer',
        backgroundColor: 'white',
        padding: '10px 18px',
        display: 'flex',
        color: TEXT_COLOR,
        '&:hover': {
            color: PRIMARY,
            transition: 'all .2s',
        },
        '&.active': {
            color: PRIMARY,
        },
        '& .icon': {
            height: 22,
        },
        '&.border': {
            borderRight: `2px solid ${BOX_SHADOW}`,
        },
    },
    btnContainer: {
        textAlign: 'end',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'start',
        },
    },
    btn: {
        background: PRIMARY,
        borderRadius: 7,
        padding: 6,
        boxShadow: 'none',
        // width: '100%',
        height: 42,
        width: 130,
        '&:hover': {
            background: PRIMARY_DARK,
            boxShadow: 'none',
        },
        marginLeft: 10,
        '&.disabled': {
            background: GRAY_LIGHT,
            color: 'white',
            borderColor: GRAY_LIGHT,
            '&.MuiButton-contained:hover.Mui-disabled': {
                background: GRAY_LIGHT,
                color: 'white',
                borderColor: GRAY_LIGHT,
            },
            '&.MuiButtonBase-root.Mui-disabled': {
                pointerEvents: 'unset',
                cursor: 'not-allowed',
            },
        },
    },
    contentItem: {
        padding: '10px 0',
        position: 'relative',
        paddingRight: 25,
        '&.mobile': {
            paddingRight: 10,
        },
    },
    contentContainer: {
        boxShadow: '0px 3px 15px #4D2F821A !important',
        padding: '10px 25px',
        borderRadius: '8px !important',
        marginBottom: 30,
        backgroundColor: 'white',
        width: '100%',
        display: 'block',
        '&.nonVisible': {
            visibility: 'hidden',
        },
        '&.right': {
            padding: 20,
        },
        '&.mobile': {
            padding: '5px 10px',
            paddingRight: 0,
        },
        paddingRight: 0,
    },
    editContainer: {
        backgroundColor: 'white',
        borderRadius: 4,
        boxShadow: `0px 3px 15px ${BOX_SHADOW}`,
        height: 'fit-content',
        position: 'absolute',
        right: -50,
        top: 10,
    },
    iconEdit: {
        cursor: 'pointer',
        padding: 10,
        display: 'flex',
        color: PRIMARY_DARK,
        '&:hover': {
            color: PRIMARY,
            transition: 'all .2s',
        },
        '& .icon': {
            width: 20,
        },
        '&.border': {
            borderBottom: `2px solid ${BOX_SHADOW}`,
        },
    },
    subtitle: {
        fontSize: 14,
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        marginBottom: 0,
    },
    description: {
        fontSize: 13,
        color: PRIMARY_DARK,
        marginTop: 5,
        marginBottom: 20,
        '& .bold': {
            fontWeight: 'bold',
        },
        '& .link': {
            color: PRIMARY,
            '&:hover': {
                textDecoration: 'underline',
                transition: 'all .2s',
            },
        },
    },
    uploadTitle: {
        fontSize: 13,
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        margin: 0,
    },
    imgContainer: {
        cursor: 'pointer',
        height: 300,
        display: 'flex',
        border: `1px solid ${GRAY_LIGHT}`,
        '&:hover': {
            transition: 'all .2s',
            border: `1px solid ${PRIMARY}`,
        },
        '&.active': {
            transition: 'all .2s',
            border: `1px solid ${PRIMARY}`,
        },
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&.two': {
            height: 150,
        },
        '&.center': {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        '&.mobile': {
            height: 150,
        },
    },
    gridContainer: {
        display: 'flex',
    },
    gridItem: {
        width: 650,
        minWidth: 650,
        '&.mobile': {
            width: 320,
            minWidth: 320,
        },
    },
    gridEdit: {
        width: 362,
        minWidth: 362,
        '&.nonVisible': {
            visibility: 'hidden',
        },
        position: 'absolute',
        right: -425,
        top: 10,
    },
    gridSpace: {
        width: 150,
    },
    btnMore: {
        position: 'absolute',
        cursor: 'pointer',
        top: 0,
        right: -10,
        color: PRIMARY_DARK,
        '&.MuiIconButton-root:hover': {
            backgroundColor: 'transparent',
        },
        '&.mobile': {
            right: -18,
        },
    },
}));

export default useStyles;
