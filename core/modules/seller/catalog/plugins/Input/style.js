import { makeStyles } from '@material-ui/core/styles';
import {
    PRIMARY, PRIMARY_DARK, GRAY_BG, GRAY_LIGHT, TEXT_COLOR,
} from '@theme_color';

const useStyles = makeStyles((theme) => ({
    formFieldsGrid: {
        display: 'grid',
        gridTemplateColumns: '20% 80%',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        },
        marginBottom: 20,
        alignItems: 'center',
        '&.start': {
            alignItems: 'flex-start',
        },
        '&.grid': {
            marginBottom: 30,
        },
        [theme.breakpoints.up('md')]: {
            '&.image': {
                display: 'block',
            },
        },
        [theme.breakpoints.up('xl')]: {
            '&.image': {
                display: 'grid',
            },
        },
    },
    required: {
        color: PRIMARY,
        '&::after': {
            content: "'*'",
            display: 'block',
            position: 'absolute',
            top: -3,
            right: -9,
            color: PRIMARY,
            fontSize: 16,
        },
    },
    textInput: {
        width: '100%',
        '&:hover': {
            '& .MuiInput-underline:before': {
                borderBottom: 'none',
            },
        },
        '& .MuiInput-underline:before': {
            borderBottom: 'none',
        },
        '& .MuiInput-root': {
            backgroundColor: GRAY_BG,
            borderRadius: 6,
            padding: '5px 10px',

        },
        '& .MuiAutocomplete-inputRoot': {
            minHeight: 42,
            borderBottom: 'none',
            paddingTop: 10,
            paddingBottom: 10,
        },
        '& .MuiInput-underline.Mui-disabled:before': {
            borderBottomStyle: 'none',
        },
        '& .MuiInputBase-input::placeholder': {
            color: PRIMARY_DARK,
            fontSize: 13,
        },
        '&.adorn': {
            '& .MuiInput-root': {
                padding: 0,
            },
        },
        '& .MuiChip-root': {
            backgroundColor: 'transparent',
            border: `1px solid ${GRAY_LIGHT}`,
            borderRadius: 8,
        },
        '& .MuiChip-deleteIcon': {
            fill: PRIMARY_DARK,
        },
    },
    adornment: {
        backgroundColor: GRAY_LIGHT,
        padding: '20px 14px',
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        '& .MuiTypography-root': {
            color: PRIMARY_DARK,
            fontSize: 13,
            fontWeight: 'bold',
        },
    },
    label: {
        '&.MuiFormLabel-root': {
            fontSize: 14,
            color: PRIMARY_DARK,
            fontWeight: 600,
            marginBottom: 10,
        },
        position: 'relative',
        width: 'fit-content',
    },
    helper: {
        fontSize: '0.75rem',
        color: TEXT_COLOR,
    },
}));

export default useStyles;
