import { makeStyles } from '@material-ui/core/styles';

const colorPurple = '#BE1F93';
const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';
const colorGray = '#B1BCDB';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '16px 0',
        borderRadius: 16,
    },
    btnBack: {
        display: 'inline-block',
        borderRadius: '10px 0px 0px 10px',
        minWidth: 'unset',
        height: 36,
        width: 42,
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
        [theme.breakpoints.down('sm')]: {
            marginLeft: 18,
        },
    },
    formFieldGrid: {
        display: 'grid',
        gridTemplateColumns: '20% 40% 40%',
        alignItems: 'center',
        [theme.breakpoints.between('768', '1024')]: {
            gridTemplateColumns: '20% 80%',
        },
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '25% 75%',
        },
        '& .link-download': {
            [theme.breakpoints.between('768', '1024')]: {
                gridColumnStart: 2,
                paddingTop: 10,
            },
            [theme.breakpoints.down('xs')]: {
                gridColumnStart: 2,
                paddingTop: 10,
            },
        },
    },
    formFieldButton: {
        padding: '24px 29px 30px 22px',
    },
    btn: {
        borderRadius: 20,
    },
    label: {
        color: colorText,
        fontFamily: font,
        position: 'relative',
        display: 'inline-block',
    },
    contentWithoutBorder: {
        padding: '10px 29px 12px 22px',
    },
    content: {
        padding: '10px 29px 12px 22px',
        borderBottom: '3px solid #F5F7FB',
        [theme.breakpoints.down('xs')]: {
            paddingBottom: 50,
        },
    },
    linkDownload: {
        color: colorPurple,
        fontWeight: 700,
        textDecorationLine: 'underline',
        '&.disabled': {
            color: colorGray,
        },
    },
    textAttach: {
        fontWeight: 'bold',
        display: 'block',
        padding: '10px 29px 12px 22px',
    },
    inputCsv: {
        marginLeft: 5,
    },
    textLeft: {
        textAlign: 'left !important',
    },
    progressContainer: {
        padding: '0px 29px 0px 22px',
    },
    leftColumn: {
        backgroundColor: colorPurple,
        color: 'white !important',
        fontWeight: 'bold !important',
        maxWidth: 200,
        width: 200,
    },
    rightColumn: {
        '&.capitalize': { textTransform: 'capitalize !important' },
    },
    status: {
        '&.error': {
            color: 'red !important',
        },
        '&.success': {
            color: 'green !important',
        },
        fontWeight: 'bold !important',
        marginBottom: 20,
        fontSize: 18,
        textTransform: 'uppercase',
    },
    autocompleteRoot: {
        width: '90%',
        '& .MuiOutlinedInput-root': {
            borderColor: colorText,
            borderRadius: 20,
            border: '1px solid',
            height: 36,
            padding: '0 9px',
        },
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    labelResponse: {
        textAlign: 'left',
        padding: '3px 0',
        display: 'flex',
        alignItems: 'baseline',
        width: '50%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    textSelectFile: {
        color: colorText,
        paddingBottom: 16,
        gridTemplateColumns: '20% 80%',
        [theme.breakpoints.between('768', '1024')]: {
            position: 'relative',
        },
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '25% 85%',
            position: 'relative',
        },
        '& [class*="contentDropFile"]': {
            [theme.breakpoints.up('sm')]: {
                display: 'grid',
                gridTemplateColumns: '130px auto',
                alignItems: 'center',
            },
        },
        '& .dropzone': {
            [theme.breakpoints.up('sm')]: {
                marginLeft: -15,
                position: 'relative',
            },
            '& [class*="textNoFile"]': {
                [theme.breakpoints.up('sm')]: {
                    position: 'absolute',
                    top: 9,
                    left: 20,
                    transform: 'translateX(100%)',
                },
            },
        },
        '& aside': {
            display: 'inline-block',
            '& ul': {
                listStyle: 'none',
                paddingLeft: 0,
            },
            [theme.breakpoints.down('xs')]: {
                position: 'absolute',
                top: 35,
                left: '25%',
            },
            [theme.breakpoints.between('768', '1024')]: {
                position: 'absolute',
                top: 35,
                left: '20%',
            },
        },
    },
}));

export default useStyles;
