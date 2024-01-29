/* eslint-disable max-len */

import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY_DARK, BORDER_COLOR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    tableBodyContainer: {
        padding: '0 20px',
        marginTop: 20,
        [theme.breakpoints.down('xs')]: {
            padding: 0,
        },
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
        [theme.breakpoints.down('xs')]: {
            padding: '15px 10px',
            margin: 10,
        },
    },
    rowBodyFailed: {
        padding: '0px 10px',
        '& .box': {
            padding: '0 10px',
            '& .title': {
                fontWeight: 'bold',
                marginBottom: 15,
                [theme.breakpoints.down('xs')]: {
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
        '& .center': {
            textAlign: 'center',
        },
        display: 'grid',
        gridTemplateColumns: 'minmax(250px, 30%) minmax(auto, 70%)',
        '& .flex': {
            display: 'flex',
            gap: 10,
            alignItems: 'center',
        },

        // mobile
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            '& .box': {
                marginBottom: 15,
                paddingBottom: 15,
                borderBottom: `1px inset ${BORDER_COLOR}`,
                '&:last-child': {
                    marginBottom: 0,
                    paddingBottom: 0,
                },
            },
        },
        [theme.breakpoints.down('xs')]: {
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
    rowRoot: {
        borderLeft: `1px solid ${BORDER_COLOR}`,
    },
    cellRoot: {
        padding: 10,
        fontSize: 13,
        borderBottom: 0,
        '&.top0': {
            paddingTop: 0,
        },
        '&.head': {
            border: `1px solid ${BORDER_COLOR}`,
        },
        '&.fixed1': {
            width: '20%',
        },
        '&.fixed2': {
            width: '25%',
        },
        '&.fixed3': {
            width: '5%',
        },
        '&.fixed4': {
            width: '20%',
        },
        '&.no-border': {
            border: 0,
        },
        '&.bottom-border': {
            borderBottom: `1px solid ${BORDER_COLOR}`,
        },
        '&.right-border': {
            borderRight: `1px solid ${BORDER_COLOR}`,
        },
        '&.left-border': {
            borderLeft: `1px solid ${BORDER_COLOR}`,
        },
        '&.side-border': {
            borderRight: `1px solid ${BORDER_COLOR}`,
            borderLeft: `1px solid ${BORDER_COLOR}`,
        },
        '& .hidden-space': {
            visibility: 'hidden',
        },
    },
    buttonRootRetry: {
        height: 22,
        width: 60,
        boxShadow: 'none',
        fontSize: 12,
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
}));

export default useStyles;
