import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    ALERT_DANGER, BLUE_LINK, BORDER_COLOR, GRAY_LIGHT3, TEXT_DANGER, TEXT_GRAY, WHITE, PURPLE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    productTabMasterContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 90,
        [theme.breakpoints.down('sm')]: {
            paddingBottom: 150,
        },
        '& .box-card': {
            '& .title': {
                fontWeight: 'bold',
            },
        },
    },
    formInformationContainer: {
        marginTop: 25,
        '& .form-label-container': {
            '& label': {
                fontSize: 14,
            },
        },
        '& .label-helper': {
            fontSize: 12,
            marginTop: 10,
            color: GRAY_LIGHT3,
            fontWeight: 300,
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                marginBottom: 10,
            },
        },
        '& .form-master-product-image-container': {
            display: 'grid !important',
            gridTemplateColumns: '40% 60%',
            gap: '20px',
            '& .form-master-product-image-content': {
                '& div': {
                    '& [class*="image-upload-sortableContainer"]': {
                        display: 'flex',
                        justifyContent: 'start',
                        '& [class*="button-upload-image-imgGroup"]': {
                            margin: 0,
                            marginRight: 5,
                            marginBottom: 15,
                            '& #button-upload': {
                                backgroundColor: WHITE,
                                border: `1px dashed ${BORDER_COLOR}`,
                                '& .MuiButton-label': {
                                    color: BORDER_COLOR,
                                    '& [class*="image-upload-textFile"]': {
                                        color: TEXT_GRAY,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            [theme.breakpoints.down('sm')]: {
                display: 'block !important',
            },
        },
    },
    formVariantContainer: {
        '& .warning-sku': {
            padding: 10,
            marginTop: 15,
            marginBottom: 10,
            backgroundColor: ALERT_DANGER,
            color: TEXT_DANGER,
            borderRadius: 5,
            '& .clickable': {
                color: BLUE_LINK,
                cursor: 'pointer',
            },
        },
        '& .form-variant-desc': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            [theme.breakpoints.down('sm')]: {
                display: 'block',
            },
        },
        '& .form-variant-helper': {
            fontSize: 12,
            marginTop: 10,
            color: GRAY_LIGHT3,
            fontWeight: 300,
            '& ._help': {
                color: PURPLE,
            },
            [theme.breakpoints.down('sm')]: {
                width: '100%',
                marginBottom: 10,
            },
        },
        '& [class*="MuiButton-root"]': {
            boxShadow: 'none',
            borderRadius: 5,
        },
    },
    formVariantLeft: {
        display: 'flex',
        alignItems: 'center',
    },
    formVariantRight: {
        display: 'flex',
        justifyContent: 'end',
    },
    formStockContainer: {
        '& .stock-title-container': {
            marginTop: 20,
        },
        '& .stock-content-container': {
            '& .content-left': {
                '& .content-left-container': {
                    display: 'flex',
                    marginTop: 10,
                    '& .content-left-info': {
                        fontSize: 12,
                        color: GRAY_LIGHT3,
                    },
                    '& .content-left-link': {
                        fontSize: 12,
                    },
                    '& .content-left-info._help': {
                        color: PURPLE,
                        [theme.breakpoints.down('sm')]: {
                            display: 'block',
                            marginTop: 5,
                            marginBottom: 15,
                        },
                    },
                    [theme.breakpoints.down('sm')]: {
                        display: 'block',
                        marginTop: 0,
                    },
                },
            },
            '& .content-right': {
                display: 'grid',
                justifyContent: 'right',
                [theme.breakpoints.down('sm')]: {
                    justifyContent: 'left',
                },
                '& a': {
                    [theme.breakpoints.down('sm')]: {
                        fontSize: 13,
                        fontWeight: 'bold',
                    },
                },
                '& button': {
                    [theme.breakpoints.down('sm')]: {
                        display: 'block',
                        marginTop: 10,
                        width: '100%',
                    },
                },
                '& > a': {
                    justifyContent: 'center',
                },
            },
        },
    },
    formShippingContainer: {
        marginTop: 15,
        '& .product-form-shipping-weight': {
            '& .MuiInputBase-input': {
                paddingLeft: 10,
                borderRight: `1px solid ${BORDER_COLOR}`,
            },
        },
        '& .form-content': {
            '& .MuiInputBase-input': {
                paddingLeft: 10,
            },
        },
        '& .product-form-shipping-dimention-container': {
            '& .MuiGrid-container': {
                [theme.breakpoints.down('sm')]: {
                    display: 'inline-grid',
                    gridTemplateColumns: '27% 23% 50%',
                },
                '& .MuiGrid-item': {
                    '& .MuiInputBase-input': {
                        paddingLeft: 10,
                    },
                    '&:nth-child(1)': {
                        paddingRight: 0,
                        '& .MuiInputBase-input': {
                            borderRadius: 0,
                        },
                        '& .MuiInput-formControl': {
                            borderRadius: '5px 0px 0px 5px',
                            border: 0,
                            borderLeft: `1px solid ${BORDER_COLOR}`,
                            borderBottom: `1px solid ${BORDER_COLOR}`,
                            borderTop: `1px solid ${BORDER_COLOR}`,
                        },
                    },
                    '&:nth-child(2)': {
                        paddingLeft: 0,
                        paddingRight: 0,
                        '& .MuiInput-formControl': {
                            borderRadius: 0,
                            border: 0,
                            borderLeft: `1px solid ${BORDER_COLOR}`,
                            borderBottom: `1px solid ${BORDER_COLOR}`,
                            borderRight: `1px solid ${BORDER_COLOR}`,
                            borderTop: `1px solid ${BORDER_COLOR}`,
                        },
                    },
                    '&:nth-child(3)': {
                        paddingLeft: 0,
                        '& .MuiInputBase-input': {
                            borderRight: `1px solid ${BORDER_COLOR}`,
                        },
                        '& .MuiInput-formControl': {
                            borderRadius: '0px 5px 5px 0px',
                            border: 0,
                            borderRight: `1px solid ${BORDER_COLOR}`,
                            borderBottom: `1px solid ${BORDER_COLOR}`,
                            borderTop: `1px solid ${BORDER_COLOR}`,
                        },
                    },
                },
            },
        },
    },
    stickyBottomContainerRight: {
        display: 'flex',
        alignItems: 'end',
        paddingRight: 12,
        '& .btn-cancel': {},
        '& .btn-next': {},
    },
}));

export default useStyles;
