import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, TEXT_COLOR, DISABLED, GRAY_LIGHT,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('sm')]: {
            padding: '0 10px',
        },
        paddingBottom: 5,
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .left': {
            display: 'flex',
            alignItems: 'center',
            '& .MuiIconButton-root': {
                padding: 0,
                paddingRight: 10,
            },
            '& .MuiSvgIcon-root': {
                fill: PRIMARY_DARK,
                height: 30,
                width: 'auto',
            },
            '& .MuiIconButton-root:hover': {
                background: 'none',
            },
        },
        marginBottom: 20,
    },
    paper: {
        boxShadow: '0px 3px 15px #4D2F821A !important',
        padding: 30,
        borderRadius: '8px !important',
        marginBottom: 30,
    },
    title: {
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 0,
        '&.paper': {
            marginBottom: 30,
        },
    },
    btn: {
        borderRadius: 6,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        borderColor: PRIMARY,
        padding: '12px 30px',
        height: 42,
        fontSize: 15,
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '&.outlined': {
            background: 'transparent',
            color: PRIMARY,
            '&:hover': {
                background: 'transparent',
                boxShadow: 'none',
                color: PRIMARY_DARK,
                borderColor: PRIMARY_DARK,
            },
            '&.disabled': {
                background: GRAY_LIGHT,
                color: 'white',
                borderColor: GRAY_LIGHT,
            },
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 12,
            padding: '8px 15px',
        },
    },
    formFieldsGrid: {
        display: 'grid',
        gridTemplateColumns: '20% 80%',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
        marginBottom: 20,
        alignItems: 'center',
        '&.start': {
            alignItems: 'flex-start',
        },
        [theme.breakpoints.up('sm')]: {
            '&.image': {
                display: 'block',
            },
        },
        [theme.breakpoints.up('xl')]: {
            '&.image': {
                display: 'grid',
            },
        },
    },
    required: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -3,
            right: -9,
            color: PRIMARY,
            fontSize: 16,
        },
    },
    label: {
        '&.MuiFormLabel-root': {
            fontSize: 14,
            color: PRIMARY_DARK,
            fontWeight: 600,
            marginBottom: 10,
        },
        position: 'relative',
        width: 'fit-content',
        '&.disabled': {
            color: DISABLED,
        },
    },
    helper: {
        fontSize: 13,
        color: TEXT_COLOR,
        marginTop: -10,
        '& .primary': {
            color: PRIMARY,
        },
        '&.mt20': {
            marginTop: '2rem',
        },
    },
    helperLink: {
        color: PRIMARY,
    },
    desc: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },
    btnContainer: {
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            justifyContent: 'end',
            marginTop: 20,
        },
    },
}));

export default useStyles;
