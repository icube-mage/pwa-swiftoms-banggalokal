import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY_DARK, GRAY_LIGHT, WHITE, BORDER_COLOR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    mobileContainer: {
        [theme.breakpoints.down('xs')]: {
            margin: 10,
            marginBottom: 80,
        },
    },
    tableContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0px 3px 15px #4D2F821A',
        border: `1px solid ${BORDER_COLOR}`,
        borderBottom: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100vw',
            display: 'block',
            marginLeft: '0px',
            marginRight: '0px',
        },
        '&.footer': {
            paddingTop: 10,
            borderRadius: 0,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            borderTop: 0,
            border: `1px solid ${BORDER_COLOR}`,
            [theme.breakpoints.down('xs')]: {
                border: `1px solid ${BORDER_COLOR}`,
                paddingTop: 0,
                borderRadius: 8,
                boxShadow: 'none',
            },
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
    loading: {
        display: 'flex',
        color: PRIMARY_DARK,
        fontWeight: 600,
        justifyContent: 'center',
        padding: '20px 0px',
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
        '& .centering': {
            textAlign: 'center',
        },
    },
    tableRow: {
        '&.gray': {
            backgroundColor: WHITE,
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
        '& .centering': {
            textAlign: 'center',
        },
        '& .alignTop': {
            verticalAlign: 'top',
        },
    },
}));

export default useStyles;
