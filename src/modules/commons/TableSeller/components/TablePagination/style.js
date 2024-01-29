import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY, PRIMARY_DARK, GRAY_LIGHT, WHITE_IMPORTANT,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    tablePaginationSpacer: {
        display: 'none',
    },
    tablePaginationCaption: {
        color: PRIMARY_DARK,
        [theme.breakpoints.down('xs')]: {
            fontSize: 11,
        },
    },
    tablePaginationSelect: {
        color: PRIMARY_DARK,
        fontWeight: 600,
        border: `1px solid ${GRAY_LIGHT}`,
        borderRadius: '8px',
        paddingLeft: 15,
        paddingRight: 30,
        textAlignLast: 'center',
        [theme.breakpoints.down('xs')]: {
            width: 22,
            paddingLeft: 5,
            '&.MuiSelect-select.MuiSelect-select': {
                paddingRight: 15,
            },
        },
    },
    tablePaginationSelectRoot: {
        marginRight: 8,
        marginLeft: 5,
        width: 70,
        [theme.breakpoints.down('xs')]: {
            width: 47,
        },
    },
    tablePaginationToolbar: {
        display: 'grid',
        gridTemplateColumns: '50px 80px 90px auto',
        paddingBottom: 10,
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '50px 60px 0 auto',
            fontSize: 11,
            paddingBottom: 0,
            '&.MuiToolbar-gutters': {
                paddingLeft: 10,
            },
        },
        [theme.breakpoints.down('xs')]: {
            gridTemplateColumns: '40px 60px 0 auto',
            '&.MuiToolbar-gutters': {
                paddingLeft: 10,
                paddingRight: 10,
            },
        },
    },
    paginationContainer: {
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 15,
        justifyContent: 'end',
        paddingRight: 25,
        [theme.breakpoints.down('xs')]: {
            gap: 5,
            paddingRight: 0,
            marginLeft: 10,
        },
    },
    paginationAction: {
        transition: 'all .1s linear',
        '& .MuiPaginationItem-outlined': {
            borderColor: GRAY_LIGHT,
            color: GRAY_LIGHT,
            fontWeight: 600,
            [theme.breakpoints.down('sm')]: {
                fontSize: 11,
            },
            '&:hover': {
                borderColor: PRIMARY,
                color: PRIMARY,
                backgroundColor: 'transparent',
            },
        },
        '& .MuiPaginationItem-page.Mui-selected': {
            borderColor: PRIMARY,
            color: PRIMARY,
            backgroundColor: 'transparent',
        },
        '& .MuiPagination-ul': {
            [theme.breakpoints.down('sm')]: {
                flexWrap: 'nowrap',
            },
            [theme.breakpoints.down('xs')]: {
                gap: 2,
            },
        },
        '& .MuiPaginationItem-sizeSmall': {
            [theme.breakpoints.down('sm')]: {
                padding: 0,
                margin: 0,
            },
            [theme.breakpoints.down('xs')]: {
                minWidth: 23,
                width: 23,
                height: 23,
            },
        },
    },
    btnPagination: {
        background: PRIMARY,
        borderRadius: 10,
        width: 26,
        minWidth: 26,
        maxWidth: 26,
        height: 26,
        padding: 0,
        color: 'white',
        '&:hover': {
            backgroundColor: PRIMARY_DARK,
            boxShadow: 'none',
            borderColor: PRIMARY_DARK,
        },
        [theme.breakpoints.down('xs')]: {
            width: 22,
            height: 22,
            minWidth: 22,
            maxWidth: 22,
            borderRadius: 6,
        },
    },
    btnPaginationDisabled: {
        color: WHITE_IMPORTANT,
        backgroundColor: `${GRAY_LIGHT} !important`,
    },
    tableFooterPaginationContainer: {
        '& .MuiTableRow-footer': {
            '& .MuiTableCell-footer': {
                [theme.breakpoints.down('xs')]: {
                    border: 0,
                },
            },
        },
    },
}));

export default useStyles;
