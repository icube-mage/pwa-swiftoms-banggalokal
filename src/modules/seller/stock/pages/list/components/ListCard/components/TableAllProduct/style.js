/* eslint-disable max-len */

import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY_DARK, BORDER_COLOR, WHITE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    tableBodyContainer: {
        '& .MuiTable-root': {
            borderCollapse: 'separate',
        },
        '& .MuiTableRow-root': {
            display: 'block',
            verticalAlign: 'top',
            margin: '10px 30px',
            border: `1px solid ${BORDER_COLOR}`,
            borderRadius: 4,
            padding: '20px 0px 20px 14px',
            '&:first-child': {
                marginTop: 30,
            },
        },
        '& .MuiTableCell-root': {
            fontSize: 13,
            backgroundColor: WHITE,
            width: 200,
            borderBottom: 0,
            padding: '0 16px',
            '&:not(:first-child)': {
                borderLeft: `1px solid ${BORDER_COLOR}`,
            },
            '&:first-child': {
                width: 400,
                minWidth: 300,
            },
            '&:last-child': {
                width: 'auto',
            },
        },
        '& .title': {
            fontWeight: 'bold',
            fontSize: 14,
            whiteSpace: 'nowrap',
            marginBottom: 10,
        },
        '& .flex-loc': {
            display: 'flex',
            gap: 7,
            [theme.breakpoints.down('sm')]: {
                justifyContent: 'space-between',
            },
        },
        '& .edit-icon': {
            width: 15,
            height: 15,
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: 20,
            padding: 0,
        },
    },
    editRoot: {
        padding: 0,
    },
    rowPaper: {
        boxShadow: 'unset',
        marginBottom: 20,
        padding: '20px 0',
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: 6,
        color: PRIMARY_DARK,
        fontSize: 13,
        '&:last-child': {
            marginBottom: 0,
        },
        [theme.breakpoints.down('sm')]: {
            padding: '15px 10px',
            margin: 10,
        },
    },
    rowBody: {
        padding: '0px 10px',
        '& .box': {
            borderRight: `1px inset ${BORDER_COLOR}`,
            padding: '0 20px',
            '& .title': {
                fontWeight: 'bold',
                marginBottom: 15,
                [theme.breakpoints.down('sm')]: {
                    marginBottom: 5,
                },
            },
            '&.noBorder': {
                borderColor: 'transparent',
            },
            '&:last-child': {
                borderColor: 'transparent',
            },
        },
        display: 'grid',
        gridTemplateColumns: 'minmax(250px, 30%) minmax(auto, 70%)',
        // mobile
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            padding: 0,
            '& .box': {
                borderRight: 0,
                padding: 0,
                marginBottom: 15,
                paddingBottom: 15,
                borderBottom: `1px inset ${BORDER_COLOR}`,
                '&:last-child': {
                    marginBottom: 0,
                    paddingBottom: 0,
                },
            },
        },
    },
}));

export default useStyles;
