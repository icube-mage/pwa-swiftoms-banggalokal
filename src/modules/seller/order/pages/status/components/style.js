import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, TABLE_GRAY, GRAY_LIGHT, TEXT_COLOR, GRAY_BG, WHITE, BORDER_COLOR, RED, GRAY_LIGHT3, ERROR,
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
        boxShadow: '0px 3px 15px #4D2F821A !important',
        padding: 30,
        borderRadius: '8px !important',
        marginBottom: 20,
        '&.nopadding': {
            padding: '30px 0',
        },
    },
    flexCanceled: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& .status': {
            marginTop: 16,
            fontWeight: 700,
            color: PRIMARY_DARK,
        },
    },
    divCanceled: {
        backgroundColor: ERROR,
        width: 100,
        height: 100,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            width: 75,
            height: 75,
        },
        '& .icon': {
            backgroundRepeat: 'no-repeat',
            backgroundSize: '50%',
            backgroundPosition: 'center',
            width: 100,
            height: 100,
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
            [theme.breakpoints.down('xs')]: {
                paddingBottom: 10,
            },
        },
        '&.center': {
            textAlign: 'center',
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
    },
    subText: {
        color: TEXT_COLOR,
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
                paddingLeft: 40,
            },
        },
        color: PRIMARY_DARK,
    },
    tr: {
        verticalAlign: 'top',
        '&.head': {
            backgroundColor: TABLE_GRAY,
            height: 45,
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
        '&.center': {
            textAlign: 'center',
        },
        '&.noborder-bottom': {
            borderBottom: 'none',
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
            // paddingBottom: 0,
        },
        '&.right': {
            textAlign: 'right',
        },
        '&.action': {
            color: PRIMARY,
            fontWeight: 600,
        },
        '&.vertical-center': {
            verticalAlign: 'middle',
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
    statusSummary: {
        '& .body': {
            backgroundColor: TABLE_GRAY,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            marginTop: 20,
        },
        '& .table-container': {
            width: '50%',
        },
        [theme.breakpoints.down('sm')]: {
            '& .table-container': {
                width: '100%',
            },
        },
        '& .action-container': {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: 20,
            '& button': {
                margin: 5,
            },
        },
    },
    buttonAction: {
        width: 200,
        boxShadow: 'none',
        '& span.MuiButton-label': {
            fontWeight: 'bold',
        },
        '&.cancel': {
            backgroundColor: 'white',
            color: PRIMARY,
            border: `1px solid ${PRIMARY}`,
            '&:hover': {
                backgroundColor: 'white',
                color: PRIMARY,
            },
        },
    },
    totalStockTextfield: {
        width: 90,
        '& input': {
            textAlign: 'center',
        },
        '& .MuiOutlinedInput-input': {
            padding: 12,
        },
    },
    dialogContent: {
        minWidth: 500,
        '& .title': {
            fontSize: 20,
            fontWeight: 'bold',
            paddingTop: 20,
            paddingLeft: 0,
            paddingRight: 16,
            paddingBottom: 20,
            '& .close-label': {
                fontSize: 20,
                fontWeight: 400,
                color: GRAY_LIGHT3,
                cursor: 'pointer',
                float: 'right',
            },
        },
        '& .cancel-reason-label': {
            fontWeight: 'bold',
            '& .asterisk': {
                color: RED,
            },
        },
        '& .cancel-reason-length': {
            color: GRAY_LIGHT3,
        },
    },
    dialogActions: {
        padding: '24px !important',
        '&.center': {
            justifyContent: 'center !important',
        },
    },
}));

export default useStyles;
