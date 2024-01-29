import { makeStyles } from '@material-ui/core/styles';
import { WHITE, BORDER_COLOR, PRIMARY_DARK } from '@theme_color';

const useStyles = makeStyles(() => ({
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .left': {
            cursor: 'pointer',
            backgroundColor: WHITE,
            padding: '10px 27px',
            border: `1px solid ${BORDER_COLOR}`,
            borderRadius: 4,
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            '& .MuiIconButton-root': {
                padding: 0,
                paddingRight: 10,
            },
            '& .MuiSvgIcon-root': {
                fill: PRIMARY_DARK,
                height: 30,
                width: 'auto',
            },
            '& .MuiIconButton-root:hover': {
                background: 'none',
            },
        },
        marginBottom: 20,
    },
    title: {
        color: PRIMARY_DARK,
        fontWeight: 'bold',
        marginTop: 0,
        marginBottom: 0,
        fontSize: 18,
        '&.paper': {
            marginBottom: 30,
        },
        '&.padding': {
            padding: 30,
            paddingTop: 0,
        },
    },
}));

export default useStyles;
