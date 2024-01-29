/* eslint-disable max-len */

import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY_DARK, BORDER_COLOR, GRAY_LIGHT,
} from '@theme_color';

const useStyles = makeStyles(() => ({
    mobileContainer: {
        marginBottom: 80,
    },
    tableBodyContainer: {
        marginBottom: 10,
        border: `1px solid ${BORDER_COLOR}`,
        borderTop: '0',
        borderRadius: 6,
        boxShadow: 'none',
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
        '&:last-child': {
            marginBottom: 0,
            borderBottom: 0,
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
        },
        minHeight: 50,
    },
    switch: {
        position: 'absolute',
        top: 15,
        right: 15,
    },
    rowBody: {
        position: 'relative',
        display: 'block',
        padding: '0 10px',
        fontSize: 12,
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
        '& .gap10': {
            gap: 10,
        },
        '& .title': {
            fontWeight: 'bold',
        },
        '& .action': {
            position: 'absolute',
            top: 0,
            right: 20,
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
}));

export default useStyles;
