import { makeStyles } from '@material-ui/core/styles';
import { BLACK, PRIMARY } from '@theme_color';

const useStyles = makeStyles(() => ({
    Footer: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: 'auto',
        padding: '5px 0',
        boxShadow: '0px -1px 6px #00000014',
        borderRadius: 6,
        columnGap: 20,
        '& button': {
            flex: 0,
        },
        '& .itemIcon': {
            width: 20,
            height: 20,
            marginBottom: 5,
        },
        '& button.Mui-selected .itemIcon': {
            filter: 'invert(24%) sepia(94%) saturate(2110%) hue-rotate(295deg) brightness(81%) contrast(101%)',
        },
        '& button span': {
            color: BLACK,
        },
        '& button.Mui-selected span.Mui-selected': {
            color: PRIMARY,
        },
    },
}));

export default useStyles;
