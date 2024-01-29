import makeStyles from '@material-ui/core/styles/makeStyles';
import { PRIMARY_DARK_OLD, WHITE } from '@theme_color';

const useStyles = makeStyles(() => ({
    textInfoContainer: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        '& .text-helper': {
            cursor: 'pointer',
        },
    },
    popperHelpContainer: {
        maxWidth: 150,
        top: '-5px !important',
        zIndex: 1300,
        '& .text-help': {
            padding: '2px 4px',
            fontSize: 10,
            backgroundColor: PRIMARY_DARK_OLD,
            color: WHITE,
            textAlign: 'center',
            '&::after': {
                content: "''",
                position: 'absolute',
                top: 'calc(100% - 3px)',
                left: '50%',
                marginLeft: '-6px',
                width: 0,
                height: 0,
                borderTop: `solid 7px ${ PRIMARY_DARK_OLD}`,
                borderLeft: 'solid 7px transparent',
                borderRight: 'solid 7px transparent',
            },
        },
        '& .text-help-before': {
            padding: '2px 4px',
            fontSize: 10,
            backgroundColor: PRIMARY_DARK_OLD,
            color: WHITE,
            textAlign: 'center',
            marginTop: 12,
            '&::before': {
                content: "''",
                position: 'absolute',
                bottom: 'calc(100% - 15px)',
                left: '50%',
                marginLeft: '-6px',
                width: 0,
                height: 0,
                borderBottom: `solid 7px ${ PRIMARY_DARK_OLD}`,
                borderLeft: 'solid 7px transparent',
                borderRight: 'solid 7px transparent',
            },
        },
    },
}));

export default useStyles;
