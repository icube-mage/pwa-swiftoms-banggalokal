import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY, TABLE_GRAY, PRIMARY_DARK, GRAY_LIGHT,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    header: {
        cursor: 'pointer',
    },
    tableRow: {
        '&.gray': {
            backgroundColor: TABLE_GRAY,
        },
        '& .MuiTableCell-body': {
            color: PRIMARY_DARK,
            paddingTop: 10,
            paddingBottom: 10,
            fontSize: 14,
        },
        '& .MuiSvgIcon-root': {
            width: 20,
            height: 'auto',
        },
        '&.no-padding-top': {
            '& .MuiTableCell-body': {
                paddingTop: 0,
            },
        },
        '& .white': {
            backgroundColor: 'transparent',
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
    tableRowItem: {
        '&.gray': {
            backgroundColor: TABLE_GRAY,
        },
        '& .MuiTableCell-sizeSmall': {
            paddingTop: 0,
            paddingBottom: 0,
        },
        '& .show': {
            '&.MuiTableCell-sizeSmall': {
                padding: '6px 24px 6px 16px',
            },
            '&.MuiTableCell-body': {
                color: PRIMARY_DARK,
                paddingTop: 15,
                paddingBottom: 10,
                fontSize: 14,
            },
            '&.borderTop': {
                borderTop: `1px solid ${GRAY_LIGHT}`,
            },
            '&.borderRight': {
                borderRight: `1px solid ${GRAY_LIGHT}`,
            },
            '&.borderLeft': {
                borderLeft: `1px solid ${GRAY_LIGHT}`,
            },
            '&.borderBottom': {
                borderBottom: `1px solid ${GRAY_LIGHT}`,
            },
        },
        '& .MuiSvgIcon-root': {
            width: 20,
            height: 'auto',
        },
        '&.no-padding-top': {
            '& .MuiTableCell-body': {
                paddingTop: 0,
            },
        },
        '& .white': {
            backgroundColor: 'transparent',
        },
        '& .bold': {
            fontWeight: 600,
        },
    },
    checkbox: {
        '&.MuiCheckbox-colorSecondary.Mui-checked': {
            color: PRIMARY,
        },
        '&.MuiCheckbox-root': {
            color: GRAY_LIGHT,
            borderRadius: 4,
        },
        '&.MuiButtonBase-root.Mui-disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'auto',
        },
        '&.MuiIconButton-colorSecondary:hover': {
            backgroundColor: 'transparent',
        },
        '&.disabled': {
            '&.MuiCheckbox-root': {
                color: TABLE_GRAY,
            },
            '& .MuiIconButton-label': {
                backgroundColor: GRAY_LIGHT,
                borderRadius: 4,
            },
        },
        marginLeft: 0,
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

export default useStyles;
