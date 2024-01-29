import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, TABLE_GRAY, GRAY_LIGHT, TEXT_COLOR, GRAY_BG, BLACK, WHITE, BORDER_COLOR,
} from '@theme_color';

const font = '"Plus Jakarta Sans", sans-serif';
const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('sm')]: {
            padding: '0 10px',
        },
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .left': {
            backgroundColor: WHITE,
            padding: '10px 27px',
            border: `1px solid ${BORDER_COLOR}`,
            borderRadius: 4,
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
        },
        marginBottom: 20,
    },
    paper: {
        boxShadow: 'unset !important',
        padding: 30,
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: '6px !important',
        marginBottom: 20,
        '&.nopadding': {
            padding: '30px 0',
        },
    },
    title: {
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 0,
        fontSize: 18,
        '&.paper': {
            marginBottom: 30,
        },
        '&.padding': {
            padding: 30,
            paddingTop: 0,
        },
    },
    itemsGrid: {
        padding: '0 30px',
        '&.nopadding': {
            padding: 0,
        },
    },
    itemsGrid2: {
        [theme.breakpoints.down('sm')]: {
            marginTop: 20,
            padding: '0 30px',
        },
    },
    divTotalEnd: {
        display: 'flex',
        justifyContent: 'right',
    },
    subtitle: {
        marginBottom: 5,
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        fontSize: 14,
        '&.primary': {
            color: PRIMARY,
        },
        '&.gray': {
            color: TEXT_COLOR,
            fontWeight: 'normal',
        },
        '&.black': {
            color: BLACK,
            fontWeight: 'normal',
        },
    },
    subText: {
        color: BLACK,
        fontSize: 14,
        '&.primary': {
            color: PRIMARY,
        },
        '&.dark': {
            color: PRIMARY_DARK,
        },
        overflowWrap: 'break-word',
    },
    btn: {
        background: PRIMARY,
        borderRadius: 6,
        padding: 6,
        width: '100%',
        height: 52,
        '&:hover': {
            background: PRIMARY_DARK,
        },
        margin: '10px 0',
    },
    btnText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    btnContainer: {
        [theme.breakpoints.down('sm')]: {
            padding: '0 10px',
        },
    },

    table: {
        borderTop: `1px solid ${GRAY_LIGHT}`,
        borderBottom: `1px solid ${GRAY_LIGHT}`,
        marginBottom: 20,
        '& .first': {
            [theme.breakpoints.up('md')]: {
                paddingLeft: 30,
            },
        },
        '& .right': {
            [theme.breakpoints.up('md')]: {
                paddingRight: 30,
            },
        },
        '& .note-cell': {
            [theme.breakpoints.up('md')]: {
                paddingLeft: 30,
            },
        },
        '& .table-history-body tr td:first-child': {
            [theme.breakpoints.up('md')]: {
                paddingLeft: 30,
            },
        },
        color: PRIMARY_DARK,
    },
    tr: {
        verticalAlign: 'top',
        '&.head': {
            backgroundColor: TABLE_GRAY,
            height: 45,
            '&.head th:first-child': {
                [theme.breakpoints.up('md')]: {
                    paddingLeft: 30,
                },
            },
        },
        padding: '0 20px',
        borderColor: 'transparent',
    },
    th: {
        '&.MuiTableCell-head': {
            textAlign: 'left',
            color: PRIMARY_DARK,
            fontWeight: 'bold',
        },
        '&.first': {
            whiteSpace: 'nowrap',
        },
        '&.right': {
            textAlign: 'right',
        },
        '&.left-border': {
            borderLeft: `1px solid ${BORDER_COLOR}`,
        },
        '&.right-border': {
            borderRight: `1px solid ${BORDER_COLOR}`,
        },
    },
    rowItem: {
        '&.noBorder': {
            '& .MuiTableCell-root': {
                borderBottom: '0px',
            },
        },
    },
    td: {
        '&.MuiTableCell-body': {
            color: PRIMARY_DARK,
            verticalAlign: 'baseline',
        },
        border: '0',
        '&.status': {
            textTransform: 'capitalize',
        },
        '&.child': {
            '&.first': {
                paddingLeft: 20,
                [theme.breakpoints.up('md')]: {
                    paddingLeft: 50,
                },
            },
            paddingTop: 0,
        },
        '&.right': {
            textAlign: 'right',
        },
        '&.left-border': {
            borderLeft: `1px solid ${BORDER_COLOR}`,
        },
        '&.right-border': {
            borderRight: `1px solid ${BORDER_COLOR}`,
        },
        '&.td-reason': {
            backgroundColor: TABLE_GRAY,
        },
    },
    notePaper: {
        boxShadow: 'none',
        border: '1px solid',
        borderColor: TABLE_GRAY,
        width: 300,
        padding: 10,
        color: TEXT_COLOR,
        fontSize: 13,
    },
    gridNote: {
        flexWrap: 'nowrap',
    },
    stepContainer: {
        '&.MuiStepper-root': {
            [theme.breakpoints.down('sm')]: {
                padding: '0',
            },
        },
        borderBottom: `1px solid ${TABLE_GRAY}`,
    },
    actionContainer: {
        paddingTop: 20,
        textAlign: 'center',
    },
    btnAction: {
        background: PRIMARY,
        boxShadow: 'none',
        borderRadius: 6,
        border: '0px',
        padding: 6,
        width: 200,
        height: 42,
        '&:hover': {
            background: PRIMARY_DARK,
            boxShadow: 'none',
        },
        '&.outlined': {
            background: 'transparent',
            border: `1px solid ${PRIMARY}`,
            color: PRIMARY,
            '&:hover': {
                background: 'transparent',
                border: `1px solid ${PRIMARY_DARK}`,
                color: PRIMARY_DARK,
            },
        },
        '&.disabled': {
            background: GRAY_LIGHT,
            color: 'white',
            borderColor: GRAY_LIGHT,
            '&.MuiButton-contained:hover.Mui-disabled': {
                background: GRAY_LIGHT,
                color: 'white',
                borderColor: GRAY_LIGHT,
            },
            '&.MuiButtonBase-root.Mui-disabled': {
                pointerEvents: 'unset',
                cursor: 'not-allowed',
            },
        },
        '& > span.MuiButton-label': {
            fontWeight: '600',
        },
    },
    awbContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: 10,
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
    awbInput: {
        maxWidth: 200,
        height: 42,
        [theme.breakpoints.down('sm')]: {
            marginBottom: 10,
        },
    },
    fieldInput: {
        maxWidth: 200,
        height: 42,
    },
    textAction: {
        fontSize: 15,
        color: PRIMARY_DARK,
        '& .bold': {
            fontWeight: 600,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 13,
        },
    },
    printAction: {
        margin: '10px 0',
        '& a': {
            color: PRIMARY,
        },
    },
    titleDialog: {
        fontFamily: font,
        color: PRIMARY_DARK,
        fontSize: 16,
        textTransform: 'uppercase',
        margin: 0,
        paddingLeft: 15,
        fontWeight: 600,
    },
    progress: {
        color: PRIMARY,
        position: 'absolute',
        left: '50%',
        marginLeft: -20,
        top: '50%',
        marginTop: -20,
    },
    contentPopUp: {
        padding: '0 15px 0 15px',
        background: '#ffffff',
        borderRadius: 16,
        marginBottom: 18,
        '& .content-history': {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            margin: '0 0 20px',
            '& p': {
                color: PRIMARY_DARK,
                margin: 0,
            },
            [theme.breakpoints.down('xs')]: {
                gridTemplateColumns: 'repeat(1, 1fr)',
            },
        },
        '& .description': {
            position: 'relative',
            width: 250,
        },
        '& .content-history:first-child .description::before': {
            backgroundColor: PRIMARY,
            boxShadow: '0 0 0 4px #D49AEB',
        },
        '& .description::before': {
            content: "''",
            position: 'absolute',
            width: 9,
            height: 9,
            borderRadius: '50%',
            backgroundColor: TABLE_GRAY,
            left: -30,
            top: 3,
            boxShadow: '0 0 0 4px #E5E7E9',
            zIndex: 2,
            [theme.breakpoints.down('xs')]: {
                top: -8,
            },
        },
        '& .description::after': {
            content: "''",
            position: 'absolute',
            left: -26,
            bottom: -20,
            width: 1,
            height: 'calc(100% + 5px)',
            borderLeft: 'thin dashed #D49AEB',
            zIndex: 1,
            [theme.breakpoints.down('xs')]: {
                bottom: -30,
                height: 'calc(100% + 28px)',
            },
        },
        '& .content-history:last-child .description::after': {
            display: 'none',
        },
    },
    summaryContainer: {
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
    },
    girdSum: {
        paddingLeft: '0px !important',
        paddingRight: '0px !important',
    },
    wrapperDialog: {
        '& .MuiDialog-paperWidthSm': {
            minWidth: 500,
            [theme.breakpoints.down('xs')]: {
                minWidth: 300,
            },
        },
        '& h2': {
            color: PRIMARY_DARK,
            fontSize: 20,
            fontWeight: 600,
            textAlign: 'center',
        },
    },
    closeButtonDialog: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: PRIMARY_DARK,
    },
    contentDialog: {
        textAlign: 'center',
        paddingBottom: 20,
    },
    contentDialogForm: {
        paddingBottom: 30,
    },
    autocompleteRoot: {
        background: GRAY_BG,
        borderRadius: 6,
        padding: 5,
        '& input': {
            fontSize: 12,
        },
        '& fieldset': {
            border: 0,
        },
    },
    channelLogo: {
        display: 'flex',
        alignItems: 'center',
        width: 20,
        height: 20,
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: '50%',
        '& img': {
            height: 15,
            alignSelf: 'center',
        },
        '&.content-center': {
            justifyContent: 'center',
        },
    },
    helperButton: {
        fontSize: 14,
        marginTop: 20,
    },
    flex: {
        display: 'flex',
        gap: 10,
        justifyContent: 'center',
    },
    reasonAction: {
        '& ul': {
            listStyle: 'decimal',
            paddingLeft: 15,
            margin: 0,
        },
        '& a': {
            color: PRIMARY,
        },
    },
    tableMobile: {
        padding: '0 30px 0 30px',
        marginBottom: 20,
        '& .row-grid': {
            display: 'flex',
            flexWrap: 'wrap',
            borderBottom: `1px solid ${BORDER_COLOR}`,
            paddingTop: 10,
        },
        '& .child': {
            maxWidth: 'calc(100% / 3)',
            flexBasis: 'calc(100% / 3)',
            marginBottom: 10,
            '& h4': {
                margin: 0,
                marginBottom: 5,
            },
            '&.fullwidth': {
                maxWidth: '100%',
                flexBasis: '100%',
            },
            '&.action': {
                maxWidth: '50%',
                flexBasis: '50%',
                backgroundColor: TABLE_GRAY,
                padding: 10,
            },
            '& .MuiAccordionSummary-root': {
                backgroundColor: PRIMARY,
                '& svg': {
                    fill: WHITE,
                },
            },
            '& .MuiAccordionSummary-content': {
                color: WHITE,
            },
            '& .MuiAccordionSummary-content.Mui-expanded': {
                margin: 0,
            },
            '& .MuiAccordionSummary-root.Mui-expanded': {
                minHeight: 'unset',
            },
        },
    },
}));

export default useStyles;
