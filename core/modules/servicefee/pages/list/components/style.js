import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY, BLUE_LINK, GRAY_LIGHT } from '@theme_color';

const useStyles = makeStyles(() => ({
    editLink: {
        color: BLUE_LINK,
        '& .text': {
            '&:hover': {
                textDecoration: 'underline',
            },
            cursor: 'pointer',
        },
    },
    dialogContainer: {
        padding: '15px 20px',
        borderRadius: 8,
        position: 'relative',
        width: 500,
        overflow: 'hidden',
    },
    dialogTitleContainer: {
        textAlign: 'center',
        color: PRIMARY,
        '& .MuiTypography-root': {
            fontWeight: 'bold',
        },
    },
    closeButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    content: {
        color: PRIMARY,
        fontSize: 14,
        paddingRight: 0,
        paddingLeft: 0,
        '& .title': {
            fontWeight: 600,
        },
        marginBottom: 20,
        '&.button': {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            borderBottom: '0px',
        },
        '& .required': {
            '&::after': {
                content: "'*'",
                display: 'block',
                position: 'absolute',
                top: -3,
                right: -8,
                color: PRIMARY,
                fontSize: 14,
            },
        },
    },
    textInput: {
        width: '100%',
        '& .MuiInput-underline:before': {
            borderColor: GRAY_LIGHT,
        },
    },
    btn: {
        borderRadius: 6,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        padding: '12px 15px',
        height: 42,
        fontSize: 13,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: PRIMARY,
            boxShadow: 'none',
            borderColor: PRIMARY,
        },
        '&.disabled': {
            background: GRAY_LIGHT,
            color: 'white',
            borderColor: GRAY_LIGHT,
        },
        '&.outlined': {
            background: 'white',
            borderColor: PRIMARY,
            color: PRIMARY,
            '&:hover': {
                backgroundColor: 'white',
                boxShadow: 'none',
                borderColor: PRIMARY,
                color: PRIMARY,
            },
        },
    },
}));

export default useStyles;
