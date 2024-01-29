/* eslint-disable max-len */

import makeStyles from '@material-ui/core/styles/makeStyles';
import {
    PRIMARY_DARK, WHITE, BORDER_COLOR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: WHITE,
        border: `1px solid ${BORDER_COLOR}`,
        borderRadius: 6,
        marginBottom: 20,
        [theme.breakpoints.down('xs')]: {
            backgroundColor: 'transparent',
            border: '0',
        },
    },
    tableContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 6,
        boxShadow: 'unset',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '100vw',
            display: 'block',
            marginLeft: '0px',
            marginRight: '0px',
        },
    },
    tableBodyContainer: {
        marginTop: 20,
        [theme.breakpoints.down('xs')]: {
            margin: 10,
            border: `1px solid ${BORDER_COLOR}`,
            borderRadius: 6,
            boxShadow: 'none',
        },
    },
    tableContainerRoot: {
        border: 'none',
    },
    loading: {
        display: 'flex',
        color: PRIMARY_DARK,
        fontWeight: 600,
        justifyContent: 'center',
        padding: '20px 0',
    },
}));

export default useStyles;
