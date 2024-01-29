import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, TABLE_GRAY, GRAY_LIGHT, BORDER_COLOR, WHITE, TEXT_COLOR2,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    catalogPageListContainer: {
        border: `1px solid ${ BORDER_COLOR}`,
        borderRadius: 6,
        background: WHITE,
        marginBottom: 10,
        '& .footer': {
            background: 'transparent',
        },
        [theme.breakpoints.down('sm')]: {
            background: 'transparent',
        },
    },
    btnAction: {
        borderRadius: 6,
        background: PRIMARY,
        boxShadow: 'none',
        textTransform: 'capitalize',
        border: '1px solid',
        borderColor: PRIMARY,
        padding: '12px 15px',
        height: 42,
        fontSize: 13,
        fontWeight: 600,
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        '&.gray': {
            background: TABLE_GRAY,
            borderColor: TABLE_GRAY,
            color: PRIMARY_DARK,
            '&:hover': {
                backgroundColor: TABLE_GRAY,
                boxShadow: 'none',
                borderColor: TABLE_GRAY,
            },
        },
    },
    menuAction: {
        '& .MuiMenuItem-root': {
            fontSize: 13,
            color: PRIMARY_DARK,
        },
        '& .MuiMenu-list': {
            borderRadius: 6,
            background: TABLE_GRAY,
            marginTop: 5,
            border: `1px solid ${GRAY_LIGHT}`,
        },
    },
    arrowDown: {
        transition: 'all .2s linear',
        transform: 'rotate(90deg)',
    },
    arrowUp: {
        transition: 'all .2s linear',
        transform: 'rotate(-90deg)',
    },
    divStock: {
        whiteSpace: 'nowrap',
    },
    appModalItemChannel: {
        '& .container': {
            '& .product-data-container': {
                '& .item-channel-container': {
                    display: 'grid',
                    gridTemplateColumns: '93% 5%',
                    marginTop: 15,
                    '& .item-channel-left': {
                        display: 'grid',
                        gridTemplateColumns: '7% 93%',
                        justifyContent: 'start',
                        alignItems: 'center',
                        '&.loading': {
                            gridTemplateColumns: '7% 100%',
                        },
                        '& .item-channel-left-icon': {
                            '& img': {
                                height: 30,
                                border: `1px solid ${ BORDER_COLOR}`,
                                padding: '3px 4px 3px 4px',
                                borderRadius: 40,
                            },
                        },
                        '& .item-channel-left-content': {
                            marginLeft: 15,
                            '& .title': {
                                '&:first-letter': {
                                    textTransform: 'uppercase',
                                },
                                '&:first-line': {
                                    textTransform: 'uppercase',
                                },
                            },
                            '& .snapshot': {
                                fontSize: 10,
                                color: TEXT_COLOR2,
                                marginTop: 5,
                                '& .info': {
                                    marginTop: 5,
                                },
                            },
                        },
                    },
                    '& .item-channel-right': {
                        display: 'flex',
                        alignItems: 'center',
                        '& button': {
                            border: 0,
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            '& img': {
                                width: 20,
                            },
                        },
                    },
                    //
                },
            },
            '& .content': {
                '& .catalog-channel-sync': {
                    '& .product-data-desc-container': {
                        marginBottom: 15,
                    },
                },
            },
            // end
        },
        // end
    },
    badgeActive: {
        padding: 5,
        borderRadius: 5,
        background: '#6cbb9b',
        color: '#fff',
        fontSize: 13,
    },
    badgeFailed: {
        padding: 5,
        borderRadius: 5,
        background: '#d86161',
        color: '#fff',
        fontSize: 13,
    },
    badgeQueue: {
        padding: 5,
        borderRadius: 5,
        background: '#f3c357',
        color: '#fff',
        fontSize: 13,
    },
    logoChannel: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        marginTop: -4,
        '& img': {
            width: 20,
            position: 'relative',
            top: 10,
        },
        '& span': {
            marginTop: 3,
            marginLeft: 10,
        },
    },
    // end
}));

export default useStyles;
