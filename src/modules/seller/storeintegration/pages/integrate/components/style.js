import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, BLACK, PRIMARY_DARK, BORDER_COLOR, GRAY_BG_2, WHITE, PRIMARY_DARK_OLD,
} from '@theme_color';

const fontFamily = '"Plus Jakarta Sans", sans-serif !important';

const useStyles = makeStyles((theme) => ({
    container: {
        border: `1px solid ${BORDER_COLOR}`,
        fontFamily,
        borderRadius: 6,
        boxShadow: 'none',
        padding: 30,
        paddingBottom: 40,
        [theme.breakpoints.down('xs')]: {
            marginTop: 10,
            marginRight: 10,
            marginLeft: 10,
            marginBottom: 80,
        },
    },
    topSection: {
        fontSize: 16,
        fontWeight: 'bold',
        color: BLACK,
        marginBottom: 30,
    },
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
    capability: {
        fontSize: 13,
        backgroundColor: GRAY_BG_2,
        padding: '20px 15px',
        color: PRIMARY_DARK_OLD,
        height: 'fit-content',
        borderRadius: 6,
    },
    feature: {
        display: 'flex',
        alignItems: 'center',
        '& .text': {
            margin: 0,
        },
        '& .check': {
            color: PRIMARY,
            fontSize: 14,
            marginRight: 5,
            fontWeight: 600,
        },
    },
    capabilityImg: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        marginBottom: 20,
        '& .connect': {
            width: 40,
            height: 40,
        },
        '& .icon': {
            height: 40,
            width: 'auto',
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
    warning: {
        backgroundColor: '#CED2D8',
        padding: '15px 10px',
        margin: '0px 5%',
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        '& a': {
            color: '#408AC0',
        },
        gap: 5,
        wordBreak: 'break-word',
    },
    helper: {
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        marginTop: 20,
    },
    buttonRootText: {
        fontSize: 13,
        padding: 0,
        margin: 0,
        color: PRIMARY,
        '&:hover': {
            color: PRIMARY,
            textDecoration: 'underline',
        },
    },
    helperRequest: {
        fontSize: 13,
        display: 'inline',
        alignItems: 'center',
        marginTop: 20,
    },
    divRequest: {
        display: 'inline',
        cursor: 'pointer',
    },
    ulStyle: {
        paddingLeft: 15,
    },
}));

export default useStyles;
