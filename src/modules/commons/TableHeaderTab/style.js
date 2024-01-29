import { makeStyles } from '@material-ui/core/styles';
import {
    BORDER_COLOR, GRAY_BG_2, PRIMARY_SOFT, WHITE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    tableHeaderTab: {
        '& ul': {
            display: 'flex',
            overflow: 'auto',
            paddingLeft: 30,
            paddingRight: 30,
            '& .catalog-header-tab-item': {
                display: 'inline-flex',
                '&:nth-child(1)': {
                    marginRight: 15,
                    [theme.breakpoints.down('sm')]: {
                        marginRight: 5,
                    },
                },
                '&:not(:first-child)': {
                    marginRight: 15,
                    marginLeft: 15,
                    [theme.breakpoints.down('sm')]: {
                        marginRight: 5,
                        marginLeft: 5,
                    },
                },
                '& .header-tab-item': {
                    '&.active': {
                        fontWeight: 'bold',
                        color: PRIMARY_SOFT,
                    },
                },
                '& .header-badge-title': {
                    padding: '5px 10px',
                    display: 'inherit',
                    height: 35,
                    '&::after': {
                        content: "''",
                        display: 'inherit',
                        height: 7,
                        background: 'transparent',
                    },
                    [theme.breakpoints.down('sm')]: {
                        whiteSpace: 'nowrap',
                        padding: '5px 10px 0px 10px',
                        height: 33,
                    },
                },
                '& .header-badge-item': {
                    marginTop: -3,
                    fontSize: 10,
                    '& span': {
                        padding: '3px 7px',
                        borderRadius: 50,
                        background: GRAY_BG_2,
                    },
                    '&.active': {
                        alignSelf: 'center',
                        '& span': {
                            color: PRIMARY_SOFT,
                            fontWeight: 'bold',
                        },
                        '&::after': {
                            content: "''",
                            display: 'inherit',
                            height: 7,
                            background: 'transparent',
                        },
                    },
                    '&.inactive': {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: -9,
                    },
                },
                '& .active': {
                    '&::after': {
                        content: "''",
                        display: 'inherit',
                        height: 7,
                        background: `${PRIMARY_SOFT } 0% 0% no-repeat padding-box`,
                        borderRadius: '5px 5px 0px 0px',
                    },
                },
            },
            [theme.breakpoints.down('sm')]: {
                marginTop: 6,
                paddingLeft: 10,
                paddingRight: 10,
                overflow: 'hidden',
            },
        },
        '& .table-header-tab-mui': {
            paddingLeft: 30,
            paddingRight: 30,
            '& .MuiTabs-fixed': {
                '& .MuiTabs-flexContainer': {
                    '& .MuiTab-root': {
                        '& .MuiTab-wrapper': {
                            textTransform: 'none',
                            marginBottom: 10,
                            fontWeight: 'bold',
                        },
                    },
                },
                '& .MuiTabs-indicator': {
                    /* UI Properties */
                    height: 7,
                    borderRadius: '6px 6px 0px 0px',
                    opacity: 1,
                },
            },
        },
    },
    tableHeaderTabMobile: {
        '& .clear': {
            clear: 'both',
        },
        '& .title': {
            fontWeight: 'bold',
            marginBottom: 10,
        },
        '& ul': {
            listStyleType: 'none',
            margin: 0,
            padding: 0,
            '& .catalog-header-tab-item': {
                float: 'left',
                display: 'inline-flex',
                border: `1px solid ${ BORDER_COLOR}`,
                justifyContent: 'center',
                alignItems: 'center',
                padding: '5px 10px',
                marginBottom: 10,
                marginRight: 10,
                borderRadius: 5,
                '& .header-badge-item': {
                    fontSize: 10,
                },
                '&.active': {
                    background: PRIMARY_SOFT,
                    border: `1px solid ${ PRIMARY_SOFT}`,
                    '& .header-badge-item': {
                        color: WHITE,
                        fontSize: 10,
                    },
                },
                '& .header-tab-item': {
                    '&.active': {
                        fontWeight: 'bold',
                        background: PRIMARY_SOFT,
                        color: WHITE,
                    },
                },
            },
        },
    },
}));

export default useStyles;
