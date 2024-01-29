import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, WHITE, TEXT_COLOR, BORDER_COLOR, GRAY_BG_2, PRIMARY,
} from '@theme_color';

const fontFamily = '"Plus Jakarta Sans", sans-serif !important';
const useStyles = makeStyles((theme) => ({
    dialogContainerRoot: {
        overflowX: 'hidden',
        '& .MuiDialog-paperScrollPaper': {
            '&::-webkit-overflow-scrolling': 'touch',
            '&::-webkit-scrollbar': {
                height: '.5em',
                width: '.5em',
            },
            '&::-webkit-scrollbar-track': {
                '-webkit-box-shadow': 'inset 0 0 2px rgba(0,0,0,0.00)',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: TEXT_COLOR,
                borderRadius: 5,
            },
        },
        fontFamily,
    },
    dialogContainer: {
        padding: 30,
        paddingTop: 10,
        borderRadius: 6,
        position: 'relative',
        width: 500,
        overflowX: 'hidden',
        [theme.breakpoints.down('xs')]: {
            padding: 10,
            paddingTop: 50,
            borderRadius: 14,
            position: 'absolute',
            top: '30%',
            height: 'fit-content',
        },
    },
    dialogTitleRoot: {
        fontWeight: 'bold',
        fontSize: 20,
        padding: '10px 0 20px 0',
    },
    closeButton: {
        position: 'absolute',
        color: PRIMARY_DARK,
        padding: 0,
        width: 20,
        height: 20,
        top: 25,
        right: 30,
        [theme.breakpoints.down('xs')]: {
            width: 'fit-content',
            top: 15,
            left: 10,
        },
    },
    content: {
        color: PRIMARY_DARK,
        fontSize: 14,
        padding: 0,
        '& .grid': {
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: '20% 80%',
            [theme.breakpoints.down('xs')]: {
                gridTemplateColumns: '50% 50%',
            },
        },
        '&.MuiDialogContent-root': {
            overflowY: 'visible',
        },
    },
    gridFormContainer: {
        marginBottom: 20,
        '&:last-child': {
            marginBottom: 30,
        },
        fontSize: 13,
        '& .label': {
            fontWeight: 'bold',
            marginBottom: 10,
        },
    },
    textInput: {
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-root': {
            backgroundColor: WHITE,
            borderRadius: 4,
            padding: '2px 10px',
            border: `1px solid ${BORDER_COLOR}`,
            width: '100%',
            height: 40,
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
        '& .MuiInputBase-root.Mui-disabled': {
            backgroundColor: GRAY_BG_2,
        },
    },
    actionsRoot: {
        justifyContent: 'start',
        padding: 0,
        display: 'block',
        marginLeft: 0,
    },
    buttonRoot: {
        height: 42,
        width: '40%',
        marginBottom: 15,
    },
    helper: {
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
    },
    buttonRootText: {
        fontSize: 13,
        padding: 0,
        margin: 0,
        color: PRIMARY,
        '&:hover': {
            color: PRIMARY,
            textDecoration: 'underline',
        },
    },
}));

export default useStyles;
