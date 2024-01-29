import makeStyles from '@material-ui/core/styles/makeStyles';

const colorPurple = '#BE1F93';
const useStyles = makeStyles(() => ({
    primary: {
        borderRadius: 7,
        background: colorPurple,
        color: '#FFFFFF',
        '&:hover': {
            background: colorPurple,
        },
        padding: '5px 16px',
        fontWeight: 400,
        textTransform: 'capitalize',
        boxShadow: 'none',
    },
    outlined: {
        borderRadius: 7,
        background: 'transparent',
        border: `1px solid ${colorPurple}`,
        padding: '5px 16px',
        color: colorPurple,
        fontWeight: 400,
        boxShadow: 'none',
        '&:hover': {
            background: 'transparent',
        },
        textTransform: 'capitalize',
    },
    rounded: {
        borderRadius: 20,
        fontWeight: 400,
        textTransform: 'capitalize',
    },
    buttonText: {
        background: 'none',
        color: colorPurple,
        fontWeight: 600,
        textTransform: 'unset',
        letterSpacing: 0,
        boxShadow: 'none',
        textDecoration: 'underline',
        '&:hover': {
            background: 'none',
            boxShadow: 'none',
            color: colorPurple,
            textDecoration: 'underline',
        },
    },
    link: {
        background: 'none',
        color: '#536777',
        fontWeight: 400,
        textTransform: 'unset',
        letterSpacing: 0,
        boxShadow: 'none',
        '&:hover': {
            background: 'none',
            boxShadow: 'none',
            color: 'rgba(0, 0, 0, 0.87)',
        },
    },
    disabled: {
        borderColor: 'unset',
    },
}));

export default useStyles;
