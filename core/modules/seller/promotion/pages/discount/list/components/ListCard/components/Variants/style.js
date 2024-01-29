import makeStyles from '@material-ui/core/styles/makeStyles';
import { TABLE_GRAY, GRAY_LIGHT } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    rowGrid: {
        borderBottom: `1px inset ${TABLE_GRAY}`,
        width: '-webkit-fill-available',
        '& .box': {
            [theme.breakpoints.down('xs')]: {
                borderRight: '0',
                borderBottom: `1px inset ${TABLE_GRAY}`,
                padding: 10,
            },
            borderRight: `1px inset ${TABLE_GRAY}`,
            padding: '0 10px',
            '& .title': {
                fontWeight: 'bold',
                marginBottom: 15,
            },
            margin: 10,
            '&:last-child': {
                borderColor: 'transparent',
                [theme.breakpoints.down('xs')]: {
                    borderBottom: '1px solid',
                },
            },
        },
        display: 'grid',
        gridTemplateColumns: '3fr 3fr 1fr 3fr 1fr 1fr',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '2fr 1fr 1fr',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
        '& .small': {
            maxWidth: 110,
        },
    },
    divParent: {
        display: 'flex',
        alignItems: 'center',
    },
    notVisible: {
        visibility: 'hidden',
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        cursor: 'pointer',
        transition: 'all .2s linear',
        padding: 10,
        '&.border': {
            borderBottom: `1px solid ${GRAY_LIGHT}`,
        },
    },
    border: {
        border: `1px solid ${GRAY_LIGHT}`,
        width: '100%',
        borderRadius: 8,
    },
    trashIcon: {
        height: 14,
        cursor: 'pointer',
    },
}));

export default useStyles;
