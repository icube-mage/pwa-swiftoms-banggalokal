import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    ALERT_DANGER,
    BLUE_LINK,
    BORDER_COLOR,
    DISABLED,
    GRAY_BG_2,
    GRAY_LIGHT3,
    PRIMARY,
    PRIMARY_DARK,
    PURPLE,
    TEXT_DANGER,
    TEXT_GRAY,
    WHITE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    required: {
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -3,
            right: -9,
            color: PRIMARY,
            fontSize: 16,
        },
    },
    label: {
        '&.MuiFormLabel-root': {
            fontSize: 14,
            color: PRIMARY_DARK,
            fontWeight: 600,
            marginBottom: 10,
        },
        position: 'relative',
        width: 'fit-content',
        '&.disabled': {
            color: DISABLED,
        },
        '& .optional-label': {
            fontWeight: 300,
            color: GRAY_LIGHT3,
            marginLeft: 10,
        },
    },
    productTabChannelContainer: {
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
            '& .form-channel-product-assign': {
                '& .content': {
                    display: 'grid',
                    gridTemplateColumns: '20% 80%',
                    marginTop: 10,
                    '& .content-left': {
                        '& ul': {
                            margin: 0,
                            paddingLeft: 0,
                            listStyleType: 'none',
                            paddingRight: 20,
                            '& li': {
                                marginBottom: 10,
                                '& button': {
                                    border: `1px solid ${BORDER_COLOR}`,
                                    borderRadius: 5,
                                    display: 'flex',
                                    alignItems: 'center',
                                    backgroundColor: 'transparent',
                                    cursor: 'pointer',
                                    width: '100%',
                                    padding: '8px 15px',
                                    [theme.breakpoints.down('sm')]: {
                                        padding: '8px 5px',
                                        justifyContent: 'center',
                                    },
                                    '&.active': {
                                        backgroundColor: GRAY_BG_2,
                                    },
                                    '& img': {
                                        height: 25,
                                        [theme.breakpoints.down('sm')]: {
                                            height: 20,
                                        },
                                    },
                                    '& span': {
                                        marginLeft: 5,
                                        [theme.breakpoints.down('sm')]: {
                                            display: 'none',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    '& .content-right': {
                        border: `1px solid ${BORDER_COLOR}`,
                        borderRadius: 5,
                        padding: 10,
                    },
                },
                '& .footer': {
                    display: 'flex',
                    justifyContent: 'end',
                    marginTop: 20,
                    '& .content-footer-button': {
                        display: 'flex',
                    },
                },
            },
        },
    },
    productTabChannelContainerFormChannel: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0,
    },
    formChannelEmpty: {
        '& .channel-empty-container': {
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
                },
            },
            '& .content-right': {
                display: 'flex',
                justifyContent: 'end',
            },
        },
    },
    formSettingProductManageContainer: {
        marginTop: 30,
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
        '& .form-channel-category-section': {
            display: 'grid',
            gridTemplateColumns: '40% 60%',
            marginBottom: 20,
            gap: '20px',
            [theme.breakpoints.down('sm')]: {
                display: 'block',
            },
            '& .MuiTreeItem-root.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label': {
                [theme.breakpoints.down('sm')]: {
                    backgroundColor: 'rgba(190, 31, 147, 0.12)',
                },
            },
        },
        '& .form-channel-label-special-section': {
            display: 'grid',
            gridTemplateColumns: '40% 60%',
            marginBottom: 20,
        },
    },
    formVariantContainer: {
        '& .warning-sku': {
            padding: 10,
            marginTop: 10,
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
        },
        '& .form-variant-helper': {
            fontSize: 12,
            marginTop: 10,
            color: GRAY_LIGHT3,
            fontWeight: 300,
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
                    '& .content-left-info_help': {
                        fontSize: 12,
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
    formSettingProductTimeContainer: {
        marginTop: 30,
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
    },
    formSettingProductSeoContainer: {
        marginTop: 30,
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
    },
    formSettingProductRelatedContainer: {
        marginTop: 30,
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
    },
    formDynamicContainer: {
        marginTop: 20,
    },
    stickyBottomContainerRight: {
        display: 'flex',
        alignItems: 'end',
        paddingRight: 12,
        '& .btn-cancel': {},
        '& .btn-next': {},
    },
    stickyBottomContainerFormAssign: {
        '& .sticky-bottom-container-fixed': {
            right: '0px',
        },
    },
    closeBtn: {
        border: '1px #ddd solid',
    },
}));

export default useStyles;
