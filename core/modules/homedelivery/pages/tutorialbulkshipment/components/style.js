import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';

const useStyles = makeStyles((theme) => ({
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px !important',
        minWidth: 'unset !important',
        height: 36,
        width: '36px !important',
        marginBottom: 6,
        [theme.breakpoints.down('xs')]: {
            marginLeft: 18,
        },
    },
    titleTop: {
        fontSize: 24,
        color: colorPurple,
        fontFamily: font,
        display: 'inline-block',
    },
    contentWithoutBorder: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        padding: '10px 29px 12px 22px',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    imgImage: {
        width: '100%',
        maxWidth: 800,
    },
    exampleP: {
        border: '1px solid',
        background: 'lightgrey',
        padding: 8,
    },
    ulChild: {
        listStyleType: 'lower=alpha',
    },
}));

export default useStyles;
