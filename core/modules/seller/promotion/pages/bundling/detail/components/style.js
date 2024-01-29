import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, GRAY_LIGHT, TABLE_GRAY, TEXT_COLOR, CYAN_STATUS,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const useStyles = makeStyles((theme) => ({
    container: {
        paddingBottom: 10,
    },
    headerContainer: {
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
        marginBottom: 20,
        '& .title': {
            color: PRIMARY_DARK,
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 0,
            marginBottom: 0,
        },
    },
    paper: {
        boxShadow: '0px 3px 15px #4D2F821A !important',
        padding: 30,
        borderRadius: '8px !important',
        marginBottom: 30,
    },
    imgBack: {
        width: 50,
        height: 50,
        borderRadius: '50%',
        marginRight: 10,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: CYAN_STATUS,
    },
    icon: {
        width: 30,
        height: 'auto',
        filter: 'brightness(0) invert(1)',
    },
    text: {
        color: PRIMARY_DARK,
        fontWeight: 600,
        fontSize: 14,
        '&.light': {
            fontWeight: 400,
        },
        '&.big': {
            fontSize: 18,
        },
    },
    slash: {
        borderLeft: `1px solid ${GRAY_LIGHT}`,
        margin: '0 20px',
        [theme.breakpoints.down('xs')]: {
            visibility: 'hidden',
            whiteSpace: 'break-spaces',
        },
    },
    close: {
        width: 35,
        height: 35,
        borderRadius: 6,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '2px solid',
        borderColor: GRAY_LIGHT,
        padding: 10,
        fontSize: 13,
        background: 'transparent',
        color: GRAY_LIGHT,
        '&:hover': {
            background: 'transparent',
            boxShadow: 'none',
            color: PRIMARY_DARK,
            borderColor: PRIMARY_DARK,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 14,
            padding: '8px 15px',
        },
    },
    end: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'start',
        },
    },
    label: {
        '&.MuiFormLabel-root': {
            fontSize: 18,
            color: PRIMARY_DARK,
            fontWeight: 600,
            marginBottom: 10,
        },
        position: 'relative',
        width: 'fit-content',
    },
    tableContainer: {
        borderRadius: 6,
        '&::-webkit-scrollbar': {
            height: '.6em',
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 2px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: GRAY_LIGHT,
            borderRadius: 5,
        },
        border: `1px solid ${GRAY_LIGHT}`,
        marginTop: 20,
    },
    tr: {
        verticalAlign: 'top',
        '&.head': {
            height: 45,
        },
        padding: '0 20px',
        borderColor: 'transparent',
    },
    th: {
        textAlign: 'left',
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        padding: '10px 30px',
        '&.fix': {
            minWidth: 250,
            width: '40%',
        },
    },
    rowItem: {
        backgroundColor: 'transparent',
        '&.dark': {
            backgroundColor: TABLE_GRAY,
        },
    },
    td: {
        color: TEXT_COLOR,
        borderColor: GRAY_LIGHT,
        padding: '20px 0px',
        '&.border': {
            padding: '20px 10px',
        },
        '&.noborder': {
            borderColor: 'transparent',
        },
        '&.dark': {
            color: PRIMARY_DARK,
            fontWeight: 'bold',
        },
        fontFamily: font,
        fontSize: 13,
    },
    infoDiv: {
        border: `1px solid ${GRAY_LIGHT}`,
        borderRadius: 6,
        padding: 10,
        width: 'calc(100% - 0.1em)',
    },
    img: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: 80,
        [theme.breakpoints.down('md')]: {
            width: 80,
            height: 80,
        },
    },
    divider: {
        minHeight: 80,
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        borderLeft: `1px solid ${GRAY_LIGHT}`,
        padding: '0 20px',
    },
    totalDiv: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    totalText: {
        color: PRIMARY_DARK,
        fontWeight: 600,
        '& .title': {
            fontSize: 13,
        },
        '& .total': {
            fontSize: 16,
        },
    },
    containerImg: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            display: 'block',
            justifyContent: 'center',
        },
        color: PRIMARY_DARK,
        fontWeight: 600,
        fontSize: 16,
        '& .flex': {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
        },
    },
    group: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    imgGroup: {
        margin: 10,
        textAlign: 'center',
        width: 57,
        height: 57,
    },
    imgContainer: {
        position: 'relative',
        border: `1px solid ${GRAY_LIGHT}`,
        borderStyle: 'dashed',
        padding: 0,
        width: 57,
        height: 57,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgThumb: {
        maxWidth: 50,
        maxHeight: 50,
        width: 'auto',
        height: 'auto',
        display: 'block',
    },
    status: {
        color: PRIMARY_DARK,
        border: `1px solid ${GRAY_LIGHT}`,
        borderRadius: 6,
        padding: '6px 20px',
        fontSize: 10,
        width: 'fit-content',
    },
    centerMd: {
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            justifyContent: 'center',
        },
    },
}));

export default useStyles;
