import { makeStyles } from '@material-ui/core/styles';
import { PRIMARY } from '@theme_color';

const useStyles = makeStyles(() => ({
    dialogContainer: {
        '& .MuiPaper-root': {
            width: 500,
        },
        '& .MuiDialogContent-root:first-child': {
            padding: 0,
        },
    },
    contentText: {
        textAlign: 'center',
        '& .detail': {
            padding: 20,
        },
        '& img': {
            width: '100%',
        },
        '& h2 span': {
            fontWeight: 700,
            color: PRIMARY,
        },
    },
    action: {
        '&.MuiDialogActions-root': {
            padding: '0 20px 20px 20px',
        },
        '& button': {
            width: '100%',
            padding: 16,
        },
    },
    dialogContainerConfirm: {
        zIndex: '999999999 !important',
        '& .MuiPaper-root': {
            width: 400,
        },
    },
    titleConfirm: {
        '& h2': {
            color: PRIMARY,
            fontWeight: 700,
        },
    },
    contentTextConfirm: {
        paddingTop: 0,
        '& p': {
            marginTop: 0,
        },
    },
}));

export default useStyles;
