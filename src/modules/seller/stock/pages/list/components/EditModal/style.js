import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY_DARK, WHITE, TEXT_COLOR, BORDER_COLOR, GRAY_BG_2, GREEN_STATUS_TABLE_BORDER, RED_STATUS_TABLE_BORDER, ERROR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    dialogContainerRoot: {
        overflowX: 'hidden',
        '& .MuiDialog-paperScrollPaper': {
            '&::-webkit-overflow-scrolling': 'touch',
            '&::-webkit-scrollbar': {
                height: '.5em',
                width: '.5em',
            },
            '&::-webkit-scrollbar-track': {
                '-webkit-box-shadow': 'inset 0 0 2px rgba(0,0,0,0.00)',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: TEXT_COLOR,
                borderRadius: 5,
            },
        },
        '& .bold': {
            fontWeight: 600,
        },
        '& .red': {
            color: ERROR,
        },
        '& .f11': {
            fontSize: 11,
        },
        '& .f13': {
            fontSize: 13,
            '& > div': {
                display: 'flex',
                alignItems: 'center',
            },
        },
        '& .f14': {
            fontSize: 14,
        },
        '& .f16': {
            fontSize: 16,
        },
        '& .capitalize': {
            textTransform: 'capitalize',
        },
        '& .mb10': {
            marginBottom: 10,
        },
        '& .mb15': {
            marginBottom: 15,
        },
        '& .mb20': {
            marginBottom: 20,
        },
        '& .icon': {
            width: 22,
            height: 22,
            [theme.breakpoints.down('xs')]: {
                width: 18,
                height: 18,
            },
        },
        '& .check': {
            fill: GREEN_STATUS_TABLE_BORDER,
        },
        '& .cancel': {
            fill: RED_STATUS_TABLE_BORDER,
        },
        '& .error-div': {
            fontSize: '0.75rem',
            paddingLeft: 20,
            marginTop: 23,
            color: ERROR,
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 0,
            },
        },
        '& .flex': {
            display: 'flex',
            gap: 10,
            alignItems: 'center',
        },
        '& .centering': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    borderMobile: {
        [theme.breakpoints.down('xs')]: {
            border: `1px solid ${BORDER_COLOR}`,
            padding: 15,
            paddingTop: 0,
        },
    },
    dialogContainer: {
        padding: 30,
        paddingTop: 10,
        borderRadius: 6,
        position: 'relative',
        width: 742,
        overflowX: 'hidden',
        [theme.breakpoints.down('xs')]: {
            padding: 10,
            paddingTop: 50,
            borderRadius: 14,
            position: 'absolute',
            top: '30%',
            height: 'fit-content',
        },
    },
    dialogTitleContainer: {
        textAlign: 'center',
        color: PRIMARY_DARK,
        '& .MuiTypography-root': {
            fontWeight: 'bold',
        },
    },
    closeButton: {
        position: 'absolute',
        color: PRIMARY_DARK,
        padding: 0,
        width: 20,
        height: 20,
        top: 10,
        right: 10,
        [theme.breakpoints.down('xs')]: {
            width: 'fit-content',
            top: 15,
            left: 10,
        },
    },
    content: {
        color: PRIMARY_DARK,
        fontSize: 14,
        padding: 0,
        '& .grid': {
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: '20% 80%',
            [theme.breakpoints.down('xs')]: {
                gridTemplateColumns: '50% 50%',
            },
        },
        '&.MuiDialogContent-root': {
            overflowY: 'visible',
        },
    },
    contentBorder: {
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: 6,
        padding: '20px 10px',
        fontSize: 14,
        [theme.breakpoints.down('xs')]: {
            padding: '15px 10px',
            marginBottom: 10,
            overflow: 'initial',
            '&:last-child': {
                marginBottom: 0,
            },
        },
        '&.red-border': {
            borderColor: ERROR,
        },
        '& .grid': {
            display: 'grid',
            gridTemplateColumns: '30% 20% 44% 6%',
        },
        '& .head-item': {
            padding: '10px 20px',
        },
        '& .grid-item-border': {
            padding: '5px 10px',
            borderRight: `1px solid ${BORDER_COLOR}`,
            display: 'flex',
            alignItems: 'center',
        },
        '& .grid-item': {
            padding: '5px 10px',
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('xs')]: {
                padding: 0,
            },
        },
    },
    divSwitch: {
        '& > div': {
            display: 'inline-block',
            verticalAlign: 'middle',
        },
    },
    switch: {
        marginLeft: 0,
        marginRight: 10,
    },
    textInput: {
        [theme.breakpoints.down('xs')]: {
            alignItems: 'flex-end',
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-root': {
            backgroundColor: WHITE,
            borderRadius: 4,
            padding: '2px 10px',
            border: `1px solid ${BORDER_COLOR}`,
            width: 90,
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
        '& .MuiInputBase-root.Mui-disabled': {
            backgroundColor: GRAY_BG_2,
        },
    },
    btn: {
        position: 'absolute',
        right: 20,
        top: 70,
        width: 106,
        [theme.breakpoints.down('xs')]: {
            position: 'static',
        },
    },
    table: {
        boxShadow: 'none',
    },
    tableCellRoot: {
        borderBottom: 0,
        borderRight: `1px solid ${BORDER_COLOR}`,
        '&.no-border': {
            borderRight: 0,
        },
        padding: '5px 16px',
    },
    imgBackContainerChannel: {
        display: 'flex',
        alignItems: 'center',
        border: `1px solid ${BORDER_COLOR}`,
        padding: 5,
        margin: '5px 0',
        justifyContent: 'center',
        borderRadius: '50%',
        [theme.breakpoints.down('xs')]: {
            padding: 2,
            justifyContent: 'center',
        },
    },
    imgBackChannel: {
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        height: 12,
        width: 12,
        [theme.breakpoints.down('xs')]: {
            height: 10,
            width: 10,
        },
    },
    modalHeader: {
        fontSize: 16,
        fontWeight: 600,
        marginTop: 5,
        position: 'relative',
        '& .closeModal': {
            width: 30,
            fontWeight: 600,
            position: 'absolute',
            right: -5,
            top: -5,
            padding: 5,
            '&:hover': {
                backgroundColor: '#f5f5f5',
                borderRadius: 50,
                cursor: 'pointer',
            },
        },
    },
    modalNote: {
        borderRadius: 5,
    },
    modalSyncContainer: {
        marginBottom: 10,
        position: 'relative',
        '& img': {
            position: 'relative',
            top: 9,
            marginRight: 10,
            border: '1px #dadada solid',
            padding: 5,
            width: 30,
            height: 30,
            borderRadius: 50,
        },
        '& .toggle-switch': {
            position: 'absolute',
            right: 0,
            top: 12,
        },
    },
    modalRuler: {
        borderTop: '1px #f1f1f1 solid',
        marginTop: 15,
        marginBottom: 10,
    },
    modalContainer: {
        padding: 20,
    },
    btnAllSync: {
        width: '100%',
        marginTop: 5,
        marginBottom: 10,
        '& svg': {
            width: 20,
            height: 'auto',
            marginTop: 4,
            marginRight: 2,
        },
    },
}));

export default useStyles;
