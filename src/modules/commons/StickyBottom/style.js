import { makeStyles } from '@material-ui/core/styles';
import { WHITE } from '@theme_color';

const useStyles = makeStyles((theme) => ({
    stickyBottomContainer: {
        width: 'calc(100% - 19em)',
        position: 'relative',
        '& .sticky-bottom-container-fixed': {
            background: WHITE,
            position: 'fixed',
            width: 'inherit',
            bottom: 0,
            paddingTop: 20,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 10,
            display: 'grid',
            gridTemplateColumns: '50% 50%',
            '& .sticky-bottom-left': {

            },
            '& .sticky-bottom-right': {
                display: 'flex',
                justifyContent: 'end',
                '& .btn-cancel': {
                    marginRight: 10,
                },
            },
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                bottom: 64,
                gridTemplateColumns: '100%',
                boxShadow: '0px -1px 6px #00000014',
                '& .sticky-bottom-right': {
                    justifyContent: 'center',
                },
            },
        },
    },
}));

export default useStyles;
