import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    TABLE_GRAY, PRIMARY_DARK, GRAY_LIGHT, TEXT_COLOR,
} from '@theme_color';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const useStyles = makeStyles(() => ({
    rowItem: {
        backgroundColor: 'transparent',
        '&.dark': {
            backgroundColor: TABLE_GRAY,
        },
        '& .borderTop': {
            borderTop: `1px solid ${GRAY_LIGHT}`,
            borderRadius: 6,
            '&.show': {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
            },
        },
        '& .borderRight': {
            borderRight: `1px solid ${GRAY_LIGHT}`,
        },
        '& .borderLeft': {
            borderLeft: `1px solid ${GRAY_LIGHT}`,
        },
        '& .borderBottom': {
            borderBottom: `1px solid ${GRAY_LIGHT}`,
        },
        '& .pointer': {
            cursor: 'pointer',
        },
    },
    td: {
        color: TEXT_COLOR,
        borderColor: GRAY_LIGHT,
        padding: '20px 0px',
        '&.p10': {
            padding: '10px 0',
        },
        '&.p0': {
            padding: 0,
        },
        '&.ph10': {
            padding: '10px 20px',
        },
        '&.pointer': {
            cursor: 'pointer',
        },
        '&.border': {
            padding: '20px 10px',
        },
        '&.dark': {
            color: PRIMARY_DARK,
            fontWeight: 'bold',
        },
        '&.black': {
            color: 'white',
            backgroundColor: TEXT_COLOR,
            padding: '0 10px',
        },
        '&.br': {
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
            padding: '10px 10px',
        },
        fontFamily: font,
        fontSize: 13,
        '& .trash img': {
            width: 15,
            height: 15,
        },
        '&.noborder': {
            borderColor: 'transparent',
        },
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    break: {
        overflowWrap: 'break-word',
    },
    divider: {
        minHeight: 60,
        display: 'flex',
        alignItems: 'center',
        borderLeft: `1px solid ${GRAY_LIGHT}`,
        padding: '0 10px',
    },
}));

export default useStyles;
