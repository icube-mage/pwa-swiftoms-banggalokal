import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, BORDER_COLOR, GRAY_BG_2, WHITE,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    gridFormContainer: {
        marginBottom: 20,
        fontSize: 13,
        '& .form': {
            alignItems: 'center',
            display: 'grid',
            gridTemplateColumns: '95% 5%',
            gap: 10,
        },
        '& .label': {
            fontWeight: 'bold',
            marginBottom: 10,
        },
        '& .required': {
            color: PRIMARY,
            fontWeight: 'bold',
            fontSize: 18,
        },
    },
    buttonRoot: {
        marginTop: 20,
        height: 40,
        '&.mt40': {
            marginTop: 40,
            [theme.breakpoints.up('md')]: {
                position: 'absolute',
                bottom: 25,
            },
        },
    },
    textInput: {
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-root': {
            backgroundColor: WHITE,
            borderRadius: 4,
            padding: '2px 10px',
            border: `1px solid ${BORDER_COLOR}`,
            width: '100%',
            height: 40,
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
        '& .MuiInputBase-root.Mui-disabled': {
            backgroundColor: GRAY_BG_2,
        },
    },
}));

export default useStyles;
