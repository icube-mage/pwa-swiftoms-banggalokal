import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    BORDER_COLOR, GRAY_LIGHT3, LIGHT_GRAY, PRIMARY_DARK_OLD, PURPLE, WHITE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    boxCard: {
        display: 'flex',
        paddingLeft: (props) => props.boxPaddingLeft,
        paddingRight: (props) => props.boxPaddingRight,
        [theme.breakpoints.down('xs')]: {
            display: 'inherit',
            marginTop: 10,
            paddingLeft: (props) => props.boxPaddingLeftMobile ?? `${0 } !Important`,
            paddingRight: (props) => props.boxPaddingRightMobile ?? `${0 } !Important`,
        },
    },
    boxCardItem: {
        padding: '5px 0px 15px 0px',
        borderRadius: 5,
        backgroundColor: WHITE,
        '& h3': {
            fontSize: 16,
            paddingLeft: 20,
            marginBottom: 15,
        },
    },
    sectionContent: {
        '& .left-tag': {
            borderRadius: '0px 2px 2px 0px;',
            width: '4px',
            height: '20px',
            marginTop: 1,
            marginRight: 15,
        },
    },
    sectionContentLeft: {
        display: 'flex',
        padding: '10px 0px !Important',
    },
    sectionContentLeftInformation: {
        '& .linethrough': {
            textDecoration: 'line-through',
        },
    },
    buttonFilter: {
        display: 'flex',
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        border: 0,
        fontSize: 11,
        color: PURPLE,
        cursor: 'pointer',
        '& svg': {
            width: 8,
            marginLeft: 5,
        },
    },
    popperFilterContainer: {
        marginTop: 5,
        '& .popper-filter': {
            boxShadow: '0px 3px 15px #4D2F821A',
            '& .popper-filter-item': {
                '& button': {
                    backgroundColor: WHITE,
                    width: '100%',
                    border: 0,
                    padding: 10,
                    cursor: 'pointer',
                    fontSize: 10,
                    textAlign: 'left',
                    '&:hover': {
                        backgroundColor: LIGHT_GRAY,
                    },
                },
            },
        },
    },
    infoTitle: {
        fontWeight: 'bold',
        marginBottom: 3,
    },
    infoDesc: {
        display: 'flex',
        fontSize: 10,
        color: GRAY_LIGHT3,
    },
    boxCardItemContainerParent: {
        padding: '0px 15px 5px 15px',
    },
    boxCardItemContainer: {
        border: `1px solid ${ BORDER_COLOR}`,
        borderRadius: 5,
    },
    boxCardItemFooter: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: 15,
        '& button': {
            border: 0,
            outline: 0,
            padding: 0,
            fontSize: 11,
            backgroundColor: 'transparent',
            color: PURPLE,
            cursor: 'pointer',
        },
    },
    boxCardItemGrid: {
        '& #box-item-grid-container': {
            padding: '10px 15px',
            '& .title': {
                display: 'flex',
                alignItems: 'center',
                '& span': {
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: GRAY_LIGHT3,
                    marginRight: 5,
                    [theme.breakpoints.down('xs')]: {
                        fontSize: 13,
                    },
                },
                '& .text-helper': {
                    cursor: 'pointer',
                },
            },
            '& .amount': {
                fontWeight: 'bold',
                marginTop: 15,
                marginBottom: 15,
                [theme.breakpoints.down('xs')]: {
                    fontSize: 20,
                },
                '& span': {
                    fontSize: 10,
                    marginRight: 5,
                },
            },
            '& .footer': {
                '& button': {
                    border: 0,
                    outline: 0,
                    padding: 0,
                    fontSize: 11,
                    backgroundColor: 'transparent',
                    color: PURPLE,
                    cursor: 'pointer',
                },
                '& span': {
                    color: GRAY_LIGHT3,
                    fontSize: 11,
                },
            },
        },
        '& .borderTop': {
            borderTop: `1px solid ${ BORDER_COLOR}`,
        },
        '& .borderRight': {
            borderRight: `1px solid ${ BORDER_COLOR}`,
        },
        '& .borderBottom': {
            borderBottom: `1px solid ${ BORDER_COLOR}`,
        },
        '& .borderLeft': {
            borderLeft: `1px solid ${ BORDER_COLOR}`,
        },
    },
    popperHelpContainer: {
        maxWidth: 150,
        top: '-5px !important',
        '& .text-help': {
            padding: '2px 4px',
            fontSize: 10,
            backgroundColor: PRIMARY_DARK_OLD,
            color: WHITE,
            textAlign: 'center',
            '&::after': {
                content: "''",
                position: 'absolute',
                top: 'calc(100% - 3px)',
                left: '50%',
                marginLeft: '-6px',
                width: 0,
                height: 0,
                borderTop: `solid 7px ${ PRIMARY_DARK_OLD}`,
                borderLeft: 'solid 7px transparent',
                borderRight: 'solid 7px transparent',
            },
        },
    },
}));

export default useStyles;
