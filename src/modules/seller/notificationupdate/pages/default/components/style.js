import { makeStyles } from '@material-ui/core/styles';
import {
    BORDER_COLOR, GRAY_LIGHT3, PRIMARY,
} from '@theme_color';

const fontFamily = '"Plus Jakarta Sans", sans-serif !important';
const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: 20,
        [theme.breakpoints.down('xs')]: {
            margin: 10,
            paddingBottom: 80,
        },
    },
    paperContainer: {
        border: `1px solid ${BORDER_COLOR}`,
        fontFamily,
        borderRadius: 6,
        boxShadow: 'none',
        fontSize: 13,
        [theme.breakpoints.down('xs')]: {
            margin: 10,
        },
        '& .bold': {
            fontWeight: 'bold',
        },
        '& .mb10': {
            marginBottom: 10,
        },
        '& .mb20': {
            marginBottom: 20,
        },
        '& .mb30': {
            marginBottom: 30,
        },
        '& .mt20': {
            marginTop: 20,
        },
        '& .p20': {
            padding: 20,
        },
        '& .p30': {
            padding: 30,
        },
        '& .pb25': {
            paddingBottom: 25,
        },
        '& .f16': {
            fontSize: 16,
        },
        '& .f20': {
            fontSize: 20,
        },
        '& .flex': {
            display: 'flex',
            alignItems: 'center',
            gap: 10,
        },
        '& .flex-between': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        '& .mobile-block': {
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
                alignItems: 'unset',
            },
        },
        '& .gap5': {
            gap: 5,
        },
        '& .center': {
            display: 'grid',
            placeItems: 'center',
        },
        '& .end-mobile': {
            justifyContent: 'end',
        },
    },
    seeMore: {
        color: PRIMARY,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
        cursor: 'pointer',
        fontWeight: 'bold',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none',
        },
    },
    updateContent: {
        paddingLeft: 24,
        paddingRight: '20%',
        color: GRAY_LIGHT3,
        wordBreak: 'break-word',
        '& img': {
            maxWidth: '100%',
            maxHeight: '100%',
            width: 200,
        },
        [theme.breakpoints.down('xs')]: {
            paddingRight: 0,
        },
    },
    iconRoot: {
        width: 14,
        height: 14,
        '&.primary': {
            color: PRIMARY,
        },
    },
    progress: {
        display: 'grid',
        placeItems: 'center',
        paddingBottom: 30,
    },
}));

export default useStyles;
