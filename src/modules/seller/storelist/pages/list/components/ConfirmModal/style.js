import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, TEXT_COLOR, ERROR, PRIMARY,
} from '@theme_color';

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
        '& .bold': {
            fontWeight: 600,
        },
        '& .red': {
            color: ERROR,
        },
        '& .f16': {
            fontSize: 16,
        },
        '& .mb10': {
            marginBottom: 10,
        },
        '& .mb30': {
            marginBottom: 30,
        },
        '& .flex': {
            display: 'flex',
            gap: 10,
            alignItems: 'center',
        },
        '& .end': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end',
        },
    },
    dialogContainer: {
        padding: 30,
        paddingTop: 10,
        borderRadius: 6,
        position: 'relative',
        overflowX: 'hidden',
    },
    closeButton: {
        position: 'absolute',
        color: PRIMARY_DARK,
        padding: 0,
        width: 20,
        height: 20,
        top: 20,
        right: 20,
        [theme.breakpoints.down('xs')]: {
            top: 15,
            right: 15,
        },
    },
    content: {
        color: PRIMARY_DARK,
        fontSize: 14,
        padding: 0,
        '&.MuiDialogContent-root': {
            overflowY: 'visible',
        },
    },
    spanUrl: {
        color: PRIMARY,
    },
}));

export default useStyles;
