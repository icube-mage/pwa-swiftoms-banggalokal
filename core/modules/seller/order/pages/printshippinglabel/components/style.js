import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, GRAY_LIGHT, TEXT_COLOR, TABLE_GRAY, PRIMARY_SOFT,
} from '@theme_color';
import { miniDrawerWidthSeller } from '@modules/theme/layout/helpers';

const fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
const useStyles = makeStyles((theme) => ({
    // Header

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

    // Body
    gap: {
        height: '124px',
        width: '100%',
    },
    container: {
        backgroundColor: 'unset',
        boxShadow: 'none',
        [theme.breakpoints.down('sm')]: {
            top: 0,
            right: 0,
            left: 'auto',
            width: '100%',
        },
    },
    labelContainer: {
        backgroundColor: 'white',
        width: 'auto',
        height: 'auto',
        borderRadius: '8px',
        boxShadow: '0px 3px 15px #4D2F821A',
        breakAfter: 'page',
        maxWidth: '1040px',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '40px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            marginRight: 0,
            width: '100%',
            height: 'auto',
        },
    },
    labelContent: {
        padding: '30px',
    },
    titleLabel: {
        margin: '0',
        paddingBottom: '6px',
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily,
        color: PRIMARY_DARK,
    },
    detailContainer: {
        marginTop: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
        },
    },
    detailShipping: {
        border: `1px solid ${GRAY_LIGHT}`,
        width: '60%',
        borderRadius: '8px',
        maxWidth: '100% !important',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        },
    },
    detail: {
        border: `1px solid ${GRAY_LIGHT}`,
        borderRadius: '8px',
        padding: '20px',
        height: 'fit-content',
        marginLeft: '20px',
        width: '40%',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginLeft: 0,
            marginBottom: 10,
        },
    },
    shippingContent: {
        padding: '15px',
        justifyContent: 'space-between',
        display: 'flex',
        borderBottom: `1px solid ${GRAY_LIGHT}`,
        [theme.breakpoints.down('sm')]: {
            '& img': { height: 44, verticalAlign: 'middle' },
            padding: '13px',
        },
    },
    shippingDetail: {
        padding: '15px',
        justifyContent: 'space-between',
        display: 'flex',
        [theme.breakpoints.down('sm')]: {
            padding: '13px',
            flexDirection: 'row',
        },
    },
    greyText: {
        fontSize: '16px',
        alignSelf: 'center',
        color: TEXT_COLOR,
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
        },
        '&.label': {
            fontSize: '15px',
            [theme.breakpoints.down('sm')]: {
                fontSize: '13px',
            },
        },
    },
    greyLabel: {
        textAlign: 'center',
    },
    smallGreyText: {
        fontSize: '12px',
        alignSelf: 'center',
        color: TEXT_COLOR,
        [theme.breakpoints.down('sm')]: {
            fontSize: '10px',
        },
    },
    shippingNumber: {
        border: `1px solid ${GRAY_LIGHT}`,
        width: '100%',
        height: '38px',
        borderRadius: '8px',
        textAlign: 'center',
        fontSize: '16px',
        fontWeight: 'bold',
        color: PRIMARY_DARK,
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
        },
    },
    expedition: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
        flexGrow: 1,
        justifyContent: 'space-between',
        paddingLeft: '100px',
        paddingRight: '100px',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '100px',
            paddingRight: '100px',
        },
        [theme.breakpoints.down('xs')]: {
            paddingLeft: '15px',
            paddingRight: '15px',
        },
    },
    provider: {
        display: 'flex',
        flexDirection: 'column',
    },
    expeditionLabel: {
        fontSize: '15px',
        fontWeight: '600',
        color: PRIMARY_DARK,
        [theme.breakpoints.down('sm')]: {
            fontSize: '13px',
        },
    },
    row: {
        textAlign: 'left',
    },
    name: {
        fontSize: '14px',
        fontWeight: '600',
        color: PRIMARY_DARK,
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
        },
    },
    address: {
        width: '214px',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
        },
    },
    productList: {
        padding: '15px',
        paddingTop: '6px',
        paddingBottom: '0px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '13px',
        },
        '&.productContainer': {
            display: 'grid',
            gridTemplateColumns: '60% 30% 10%',
            paddingBottom: '5px',
            textAlign: 'left',
            paddingLeft: '0px',
            paddingRight: '0px',
            borderBottom: `1px solid ${GRAY_LIGHT}`,
        },
        '&.productLabel': {
            fontSize: '15px',
            fontWeight: '600',
            color: PRIMARY_DARK,
            padding: '0px',
            borderBottom: 'none',
            [theme.breakpoints.down('sm')]: {
                fontSize: '13px',
            },
        },
    },
    productContainer: {
        borderBottom: `1px solid ${TABLE_GRAY}`,
        '&.last': {
            borderBottom: 0,
        },
    },
    productDetails: {
        padding: '15px',
        paddingTop: '5px',
        paddingBottom: '5px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '13px',
        },
        '&.productContainer': {
            display: 'grid',
            gridTemplateColumns: '60% 30% 10%',
            paddingBottom: '5px',
            textAlign: 'left',
            paddingLeft: '0px',
            paddingRight: '0px',
        },
        '&.productLabel': {
            fontSize: '13px',
            fontWeight: 'normal',
            color: 'black',
            padding: '0px',
            borderBottom: 'none',
            '&.items': {
                color: PRIMARY_SOFT,
            },
            '&.dark': {
                color: PRIMARY_DARK,
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: '11px',
            },
        },
    },
    orderNumber: {
        borderTop: `1px solid ${GRAY_LIGHT}`,
        fontSize: '13px',
        color: TEXT_COLOR,
        padding: '10px 15px',
    },
    checkbox: {
        '&.title': {
            fontSize: '20px',
            fontWeight: '600',
            color: PRIMARY_DARK,
        },
        '&.label': {
            fontSize: '16px',
            color: TEXT_COLOR,
        },
    },
    '@media print': {
        labelContainer: {
            boxShadow: 'none',
        },
        detail: {
            display: 'none',
        },
        detailShipping: {
            display: 'block',
            width: '100%',
        },
    },
}));

export default useStyles;
