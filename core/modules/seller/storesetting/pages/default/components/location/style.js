import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, TABLE_GRAY, PRIMARY_DARK, GRAY_LIGHT,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        boxShadow: '0px 3px 15px #4D2F821A !important',
        paddingTop: 30,
        borderRadius: '8px !important',
    },
    title: {
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 20,
        padding: '0 30px',
    },
    tableContainer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: 'none',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100vw',
            marginLeft: '0px',
            marginRight: '0px',
        },
    },
    mainTable: {
        overflow: 'auto',
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
        '& .MuiList-padding': {
            padding: 0,
        },
    },
    tableHead: {
        '& .MuiButton-label': {
            color: PRIMARY_DARK,
            fontWeight: 600,
        },
        '& .MuiTableCell-head': {
            color: PRIMARY_DARK,
            fontWeight: 600,
        },
        '& .MuiSvgIcon-root': {
            width: 20,
            height: 'auto',
        },
    },
    tableRow: {
        '&.gray': {
            backgroundColor: TABLE_GRAY,
        },
        '& .MuiTableCell-body': {
            color: PRIMARY_DARK,
            paddingTop: 15,
            paddingBottom: 10,
            fontSize: 14,
        },
        '& .MuiSvgIcon-root': {
            width: 20,
            height: 'auto',
        },
    },
    alignTop: {
        verticalAlign: 'top',
        '&.center': {
            textAlign: 'center',
        },
    },
    btnContainer: {
        paddingLeft: 30,
        [theme.breakpoints.down('sm')]: {
            padding: '0 10px',
        },
    },
    btnSave: {
        background: PRIMARY,
        borderRadius: 6,
        padding: 6,
        width: '100%',
        height: 52,
        '&:hover': {
            background: PRIMARY_DARK,
        },
        margin: '30px 0',
    },
    btnText: {
        fontSize: 15,
    },
    link: {
        color: PRIMARY,
        fontSize: 14,
        fontWeight: 600,
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    noRecords: {
        display: 'flex',
        color: PRIMARY_DARK,
        fontWeight: 600,
        justifyContent: 'center',
        padding: '5px 0',
    },
    iconTrash: {
        padding: 0,
    },
}));

export default useStyles;
