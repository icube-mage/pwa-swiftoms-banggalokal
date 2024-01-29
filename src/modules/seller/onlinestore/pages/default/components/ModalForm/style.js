import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY, PRIMARY_DARK, BORDER_COLOR } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    buttonRoot: {
        boxShadow: 'none',
        height: 36,
        borderRadius: 4,
        width: 120,
        '&:hover': {
            background: PRIMARY_DARK,
        },
    },
    buttonRootOutlined: {
        boxShadow: 'none',
        height: 36,
        borderRadius: 4,
        border: `1px solid ${PRIMARY}`,
        backgroundColor: 'transparent',
        color: PRIMARY,
        width: 120,
        '&:hover': {
            border: `1px solid ${PRIMARY_DARK}`,
            color: PRIMARY_DARK,
            backgroundColor: 'transparent',
        },
    },
    wrapperDialog: {
        position: 'relative',
        '& h2': {
            color: PRIMARY_DARK,
            fontSize: 20,
            fontWeight: 600,
            textAlign: 'center',
        },
    },
    paperWidthSm: {
        minWidth: 500,
        [theme.breakpoints.down('xs')]: {
            minWidth: 300,
        },
    },
    closeButtonDialog: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    textInput: {
        height: 38,
        width: '100%',
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-root': {
            borderRadius: 4,
            padding: '2px 10px',
            border: `1px solid ${BORDER_COLOR}`,
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
    },
    contentDialogForm: {
        paddingBottom: 30,
    },
    contentDialogButton: {
        justifyContent: 'end',
        paddingBottom: 20,
        display: 'flex',
        gap: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    note: {
        fontSize: 13,
        marginTop: 5,
        '&.marginTop': {
            marginTop: 25,
        },
    },
    templateImageContainer: {
        marginTop: 10,
        borderRadius: 8,
        width: 450,
        height: 300,
        marginBottom: 20,
        '&.noMargin': {
            marginBottom: 0,
        },
    },
    templateImage: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        maxWidth: 452,
        maxHeight: 300,
    },
}));

export default useStyles;
