/* eslint-disable no-unused-vars */
import { makeStyles } from '@material-ui/core/styles';
import {
    BLACK, PRIMARY_DARK, TEXT_COLOR, PRIMARY_SOFT, GRAY_LIGHT,
} from '@theme_color';
import { miniDrawerWidthSeller } from '@modules/theme/layout/helpers';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const borderColor = '#DDE1EC';

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: 'white',
        color: PRIMARY_DARK,
        boxShadow: '2px 0px 20px #4D2F821A',
        marginLeft: miniDrawerWidthSeller,
        zIndex: theme.zIndex + 1,
        width: '100%',
        height: '94px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            width: '100%',
        },
    },
    swiftOmsLogo: {
        padding: '12px 12px 12px 0px',
        '& img': { height: 44, verticalAlign: 'middle' },
        cursor: 'pointer',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        height: '94px',
    },
    btnPrint: {
        display: 'flex',
        alignItems: 'center',
        marginInlineStart: 'auto',
        '& .icon': {
            margin: '6px',
        },
    },

    container: {
        backgroundColor: 'unset',
        boxShadow: 'none',
    },
    invoiceContainer: {
        backgroundColor: 'white',
        padding: '30px',
        boxShadow: 'none',
        maxWidth: '1040px',
        margin: '0 auto',
        breakAfter: 'page',
    },
    gap: {
        height: '124px',
    },
    containerAppBar: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageLogo: {
        maxWidth: '206px',
        height: '60px',
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: '50% 50%',
    },
    grid2: {
        display: 'grid',
        gridTemplateColumns: '5% 95%',
    },
    grid3: {
        display: 'grid',
        gridTemplateColumns: '40% 60%',
    },
    marginTop1: {
        marginTop: '10px',
    },
    marginTop2: {
        marginTop: '50px',
    },
    rightAlign: {
        textAlign: 'right',
    },
    leftAlign: {
        textAlign: 'left',
    },
    primaryText: {
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        font: 'Lato',
        '&.fontWeight': {
            fontWeight: '600',
        },
        '&.fontLight': {
            fontWeight: 400,
        },
    },
    secondaryText: {
        color: PRIMARY_SOFT,
        fontSize: '16px',
        fontWeight: 'bold',
        '@media (max-width: 767px )': {
            fontSize: '11px',
            '@media print': {
                fontSize: '16px',
            },
        },
    },
    tertieryText: {
        color: TEXT_COLOR,
        fontSize: '16px',
        fontWeight: 'lighter',
        '@media (max-width: 767px )': {
            fontSize: '11px',
        },
        '@media print': {
            fontSize: '16px',
        },
    },
    px16: {
        fontSize: '16px',
        '@media (max-width: 767px )': {
            fontSize: '11px',
        },
        '@media print': {
            fontSize: '16px',
        },
    },
    px20: {
        fontSize: '20px',
        '@media (max-width: 767px )': {
            fontSize: '15px',
        },
        '@media print': {
            fontSize: '20px',
        },
    },
    px15: {
        fontSize: '15px',
        '@media (max-width: 767px )': {
            fontSize: '10px',
        },
        '@media print': {
            fontSize: '15px',
        },
    },
    px13: {
        fontSize: '13px',
        '@media (max-width: 767px )': {
            fontSize: '9px',
        },
        '@media print': {
            fontSize: '13px',
        },
    },
    borderBottom: {
        borderBottom: `1px solid ${GRAY_LIGHT}`,
    },
    table1: {
        borderCollapse: 'collapse',
        width: '100%',
        marginTop: '20px',
        marginBottom: '20px',
        '& tr:first-child th': {

            borderBottom: `1px solid ${GRAY_LIGHT}`,
            borderTop: `1px solid ${GRAY_LIGHT}`,
            paddingTop: '10px',
            paddingBottom: '10px',
        },
        '& tr td:first-child': {
            textAlign: 'left',
        },
        '& tr td': {
            paddingTop: 10,
            textAlign: 'right',
        },
        '& .nopad': {
            padding: 0,
        },
    },
    table2: {
        borderCollapse: 'collapse',
        '& tr td': {
            paddingTop: '10px',
            paddingBottom: '10px',
        },
    },
    tr: {
        borderBottom: '1px solid',
        borderBottomColor: borderColor,
        verticalAlign: 'top',
    },
    th: {
        textAlign: 'left',
        padding: '5px 8px',
        color: BLACK,
    },
    td: {
        padding: '5px 8px',
        fontFamily: font,
        '&.td-tfoot': {
            padding: '0 8px',
        },
    },
    icon: {
        margin: '6px',
    },
    lastUpdate: {
        alignSelf: 'flex-end',
    },
}));

export default useStyles;
