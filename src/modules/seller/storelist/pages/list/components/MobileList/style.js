/* eslint-disable max-len */

import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY_DARK, BORDER_COLOR, GRAY_LIGHT, WHITE,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    mobileContainer: {
        marginBottom: 80,
    },
    tableBodyContainer: {
        marginTop: 20,
        margin: 10,
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: 6,
        boxShadow: 'none',
        '&.footer': {
            marginTop: 0,
        },
    },
    paginationContainer: {
        boxShadow: '0px 3px 15px #4D2F821A',
    },
    editRoot: {
        padding: 0,
    },
    rowPaper: {
        boxShadow: 'unset',
        borderBottom: `1px solid ${BORDER_COLOR}`,
        color: PRIMARY_DARK,
        fontSize: 13,
        padding: '15px 0',
        borderRadius: 0,
        '& .divider': {
            marginBottom: 15,
            marginTop: 5,
        },
        '&:first-child': {
            borderTopRightRadius: 6,
            borderTopLeftRadius: 6,
        },
        '&:last-child': {
            marginBottom: 0,
            borderBottom: 0,
            borderBottomRightRadius: 6,
            borderBottomLeftRadius: 6,
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
        fontSize: 11,
        '& .flex': {
            display: 'flex',
            gap: 10,
            alignItems: 'center',
        },
        '& .column': {
            flexDirection: 'column',
            gap: 5,
            alignItems: 'unset',
        },
        '& .parent': {
            display: 'grid',
            gridTemplateColumns: '90% 10%',
        },
    },
    buttonActionRoot: {
        fontSize: 11,
        height: 30,
        padding: 0,
        contain: 'content',
        '&.disabled': {
            color: GRAY_LIGHT,
            borderColor: GRAY_LIGHT,
        },
    },
    startIcon: {
        marginLeft: 0,
    },

    loading: {
        display: 'flex',
        color: PRIMARY_DARK,
        fontWeight: 600,
        justifyContent: 'center',
        padding: '20px 0px',
    },
    channelContainer: {
        width: 30,
        height: 30,
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: '50%',
        display: 'grid',
        placeItems: 'center',
    },
    channelImg: {
        width: 20,
        height: 20,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
    },
    activeBadge: {
        padding: '1px 5px 1px 5px',
        background: '#51C519',
        fontSize: 9,
        color: WHITE,
        borderRadius: 10,
    },
}));

export default useStyles;
