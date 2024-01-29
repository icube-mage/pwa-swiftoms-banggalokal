/* eslint-disable max-len */

import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY_DARK, BORDER_COLOR,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    tableBodyContainer: {
        marginTop: 20,
        marginBottom: 80,
        '&.footer': {
            margin: 10,
            marginTop: 20,
            border: `1px solid ${BORDER_COLOR}`,
            borderRadius: 6,
        },
    },
    editRoot: {
        padding: 0,
    },
    rowPaper: {
        position: 'relative',
        boxShadow: 'unset',
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: 6,
        color: PRIMARY_DARK,
        fontSize: 13,
        margin: 10,
        padding: '15px 0',
        '& .divider': {
            marginBottom: 15,
            marginTop: 5,
        },
        '&:last-child': {
            marginBottom: 0,
        },
    },
    switch: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    rowBody: {
        display: 'block',
        padding: '0 10px',
        '& .box': {
            padding: 0,
            marginBottom: 10,
        },
        '& .title': {
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            marginBottom: 5,
        },
        '& .flex-button': {
            display: 'flex',
            gap: 10,
            '& .btn-loc': {
                width: 130,
            },
            '& .btn-edit': {
                marginRight: 'auto',
            },
        },
    },
    buttonActionRoot: {
        fontSize: 11,
        height: 30,
        padding: 0,
        contain: 'content',
    },
    startIcon: {
        marginLeft: 0,
    },
    iconRadio: {
        width: 14,
        height: 14,
    },
    paginationContainer: {
        boxShadow: '0px 3px 15px #4D2F821A',
    },
    loading: {
        display: 'flex',
        color: PRIMARY_DARK,
        fontWeight: 600,
        justifyContent: 'center',
        padding: '20px 0px',
    },
    iconDeleteRoot: {
        padding: 0,
        '& img': {
            width: 22,
            height: 'auto',
        },
    },
}));

export default useStyles;
