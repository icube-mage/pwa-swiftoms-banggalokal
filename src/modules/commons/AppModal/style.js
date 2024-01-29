import { makeStyles } from '@material-ui/core/styles';
import { WHITE } from '@theme_color';

const useStyles = makeStyles(() => ({
    appModalContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .container': {
            background: WHITE,
            padding: 30,
            maxWidth: 500,
            borderRadius: 8,
            '& .header': {
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 10,
                '& .title': {
                    fontWeight: 'bold',
                    fontSize: 20,
                },
                '& .btn-close': {
                    border: 0,
                    background: 'transparent',
                    cursor: 'pointer',
                },
            },
            '& .content': {
                marginBottom: 10,
            },
            '& .footer': {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '& button': {
                    '&:nth-child(1)': {
                        marginRight: 10,
                    },
                    '&.fullWidth': {
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginRight: 0,
                    },
                },
            },
        },
    },
    appModalContainerBottom: {
        alignItems: 'end',
        '& .container': {
            width: '100%',
            borderRadius: '14px 14px 0 0',
        },
    },
}));

export default useStyles;
